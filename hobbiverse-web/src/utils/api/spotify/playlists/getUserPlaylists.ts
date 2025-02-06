import { UserPlaylists } from "@/types/spotifytype";

// Get User's Playlists
const getUserPlaylists = (playlists: UserPlaylists | null) => {
  const playlists_items = playlists?.items || [];
  // Add more if needed
  return {
    playlists_items,
  };
};

export default getUserPlaylists;
