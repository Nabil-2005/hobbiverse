import { DetailedArtist } from "@/types/spotifytype";

// Get Artist
const getArtist = (artist: DetailedArtist | null) => {
  const artist_name = artist?.name || "";
  // Add more if needed
  return {
    artist_name,
  };
};

export default getArtist;
