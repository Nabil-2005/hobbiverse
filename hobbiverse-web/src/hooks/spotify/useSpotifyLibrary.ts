interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyExternalUrls {
  spotify: string;
}

interface SpotifyFollowers {
  href: string;
  total: number;
}

interface SpotifyUser {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  href: string;
  id: string;
  type: "user";
  uri: string;
  display_name: string;
}

interface SpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyUser;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

interface SpotifyLibrary {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyPlaylist[];
}

// Get User's Playlists
const useSpotifyLibrary = (library: SpotifyLibrary | null) => {
  const playlists = library?.items || [];

  const playlist_name = library?.items[0]?.name || "";
  const playlist_owner_name = library?.items[0]?.owner?.display_name || "";
  const playlist_image = library?.items[0]?.images[0]?.url || null;
  const playlist_tracks_href = library?.items[0]?.tracks.href || null;

  return {
    playlists,
    playlist_name,
    playlist_owner_name,
    playlist_image,
    playlist_tracks_href,
  };
};

export default useSpotifyLibrary;
