"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSpotifyPlayer } from "@/context/spotify/SpotifyPlayerContext";
import useSpotifyAuth from "@/hooks/spotify/useSpotifyAuth";
import { fetchAvailableDevices, transferPlayback } from "@/utils/api/spotify";
import getSpotifyDevices from "@/hooks/spotify/getSpotifyDevice";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

const SpotifyWebPlayer = () => {
  const { accessToken } = useSpotifyAuth();
  const { player, isPaused, currentTrack } = useSpotifyPlayer();

  const handleStreaming = async () => {
    const availableDevices = await fetchAvailableDevices();

    const { device } = getSpotifyDevices(availableDevices);

    const hobbiverseDevice = device?.filter(
      (attr) => attr.name === "Hobbiverse"
    );

    if (!hobbiverseDevice) {
      console.log("no hobbiverse device found");
      return;
    }
    const hobbiverseDeviceId = hobbiverseDevice[0]?.id;

    if (accessToken) {
      await transferPlayback(hobbiverseDeviceId);
      player?.togglePlay();
    }
  };

  return (
    <>
      <div className="container">
        <div className="main-wrapper flex flex-col items-center justify-center">
          <div className="w-full">
            <Button
              className="items-start ml-4"
              onClick={() => handleStreaming()}
            >
              Start streaming
            </Button>
            <div className="flex w-full justify-center">
              <Image
                priority
                src={currentTrack.album.images[0]?.url}
                className="now-playing__cover rounded-lg border-black border-2"
                alt="Album Cover"
                width={400}
                height={400}
              />
            </div>
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
              <SkipBack />
            </Button>

            <Button
              className="btn-spotify"
              onClick={() => {
                player?.togglePlay();
              }}
            >
              {isPaused ? <Play /> : <Pause />}
            </Button>

            <div>
              <Button
                className="btn-spotify"
                onClick={() => {
                  player?.nextTrack();
                }}
              >
                <SkipForward />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpotifyWebPlayer;
