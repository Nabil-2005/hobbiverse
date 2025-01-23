import { AppSidebar } from "@/components/common/AppSidebar";
import MusicLayoutChildren from "@/components/layout/MusicLayoutChildren";
import { SidebarProvider } from "@/components/ui/sidebar";
import SpotifyAuthProvider from "@/context/SpotifyAuthContext";
import { ReactNode } from "react";

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <SpotifyAuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <MusicLayoutChildren>{children}</MusicLayoutChildren>
      </SidebarProvider>
    </SpotifyAuthProvider>
  );
}
