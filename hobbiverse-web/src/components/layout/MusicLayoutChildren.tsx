"use client";
import useSpotifyAuth from "@/hooks/spotify/useSpotifyAuth";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

interface MusicLayoutChildrenProps {
  children: ReactNode;
}

const MusicLayoutChildren = ({ children }: MusicLayoutChildrenProps) => {
  const { accessToken, loading } = useSpotifyAuth();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();

  const toMusicLoginPage = useCallback(
    ({ push = false, callback = pathname } = {}) => {
      if (pathname.includes("/music/login")) return;
      const loginPath = "/music/login";
      const callbackPath = callback
        ? `${loginPath}?callback=${callback}`
        : loginPath;
      if (push) {
        router.push(callbackPath);
      } else {
        router.replace(callbackPath);
      }
    },
    [pathname, router]
  );

  useEffect(() => {
    if (!loading) {
      if (!accessToken || accessToken == "undefined") {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    }
  }, [accessToken, loading]);

  useEffect(() => {
    if (!isLogin) {
      toMusicLoginPage({ callback: pathname });
    }
  }, [isLogin, pathname, toMusicLoginPage]);

  return children;
};

export default MusicLayoutChildren;
