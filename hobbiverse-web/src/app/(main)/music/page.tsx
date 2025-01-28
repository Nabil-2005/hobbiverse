import SpotifyProfile from "@/components/spotify/SpotifyProfile";
import Link from "next/link";
import React from "react";

const MusicPage = () => {
  return (
    <div className="flex flex-col gap-5 p-7 m-3">
      <SpotifyProfile />
      <Link href={"/music/web-player"}>Go to web player</Link>
    </div>
  );
};

export default MusicPage;
