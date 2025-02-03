"use client";
import { useSpotifyPlayer } from "@/context/spotify/SpotifyPlayerContext";
import useSpotifyAuth from "@/hooks/useSpotifyAuth";
import useSpotifyQueue from "@/hooks/useSpotifyQueue";
import { fetchQueue } from "@/utils/api/spotify";
import Image from "next/image";
import { useEffect, useState } from "react";

const SpotifyQueue = () => {
  const { accessToken } = useSpotifyAuth();
  const { currentTrack } = useSpotifyPlayer();
  const [queue, setQueue] = useState(null);

  useEffect(() => {
    console.log("queue use effect runs");

    const getQueue = async () => {
      if (accessToken) {
        const queueData = await fetchQueue();
        setQueue(queueData);
        console.log(queueData);
      }
    };

    if (currentTrack) getQueue();
  }, [accessToken, currentTrack]);

  const { queue_tracks } = useSpotifyQueue(queue);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="pt-2 mx-10 text-xl font-bold">Spotify Queue</h1>
      <div className="mx-10 h-[30vh] overflow-y-auto">
        {queue_tracks ? (
          queue_tracks.map((track, index) => (
            <section key={index} className="flex flex-col gap-2 mt-10">
              <div className="flex gap-5 text-md font-light">
                <div>
                  {track.album?.images[0]?.url ? (
                    <Image
                      className="rounded-md"
                      src={track.album?.images[0]?.url}
                      width={100}
                      height={100}
                      alt={`${queue_tracks[0]?.name}'s profile image`}
                    />
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
