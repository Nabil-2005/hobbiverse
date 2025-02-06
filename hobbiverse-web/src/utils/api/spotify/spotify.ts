const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const scope =
  "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-top-read user-read-recently-played user-library-modify user-library-read";
const baseUrl = "https://accounts.spotify.com";
const authUrl = new URL("/authorize", baseUrl);
const tokenUrl = new URL("/api/token", baseUrl);

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const getToken = async (code: string | null) => {
  const codeVerifier = localStorage.getItem("code_verifier");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    } as Record<string, string>),
  };

  const body = await fetch(tokenUrl, payload);
  const response = await body.json();

  if (response.access_token !== undefined) {
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
    localStorage.setItem(
      "token_expiry",
      (new Date().getTime() + response.expires_in * 1000).toString()
    );
  }

  window.history.pushState("", "", redirectUri);
};

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    console.error("Refresh token missing");
    return;
  }

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    } as Record<string, string>),
  };
  const body = await fetch(tokenUrl, payload);
  const response = await body.json();

  if (response.access_token) {
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem(
      "token_expiry",
      (Date.now() + response.expires_in * 1000).toString()
    );
    if (response.refresh_token) {
      localStorage.setItem("refresh_token", response.refresh_token);
    }
  } else {
    console.error("Failed to refresh token", response);
  }
};

export const scheduleTokenRefresh = () => {
  const expiryTime = parseInt(localStorage.getItem("token_expiry") || "0", 10);
  const refreshTime = expiryTime - 5 * 60 * 1000; // Refresh 5 minutes before expiry
  const delay = refreshTime - Date.now();

  if (delay > 0) {
    setTimeout(async () => {
      if (!isTokenValid()) {
        console.log("Refresh token running");
        await getRefreshToken();
      }
    }, delay);
  }
};

export const isTokenValid = () => {
  const expiryTime = parseInt(localStorage.getItem("token_expiry") || "0", 10);
  return Date.now() < expiryTime;
};

export const ensureValidToken = async () => {
  if (!isTokenValid()) {
    await getRefreshToken();
  }
  scheduleTokenRefresh();
};

export const LoginSpotify = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  window.localStorage.setItem("code_verifier", codeVerifier);

  authUrl.search = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  window.location.href = authUrl.toString();
};

export const fetchProfile = async () => {
  await ensureValidToken();
  const token = localStorage.getItem("access_token");

  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
};

export const fetchQueue = async () => {
  await ensureValidToken();
  const token = localStorage.getItem("access_token");

  const result = await fetch("https://api.spotify.com/v1/me/player/queue", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
};

export const fetchLibrary = async () => {
  await ensureValidToken();
  const token = localStorage.getItem("access_token");

  const result = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
};

export const fetchPlaylist = async (
  playlistId: string | string[] | undefined
) => {
  await ensureValidToken();
  const token = localStorage.getItem("access_token");

  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return await result.json();
};

export const fetchAlbum = async (albumId: string | string[] | undefined) => {
  await ensureValidToken();
  const token = localStorage.getItem("access_token");

  const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
};

export const fetchAvailableDevices = async () => {
  await ensureValidToken();
  const token = localStorage.getItem("access_token");

  const result = await fetch("https://api.spotify.com/v1/me/player/devices", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!result.ok) {
    throw new Error(
      `Fetch devices error: ${result.status} ${result.statusText}`
    );
  }

  return await result.json();
};

export const fetchPlaybackState = async () => {
  await ensureValidToken();
  const token = localStorage.getItem("access_token");

  const result = await fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!result.ok) {
    throw new Error(
      `Fetch playback state error: ${result.status} ${result.statusText}`
    );
  }

  return await result.json();
};

export const transferPlayback = async (deviceId: string) => {
  await ensureValidToken();
  const token = localStorage.getItem("access_token");

  const result = await fetch(`https://api.spotify.com/v1/me/player`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      device_ids: [deviceId],
    }),
  });

  if (!result.ok) {
    throw new Error(
      `Transfer playback error: ${result.status} ${result.statusText}`
    );
  }

  return true;
};

export const startPlayback = async (
  contextUri: string,
  offsetPosition: number,
  positionMs: number
) => {
  await ensureValidToken();
  const token = localStorage.getItem("access_token");

  const result = await fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      context_uri: contextUri,
      offset: {
        position: offsetPosition,
      },
      position_ms: positionMs,
    }),
  });

  if (!result.ok) {
    throw new Error(
      `Start/resume playback error: ${result.status} ${result.statusText}`
    );
  }

  return true;
};
