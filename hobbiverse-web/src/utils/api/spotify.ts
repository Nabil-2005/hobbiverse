const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const scope = "user-read-private user-read-email";
const baseUrl = "https://accounts.spotify.com";
const authUrl = new URL("/authorize", baseUrl);
const tokenExchangeUrl = new URL("/api/token", baseUrl);

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
  console.log("api fired");

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

  const body = await fetch(tokenExchangeUrl, payload);
  const response = await body.json();

  if (response.access_token !== undefined)
    localStorage.setItem("access_token", response.access_token);
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

export const fetchProfile = async (token: string) => {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
};
