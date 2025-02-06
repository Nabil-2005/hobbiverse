"use client";
import useSpotifyAuth from "@/hooks/spotify/useSpotifyAuth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface SpotifyPlayerContextProps {
  children: ReactNode;
}

export const defaultTrack: Spotify.Track = {
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

export const SpotifyPlayerContext = createContext<{
  player: Spotify.Player | undefined;
  isPaused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  currentTrack: Spotify.Track;
  setTrack: React.Dispatch<React.SetStateAction<Spotify.Track>>;
  nextTracks: Spotify.Track[];
  setNextTracks: React.Dispatch<React.SetStateAction<Spotify.Track[]>>;
  prevTracks: Spotify.Track[];
  setPrevTracks: React.Dispatch<React.SetStateAction<Spotify.Track[]>>;
}>({
  player: undefined,
  isPaused: false,
  setPaused: () => {},
  isActive: false,
  setActive: () => {},
  currentTrack: defaultTrack,
  setTrack: () => {},
  nextTracks: [defaultTrack],
  setNextTracks: () => {},
  prevTracks: [defaultTrack],
  setPrevTracks: () => {},
});

export default function SpotifyPlayerProvider({
  children,
}: SpotifyPlayerContextProps) {
  const { accessToken } = useSpotifyAuth();
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState<Spotify.Track>(defaultTrack);
  const [nextTracks, setNextTracks] = useState<Spotify.Track[]>([defaultTrack]);
  const [prevTracks, setPrevTracks] = useState<Spotify.Track[]>([defaultTrack]);

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
        name: "Hobbiverse",
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
        setNextTracks(state.track_window.next_tracks);
        setPrevTracks(state.track_window.previous_tracks);
        setPaused(state.paused);

        playerInstance?.getCurrentState().then((state) => {
          setActive(!!state);
        });
      });

      playerInstance.connect().then((success) => {
        if (success) {
          console.log("Hobbiverse successfully connected to Spotify!");
        }
      });
    };

    return () => {
      if (playerInstance) {
        playerInstance.disconnect();
      }
    };
  }, [accessToken, player]);

  const providerValue = useMemo(
    () => ({
      player,
      isPaused,
      setPaused,
      isActive,
      setActive,
      currentTrack,
      setTrack,
      nextTracks,
      setNextTracks,
      prevTracks,
      setPrevTracks,
    }),
    [
      player,
      isPaused,
      setPaused,
      isActive,
      setActive,
      currentTrack,
      setTrack,
      nextTracks,
      setNextTracks,
      prevTracks,
      setPrevTracks,
    ]
  );

  return (
    <SpotifyPlayerContext.Provider value={providerValue}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
}

export const useSpotifyPlayer = () => {
  return useContext(SpotifyPlayerContext);
};
