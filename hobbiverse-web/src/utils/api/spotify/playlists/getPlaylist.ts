import { DetailedPlaylist } from "@/types/spotifytype";

// Get Playlist
const getPlaylist = (playlist: DetailedPlaylist | null) => {
  const playlist_id = playlist?.id || "";
  const playlist_uri = playlist?.uri || "";
  const playlist_name = playlist?.name || "";
  const playlist_owner_display_name = playlist?.owner.display_name || "";
  const playlist_image = playlist?.images[0]?.url || null;
  const tracks_items = playlist?.tracks.items || [];
  const track_name = playlist?.tracks.items[0]?.track.name || "";
  const track_artist_name =
    playlist?.tracks.items[0]?.track.artists[0]?.name || "";
  const track_album_name = playlist?.tracks.items[0]?.track.album.name || "";
  const track_album_cover =
    playlist?.tracks.items[0]?.track.album.images[0]?.url || null;
  const track_duration_ms = playlist?.tracks.items[0]?.track.duration_ms || 0;
  // Add more if needed
  return {
    playlist_id,
    playlist_uri,
    playlist_name,
    playlist_owner_display_name,
    playlist_image,
    tracks_items,
    track_name,
    track_artist_name,
    track_album_name,
    track_album_cover,
    track_duration_ms,
  };
};

export default getPlaylist;
