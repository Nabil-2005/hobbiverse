import { ReactNode } from "react";

interface MusicLoginLayoutProps {
  children: ReactNode;
}

export default function MusicLoginLayout({ children }: MusicLoginLayoutProps) {
  return <div>{children}</div>;
}
