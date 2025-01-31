"use client";
import useSpotifyAuth from "@/hooks/useSpotifyAuth";
import { fetchQueue } from "@/utils/api/spotify";
import { useEffect, useState } from "react";

const SpotifyQueue = () => {
  const { accessToken } = useSpotifyAuth();
  const [queue, setQueue] = useState(null);

  useEffect(() => {
    const getQueue = async () => {
      if (accessToken) {
        const queueData = await fetchQueue();
        setQueue(queueData);
        console.log(queueData);
      }
    };
    getQueue();
  }, [accessToken]);

  return <div>SpotifyQueue</div>;
};

export default SpotifyQueue;
