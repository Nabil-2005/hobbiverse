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

export function AppSidebar() {
  const { profile } = useAuth();

  return (
    <Sidebar variant="inset" className={cn("border-0")}>
      <SidebarHeader>
        <div className="flex px-5 py-7 font-extrabold text-xl justify-center items-center">
          <p>HOBBIVERSE</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col h-full gap-2 px-5 m-2">
          <p className="px-3 mt-4 pb-2 font-bold text-lg">Playlist</p>
          <ul className="flex flex-col gap-2">
            <li>Death - Crystal Mountain</li>
            <li>Iron Maiden - Hallowed be Thy Name</li>
            <li>Megadeth - Five Magics</li>
            <li>Black Sabbath - N.I.B</li>
            <li>Dire Straits - Sultans of Swing</li>
            <li>Metallica - The Thing That Should Not Be</li>
            <li>Guns n Roses - November Rain</li>
            <li>Pantera - Floods</li>
            <li>Red Hot Chilli Papers - Dark Necessities</li>
          </ul>
        </div>
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
