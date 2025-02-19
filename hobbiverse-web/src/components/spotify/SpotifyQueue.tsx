"use client";
import { useSpotifyPlayer } from "@/context/spotify/SpotifyPlayerContext";
import { DetailedTrack } from "@/types/spotifytype";
import getAlbum from "@/utils/api/spotify/albums/getAlbum";
import getUserQueue from "@/utils/api/spotify/player/getUserQueue";
import {
  fetchAlbum,
  fetchQueue,
  startPlayback,
} from "@/utils/api/spotify/spotify";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const SpotifyQueue = () => {
  const { player, currentTrack, setTrack, setNextTracks, setPrevTracks } =
    useSpotifyPlayer();
  const [queue, setQueue] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const queueData = await fetchQueue();
      setQueue(queueData);
    };
    fetchApi();
  }, [currentTrack]);

  useEffect(() => {
    player?.getCurrentState().then((state) => {
      if (!state) return;
      setTrack(state.track_window.current_track);
      setNextTracks(state.track_window.next_tracks);
      setPrevTracks(state.track_window.previous_tracks);
    });
  }, [player, setTrack, setNextTracks, setPrevTracks]);

  const { queue_tracks_list } = getUserQueue(queue);

  const handlePlayTrack = async (track: DetailedTrack) => {
    const trackId = track.id;
    const albumUri = track.album.uri;
    const albumId = albumUri.split("spotify:album:")[1];

    const album = await fetchAlbum(albumId);
    const { album_tracks_items } = getAlbum(album);
    const matchTrack = album_tracks_items?.find((t) => t.id === trackId);

    if (matchTrack) {
      const offsetPosition = matchTrack?.track_number - 1;

      await startPlayback(albumUri, offsetPosition, 0);
    } else {
      console.log("playback error");
    }
    return true;
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="pt-2 mx-10 text-xl font-bold">Spotify Queue</h1>
      <div className="mx-10 h-[35vh] overflow-y-auto">
        {queue_tracks_list ? (
          queue_tracks_list.map((track, index) => (
            <section key={index} className="flex flex-col gap-2 mt-10">
              <div className="flex gap-5 text-md font-light">
                <div>
                  {track.album?.images[0]?.url ? (
                    <div className="relative group">
                      <button
                        title="play"
                        type="button"
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
                        onClick={() => handlePlayTrack(track)}
                      >
                        <Play className="text-white w-10 h-10" />
                      </button>
                      <Image
                        className="rounded-md"
                        src={track.album?.images[0]?.url}
                        width={110}
                        height={110}
                        alt={`${track.name}'s album cover`}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>No Image</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1 justify-center">
                  <span>{track.name}</span>
                  <span>{track.artists[0]?.name}</span>
                  <span>{track.album?.name}</span>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div>Nothing in queue</div>
        )}
      </div>
    </div>
  );
};

export default SpotifyQueue;
