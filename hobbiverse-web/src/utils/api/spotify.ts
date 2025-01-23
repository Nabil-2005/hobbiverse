const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const scope = "user-read-private user-read-email";
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

  localStorage.setItem("access_token", response.accessToken);
  localStorage.setItem(
    "token_expiry",
    (new Date().getTime() + response.expires_in * 1000).toString()
  );
  if (response.refreshToken) {
    localStorage.setItem("refresh_token", response.refreshToken);
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
