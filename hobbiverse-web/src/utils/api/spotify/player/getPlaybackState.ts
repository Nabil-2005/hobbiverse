import { PlaybackState } from "@/types/spotifytype";

// Get Playback State
const getPlaybackState = (playbackState: PlaybackState | null) => {
  const track_name = playbackState?.item.name || "";
  const track_artist = playbackState?.item.artists[0]?.name || "";
  const track_album_name = playbackState?.item.album.name || "";
  const track_album_cover = playbackState?.item.album.images[0]?.url || "";
  // Add more if needed
  return {
    track_name,
    track_artist,
    track_album_name,
    track_album_cover,
  };
};

export default getPlaybackState;
