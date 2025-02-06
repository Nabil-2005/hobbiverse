interface ExternalUrls {
  spotify: string;
}

interface Restrictions {
  reason: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: "album";
  uri: string;
  artists: Artist[];
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
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

interface SpotifyQueue {
  currently_playing: Track;
  queue: Track[];
}
// export interface Track {
//   album: Album;
//   artists: Entity[];
//   duration_ms: number;
//   id: string | null;
//   is_playable: boolean;
//   name: string;
//   uid: string;
//   uri: string;
//   media_type: "audio" | "video";
//   type: "track" | "episode" | "ad";
//   track_type: "audio" | "video";
//   linked_from: {
//     uri: string | null;
//     id: string | null;
//   };
// }
// interface Entity {
//   name: string;
//   uri: string;
//   url: string;
// }

// interface Album {
//   name: string;
//   uri: string;
//   images: Image[];
// }

// interface Image {
//   height?: number | null | undefined;
//   url: string;
//   size?: string | null | undefined;
//   width?: number | null | undefined;
// }

// Get the User's Queue
// const useSpotifyQueue = (trackArray: Track[] | null) => {
//   const queue_tracks = trackArray || [];

const useSpotifyQueue = (queue: SpotifyQueue | null) => {
  const queue_tracks = queue?.queue || [];

  // const current_name = queue?.currently_playing?.name || "";
  // const current_album_name = queue?.currently_playing?.album.name || "";
  // const current_album_cover =
  //   queue?.currently_playing?.album.images[0]?.url || null;
  // const current_artist = queue?.currently_playing?.artists[0]?.name || "";

  // const queue_name = queue?.queue[0]?.name || "";
  // const queue_album_name = queue?.queue[0]?.album.name || "";
  // const queue_album_cover = queue?.queue[0]?.album.images[0]?.url || null;
  // const queue_artist = queue?.queue[0]?.artists[0]?.name || "";

  return {
    queue_tracks,
    // current_name,
    // current_album_name,
    // current_album_cover,
    // current_artist,
    // queue_name,
    // queue_album_name,
    // queue_album_cover,
    // queue_artist,
  };
};

export default useSpotifyQueue;
