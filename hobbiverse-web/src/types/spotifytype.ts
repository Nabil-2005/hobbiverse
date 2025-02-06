interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: string | null;
  total: number;
}

interface User {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: "user";
  uri: string;
  display_name: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Restrictions {
  reason: string;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

interface DetailedArtist extends Artist {
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  images: Image[];
  popularity: number;
}

interface LinkedFrom {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

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

interface DetailedTrack extends Track {
  album: Album;
  external_ids: ExternalIds;
  // linked_from?: object;
  popularity: number;
}

interface Tracks {
  href: string;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
  items: Track[];
}

interface PlaylistItem {
  added_at: string;
  added_by: User;
  is_local: boolean;
  track: DetailedTrack;
}

interface PlaylistTracks {
  href: string;
  total: number;
}

interface DetailedPlaylistTracks extends PlaylistTracks {
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  items: PlaylistItem[];
}

interface Copyright {
  text: string;
  type: string;
}

interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
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
  type: string;
  uri: string;
  artists: Artist[];
}

interface DetailedAlbum extends Album {
  //   album_type: "album" | "single" | "compilation";
  tracks: Tracks;
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
}

interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
}

interface Devices {
  devices: Device[];
}

interface Context {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}

interface Actions {
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

interface PlaybackState {
  device: Device;
  repeat_state: string;
  shuffle_state: boolean;
  context: Context;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: DetailedTrack;
  currently_playing_type: string;
  actions: Actions;
}

interface Queue {
  currently_playing: DetailedTrack;
  queue: DetailedTrack[];
}

interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: User;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
}

interface DetailedPlaylist extends Playlist {
  followers: Followers;
  tracks: DetailedPlaylistTracks;
}

interface UserPlaylists {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Playlist[];
}

interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

interface Profile {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_content?: ExplicitContent;
  external_urls?: ExternalUrls;
  followers?: Followers;
  href?: string;
  id?: string;
  images?: Image[];
  product?: string;
  type?: string;
  uri?: string;
}

export type {
  ExternalUrls,
  Followers,
  User,
  Image,
  Restrictions,
  Artist,
  DetailedArtist,
  LinkedFrom,
  Track,
  DetailedTrack,
  Tracks,
  PlaylistItem,
  PlaylistTracks,
  DetailedPlaylistTracks,
  Copyright,
  ExternalIds,
  Album,
  DetailedAlbum,
  Device,
  Devices,
  Context,
  Actions,
  PlaybackState,
  Queue,
  Playlist,
  DetailedPlaylist,
  UserPlaylists,
  ExplicitContent,
  Profile,
};
