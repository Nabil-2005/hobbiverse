interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
}

interface SpotifyExternalUrls {
  spotify: string;
}

interface SpotifyContext {
  type: string;
  href: string;
  external_urls: SpotifyExternalUrls;
  uri: string;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyRestrictions {
  reason: string;
}

interface SpotifyArtist {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface SpotifyAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: SpotifyRestrictions;
  type: string;
  uri: string;
  artists: SpotifyArtist[];
}

interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: object;
  restrictions?: SpotifyRestrictions;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface SpotifyActions {
  interrupting_playback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_shuffle: boolean;
  toggling_repeat_track: boolean;
  transferring_playback: boolean;
}

interface SpotifyPlaybackState {
  device: SpotifyDevice;
  repeat_state: string;
  shuffle_state: boolean;
  context: SpotifyContext;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: SpotifyTrack;
  currently_playing_type: string;
  actions: SpotifyActions;
}

// Get Playback State
const getPlaybackState = (playbackState: SpotifyPlaybackState | null) => {
  const track_name = playbackState?.item.name || "";
  const track_artist = playbackState?.item.artists[0]?.name || "";
  const track_album_name = playbackState?.item.album.name || "";
  const track_album_cover = playbackState?.item.album.images[0]?.url || "";
  return {
    track_name,
    track_artist,
    track_album_name,
    track_album_cover,
  };
};

export default getPlaybackState;
