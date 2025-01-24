"use client";
import useSpotifyAuth from "@/hooks/useSpotifyAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const track: Spotify.Track = {
  album: {
    name: "Unknown Album",
    uri: "spotify:album:unknown",
    images: [{ url: "/hobbiverse-web/src/assets/default-image.jpg" }],
  },
  artists: [{ name: "Unknown Artist", uri: "spotify:artist:unknown", url: "" }],
  duration_ms: 0,
  id: null,
  is_playable: false,
  name: "Track Name",
  uid: "unknown",
  uri: "spotify:track:unknown",
  media_type: "audio",
  type: "track",
  track_type: "audio",
  linked_from: {
    uri: null,
    id: null,
  },
};

const SpotifyWebPlayer = () => {
  const { accessToken } = useSpotifyAuth();
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);

  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState<Spotify.Track>(track);

  useEffect(() => {
    if (!accessToken) return;

    let playerInstance: Spotify.Player | undefined;

    const existingScript = document.querySelector(
      'script[src="https://sdk.scdn.co/spotify-player.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (player) return;

      playerInstance = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 1,
      });

      setPlayer(playerInstance);

      playerInstance.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      playerInstance.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      playerInstance.addListener("player_state_changed", (state) => {
        if (!state) return;

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        playerInstance?.getCurrentState().then((state) => {
          setActive(!!state);
          console.log("isActive: ", isActive);
        });
      });

      playerInstance.connect();
    };

    return () => {
      if (playerInstance) {
        playerInstance.disconnect();
      }
    };
  }, [accessToken, player, isActive]);

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
    </>
  );
};

export default SpotifyWebPlayer;
