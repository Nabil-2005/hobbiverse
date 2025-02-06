"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSpotifyPlayer } from "@/context/spotify/SpotifyPlayerContext";
import {
  fetchAvailableDevices,
  transferPlayback,
} from "@/utils/api/spotify/spotify";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect } from "react";
import getAvailableDevices from "@/utils/api/spotify/player/getAvailableDevices";

const SpotifyWebPlayer = () => {
  const {
    player,
    isPaused,
    currentTrack,
    setTrack,
    setNextTracks,
    setPrevTracks,
  } = useSpotifyPlayer();

  const handleStreaming = async () => {
    const availableDevices = await fetchAvailableDevices();
    const { devices_list } = getAvailableDevices(availableDevices);
    const hobbiverseDevice = devices_list?.filter(
      (attr) => attr.name === "Hobbiverse"
    );

    if (!hobbiverseDevice) {
      console.log("No Hobbiverse device found");
      return;
    }
    const hobbiverseDeviceId = hobbiverseDevice[0]?.id;

    await transferPlayback(hobbiverseDeviceId);
    player?.togglePlay();
  };

  useEffect(() => {
    player?.getCurrentState().then((state) => {
      if (!state) return;
      setTrack(state.track_window.current_track);
      setNextTracks(state.track_window.next_tracks);
      setPrevTracks(state.track_window.previous_tracks);
    });
  }, [player, setTrack, setNextTracks, setPrevTracks]);

  return (
    <>
      <div className="container">
        <div className="main-wrapper flex flex-col items-center justify-center">
          <div className="w-full">
            <Button
              className="items-start ml-4"
              onClick={() => handleStreaming()}
            >
              <p>Stream on Hobbiverse</p>
            </Button>
            <div className="flex w-full justify-center">
              <Image
                priority
                src={currentTrack.album?.images[0]?.url}
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
