"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useSpotifyPlayer } from "@/context/spotify/SpotifyPlayerContext";

const SpotifyWebPlayer = () => {
  const { player, isPaused, currentTrack } = useSpotifyPlayer();

  return (
    <>
      <div className="container">
        <div className="main-wrapper flex flex-col items-center justify-center mt-10">
          <div>
            <Image
              priority
              src={currentTrack.album.images[0]?.url}
              className="now-playing__cover rounded-lg border-black border-2"
              alt="Album Cover"
              width={400}
              height={400}
            />
          </div>

          <div className="now-playing__side flex flex-col items-center my-2 text-lg font-bold">
            <div className="now-playing__name">{currentTrack.name}</div>

            <div className="now-playing__artist">
              {currentTrack.artists[0]?.name}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="btn-spotify"
              onClick={() => {
                player?.previousTrack();
              }}
            >
              &lt;&lt;
            </Button>

            <Button
              className="btn-spotify"
              onClick={() => {
                player?.togglePlay();
              }}
            >
              {isPaused ? "PLAY" : "PAUSE"}
            </Button>

            <div>
              <Button
                className="btn-spotify"
                onClick={() => {
                  player?.nextTrack();
                }}
              >
                &gt;&gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpotifyWebPlayer;
