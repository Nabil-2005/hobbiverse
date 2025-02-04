"use client";
import useAuth from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import SpotifyLibrary from "../spotify/SpotifyLibrary";
import Link from "next/link";

export function AppSidebar() {
  const { profile } = useAuth();

  return (
    <Sidebar variant="inset" className={cn("border-0")}>
      <SidebarHeader>
        <Link href={"/"}>
          <div className="flex px-5 py-7 font-extrabold text-xl justify-center items-center">
            <p>HOBBIVERSE</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SpotifyLibrary />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-row gap-4 items-center px-7 pt-4 pb-7 bg-transparent">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-bold text-lg">{profile?.username}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
