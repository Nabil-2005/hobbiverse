"use client";
import { ensureValidToken } from "@/utils/api/spotify/spotify";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

interface SpotifyAuthContextProps {
  children: ReactNode;
}

export const SpotifyAuthContext = createContext<{
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

export default function SpotifyAuthProvider({
  children,
}: SpotifyAuthContextProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      await ensureValidToken();
      const token = localStorage.getItem("access_token");
      if (token) {
        setAccessToken(token);
      }
    };

    fetchAccessToken();
  }, []);

  const providerValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,
    }),
    [accessToken, setAccessToken]
  );
  return (
    <SpotifyAuthContext.Provider value={providerValue}>
      {children}
    </SpotifyAuthContext.Provider>
  );
}
