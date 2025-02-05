// External URLs
interface ExternalUrls {
  spotify: string;
}

// Image Object
interface Image {
  url: string;
  height: number;
  width: number;
}

// Restrictions
interface Restrictions {
  reason: string;
}

// Artist Object
interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

// Linked Track Information (if any)
interface LinkedFrom {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

// Track Object
interface Track {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: LinkedFrom;
  restrictions?: Restrictions;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

// Tracks Paging Object
interface Tracks {
  href: string;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
  items: Track[];
}

// Copyright Information
interface Copyright {
  text: string;
  type: string;
}

// External IDs
interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

// Album Interface
interface Album {
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
  tracks: Tracks;
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
}

// Get Album
const getSpotifyAlbum = (album: Album | null) => {
  const albumTracks = album?.tracks.items;
  return {
    albumTracks,
  };
};

export default getSpotifyAlbum;
