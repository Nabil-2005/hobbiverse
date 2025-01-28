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
        // access token BQCBj2RaE4CcILYUdY2fvUU93lu1TF7lG8TkasfwximVUtCCllkcq-mxpDu-nYabo2s8NkYYFBOnZrOAmi-GYNjBw8wrgH9TTiayYzCZsN4F2JywZVhFGrmCCgaFd3wjCYXh5DvSp9hRTq_BXefXZfbmblmwslTvqSvP8YZ4kpdt1vfcCc1ZhdX1m8DL1IJziag0T9_RhREZSw_RwG79LtPBV2YELudnis6QroqEJ80iwRw1-hc5qT2uz8xSSc6Tom4gtcO1pteErWnFzrySKFCUDar2-pimUJHR7WxRGBZM1qg3oBzLmM2ErxZGHORxcBe6CNvXsz96rr-NHDpCqku_3A
        // refresh token AQCZcnFgVsWAWKmHLHvGzS5sPokuytlIEPiqdQSov0hK00dz9AGP9IzoFeQKqUrkYn5bSQc4c5Umhkb9AXsRSAt8uqp2jNlvj8lWB3roEDS9EeF93gMXCahvU-NEdzIvSNRm0w
        // 4:06pm
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
