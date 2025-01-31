import SpotifyQueue from "@/components/spotify/SpotifyQueue";
import SpotifyWebPlayer from "@/components/spotify/SpotifyWebPlayer";
import React from "react";

const WebPlayerPage = () => {
  return (
    <div>
      <SpotifyWebPlayer />
      <SpotifyQueue />
    </div>
  );
};

export default WebPlayerPage;
