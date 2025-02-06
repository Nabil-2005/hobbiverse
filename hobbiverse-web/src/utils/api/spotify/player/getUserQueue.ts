import { Queue } from "@/types/spotifytype";

// Get the User's Queue
const getUserQueue = (queue: Queue | null) => {
  const currently_playing = queue?.currently_playing || null;
  const queue_tracks_list = queue?.queue || [];
  // Add more if needed
  return {
    currently_playing,
    queue_tracks_list,
  };
};

export default getUserQueue;
