import { DetailedAlbum } from "@/types/spotifytype";

// Get Album
const getAlbum = (album: DetailedAlbum | null) => {
  const album_name = album?.name || "";
  const album_tracks_items = album?.tracks.items || [];
  // Add more if needed
  return {
    album_name,
    album_tracks_items,
  };
};

export default getAlbum;
