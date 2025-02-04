import SpotifyPlaylist from "@/components/spotify/SpotifyPlaylist";
import React from "react";

const PlaylistPage = () => {
  return (
    <div className="flex flex-col items-start h-full">
      <SpotifyPlaylist />;
    </div>
  );
};

export default PlaylistPage;
