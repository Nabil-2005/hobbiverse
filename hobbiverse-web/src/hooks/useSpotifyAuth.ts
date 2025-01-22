import { ensureValidToken, getToken } from "@/utils/api/spotify";
import { useEffect, useState } from "react";

const useSpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      // console.log(code);

      if (code) {
        // console.log("run");

        await getToken(code);
      }

      await ensureValidToken();
      const token = localStorage.getItem("access_token");
      setAccessToken(token);
    };

    exchangeCodeForToken();
  }, []);

  return accessToken;
};

export default useSpotifyAuth;
