export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: SpotifyUser;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyUser {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: "user";
  uri: string;
  display_name: string;
}

export interface PlaylistTracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  added_at: string;
  added_by: SpotifyUser;
  is_local: boolean;
  track: Track;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: object;
  restrictions?: Restrictions;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface Album {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: Restrictions;
  type: "album";
  uri: string;
  artists: Artist[];
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

export interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface Restrictions {
  reason: string;
}

// Get Playlist
const useSpotifyPlaylist = (playlist: Playlist | null) => {
  const playlist_id = playlist?.id || "";
  const playlist_uri = playlist?.uri || "";
  const playlist_name = playlist?.name || "";
  const playlist_owner = playlist?.owner.display_name || "";
  const playlist_image = playlist?.images[0]?.url || null;

  const tracks = playlist?.tracks.items;

  const track_name = playlist?.tracks.items[0]?.track.name;
  const track_artist = playlist?.tracks.items[0]?.track.artists[0]?.name;
  const track_album_name = playlist?.tracks.items[0]?.track.album.name;
  const track_album_cover =
    playlist?.tracks.items[0]?.track.album.images[0]?.url;
  const track_duration_ms = playlist?.tracks.items[0]?.track.duration_ms;

  return {
    playlist_id,
    playlist_uri,
    playlist_name,
    playlist_owner,
    playlist_image,
    tracks,
    track_name,
    track_artist,
    track_album_name,
    track_album_cover,
    track_duration_ms,
  };
};

export default useSpotifyPlaylist;
