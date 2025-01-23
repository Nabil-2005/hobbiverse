"use client";
import { ensureValidToken, getToken } from "@/utils/api/spotify";
import { useEffect, useState } from "react";

const useSpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        await getToken(code);
      }

      await ensureValidToken();
      const token = localStorage.getItem("access_token");
      setAccessToken(token);
      setLoading(false);
    };

    exchangeCodeForToken();
  }, []);

  return { accessToken, loading };
};

export default useSpotifyAuth;
