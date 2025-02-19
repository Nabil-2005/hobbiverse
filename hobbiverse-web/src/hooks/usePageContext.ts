import { usePathname, useRouter, useSearchParams } from "next/navigation";

const usePageContext = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const pageType = pathname.startsWith("/music")
    ? "music"
    : pathname.startsWith("/games")
    ? "games"
    : pathname.startsWith("/animanga")
    ? "animanga"
    : "/";

  const toHomePage = ({ push = false, detectCallback = true } = {}) => {
    const callback = params.get("callback");
    const nextPage = detectCallback && callback != null ? callback : "/";
    if (push) {
      router.push(nextPage);
    } else {
      router.replace(nextPage);
    }
  };

  const toLoginPage = ({ push = false, callback = pathname } = {}) => {
    if (pathname.includes("/login")) return;
    const loginPath = "/login";
    const callbackPath = callback
      ? `${loginPath}?callback=${callback}`
      : loginPath;
    if (push) {
      router.push(callbackPath);
    } else {
      router.replace(callbackPath);
    }
  };

  const toRegisterPage = ({ push = false, callback = pathname } = {}) => {
    if (pathname.includes("/register")) return;
    const registerPath = "/register";
    const callbackPath = callback
      ? `${registerPath}?callback=${callback}`
      : registerPath;
    if (push) {
      router.push(callbackPath);
    } else {
      router.replace(callbackPath);
    }
  };

  return {
    pageType,
    toHomePage,
    toLoginPage,
    toRegisterPage,
  };
};

export default usePageContext;
