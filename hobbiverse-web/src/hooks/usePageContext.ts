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

  return {
    pageType,
    toHomePage,
  };
};

export default usePageContext;
