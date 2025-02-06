import { AppSidebar } from "@/components/common/AppSidebar";
import Logo from "@/components/common/Logo";
import MusicLayoutChildren from "@/components/layout/MusicLayoutChildren";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SpotifyAuthProvider from "@/context/spotify/SpotifyAuthContext";
import SpotifyPlayerProvider from "@/context/spotify/SpotifyPlayerContext";
import { ReactNode } from "react";

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <SpotifyAuthProvider>
      <SidebarProvider className="p-0 overflow-hidden w-full h-screen">
        <AppSidebar />
        <main className="relative w-full bg-music-bg mr-5 my-5 border-[0.5px] border-music-primary rounded-2xl overflow-y-hidden">
          <div className="flex flex-row items-center justify-between h-16 px-6 border-b md:hidden">
            <Logo />
            <SidebarTrigger />
          </div>
          <div className="h-[calc(100%-64px)] pt-4">
            <MusicLayoutChildren>{children}</MusicLayoutChildren>
          </div>
        </main>
      </SidebarProvider>
    </SpotifyAuthProvider>
  );
}
