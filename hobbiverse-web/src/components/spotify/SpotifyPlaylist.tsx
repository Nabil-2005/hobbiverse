"use client";
import useSpotifyAuth from "@/hooks/spotify/useSpotifyAuth";
import { fetchPlaylist, startPlayback } from "@/utils/api/spotify/spotify";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Play } from "lucide-react";
import { useSpotifyPlayer } from "@/context/spotify/SpotifyPlayerContext";
import getPlaylist from "@/utils/api/spotify/playlists/getPlaylist";
import { PlaylistItem } from "@/types/spotifytype";

const SpotifyPlaylist = () => {
  const params = useParams();
  const playlistId = params.id;
  const { accessToken } = useSpotifyAuth();
  const { player, setTrack, setNextTracks, setPrevTracks } = useSpotifyPlayer();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      if (accessToken) {
        const playlistData = await fetchPlaylist(playlistId);
        setPlaylist(playlistData);
      }
    };
    fetchApi();
  }, [accessToken, playlistId]);

  const {
    playlist_id,
    playlist_uri,
    playlist_name,
    playlist_image,
    playlist_owner_display_name,
    tracks_items,
  } = getPlaylist(playlist);

  const handlePlayTrack = async (item: PlaylistItem) => {
    const trackId = item.track.id;
    const matchTrackIndex = tracks_items?.findIndex(
      (t) => t.track.id === trackId
    );

    if (typeof matchTrackIndex === "number") {
      const contextUri = playlist_uri;
      const offsetPosition = matchTrackIndex;

      await startPlayback(contextUri, offsetPosition, 0);
      player?.getCurrentState().then((state) => {
        if (!state) return;
        setTrack(state.track_window.current_track);
        setNextTracks(state.track_window.next_tracks);
        setPrevTracks(state.track_window.previous_tracks);
      });
    } else {
      console.log("playback error");
    }
    return true;
  };

  return (
    <section className="flex flex-col w-full overflow-y-auto">
      <div className="flex mt-5 px-10 gap-5 text-md font-light">
        <div>
          {playlist_image ? (
            <Image
              className="rounded-md"
              src={playlist_image}
              width={240}
              height={240}
              alt={`${playlist_name}'s cover image`}
            />
          ) : (
            <div>
              <p>No Image</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6 justify-center">
          <span className="text-xl">{playlist_name}</span>
          <span>{playlist_owner_display_name}</span>
        </div>
      </div>

      <div className="mx-10 px-10 h-full">
        {playlist_id ? (
          tracks_items?.map((item, index) => (
            <section
              key={index}
              className="flex flex-col gap-2 mt-3 py-3 border-b-2"
            >
              <div className="flex gap-5 text-base font-light">
                <div>
                  {item.track.album?.images[0]?.url ? (
                    <div className="relative group">
                      <button
                        title="play"
                        type="button"
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
                        onClick={() => handlePlayTrack(item)}
                      >
                        <Play className="text-white w-10 h-10" />
                      </button>
                      <Image
                        className="rounded-md"
                        src={item.track.album?.images[0]?.url}
                        width={110}
                        height={110}
                        alt={`${item.track.name}'s album cover`}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center border-[0.5px] h-[100px] aspect-square rounded-md border-black">
                      <p className="text-base">No Image</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row w-full justify-between items-center px-4">
                  <div className="flex flex-col justify-center gap-1">
                    <span>{item.track.name}</span>
                    <span>{item.track.artists[0]?.name}</span>
                    <span>{item.track.album?.name}</span>
                  </div>
                  <div>
                    <span>
                      {moment.utc(item.track.duration_ms).format("m:ss")}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div>Playlist does not exist</div>
        )}
      </div>
    </section>
  );
};

export default SpotifyPlaylist;
