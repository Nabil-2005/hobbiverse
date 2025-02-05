"use client";
import useSpotifyAuth from "@/hooks/spotify/useSpotifyAuth";
import useSpotifyPlaylist from "@/hooks/spotify/useSpotifyPlaylist";
import { fetchPlaylist } from "@/utils/api/spotify";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";

const SpotifyPlaylist = () => {
  const params = useParams();
  const playlistId = params.id;
  const { accessToken } = useSpotifyAuth();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const getPlaylist = async () => {
      if (accessToken) {
        const playlistData = await fetchPlaylist(playlistId);
        setPlaylist(playlistData);
      }
    };
    getPlaylist();
  }, [accessToken, playlistId]);

  const { playlist_id, playlist_name, playlist_image, playlist_owner, tracks } =
    useSpotifyPlaylist(playlist);

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
          <span>{playlist_owner}</span>
        </div>
      </div>

      <div className="mx-10 px-10 h-full">
        {playlist_id ? (
          tracks?.map((track, index) => (
            <section
              key={index}
              className="flex flex-col gap-2 mt-3 py-3 border-b-2"
            >
              <div className="flex gap-5 text-base font-light">
                <div>
                  {track.track.album?.images[0]?.url ? (
                    <Image
                      className="rounded-md"
                      src={track.track.album?.images[0]?.url}
                      width={110}
                      height={110}
                      alt={`${track.track.name}'s album cover`}
                    />
                  ) : (
                    <div className="flex items-center justify-center border-[0.5px] h-[100px] aspect-square rounded-md border-black">
                      <p className="text-base">No Image</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row w-full justify-between items-center px-4">
                  <div className="flex flex-col justify-center gap-1">
                    <span>{track.track.name}</span>
                    <span>{track.track.artists[0]?.name}</span>
                    <span>{track.track.album?.name}</span>
                  </div>
                  <div>
                    <span>
                      {moment.utc(track.track.duration_ms).format("m:ss")}
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
