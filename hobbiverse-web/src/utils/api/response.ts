export const getAlbumResponse = {
  album_type: "compilation",
  total_tracks: 9,
  available_markets: ["CA", "BR", "IT"],
  external_urls: {
    spotify: "string",
  },
  href: "string",
  id: "2up3OPMp9Tb4dAKM2erWXQ",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      height: 300,
      width: 300,
    },
  ],
  name: "string",
  release_date: "1981-12",
  release_date_precision: "year",
  restrictions: {
    reason: "market",
  },
  type: "album",
  uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
  artists: [
    {
      external_urls: {
        spotify: "string",
      },
      href: "string",
      id: "string",
      name: "string",
      type: "artist",
      uri: "string",
    },
  ],
  tracks: {
    href: "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    limit: 20,
    next: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    offset: 0,
    previous: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    total: 4,
    items: [
      {
        artists: [
          {
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "string",
            name: "string",
            type: "artist",
            uri: "string",
          },
        ],
        available_markets: ["string"],
        disc_number: 0,
        duration_ms: 0,
        explicit: false,
        external_urls: {
          spotify: "string",
        },
        href: "string",
        id: "string",
        is_playable: false,
        linked_from: {
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          type: "string",
          uri: "string",
        },
        restrictions: {
          reason: "string",
        },
        name: "string",
        preview_url: "string",
        track_number: 0,
        type: "string",
        uri: "string",
        is_local: false,
      },
    ],
  },
  copyrights: [
    {
      text: "string",
      type: "string",
    },
  ],
  external_ids: {
    isrc: "string",
    ean: "string",
    upc: "string",
  },
  genres: [],
  label: "string",
  popularity: 0,
};

export const getArtistResponse = {
  external_urls: {
    spotify: "string",
  },
  followers: {
    href: "string",
    total: 0,
  },
  genres: ["Prog rock", "Grunge"],
  href: "string",
  id: "string",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      height: 300,
      width: 300,
    },
  ],
  name: "string",
  popularity: 0,
  type: "artist",
  uri: "string",
};

export const getPlaybackStateResponse = {
  device: {
    id: "string",
    is_active: false,
    is_private_session: false,
    is_restricted: false,
    name: "Kitchen speaker",
    type: "computer",
    volume_percent: 59,
    supports_volume: false,
  },
  repeat_state: "string",
  shuffle_state: false,
  context: {
    type: "string",
    href: "string",
    external_urls: {
      spotify: "string",
    },
    uri: "string",
  },
  timestamp: 0,
  progress_ms: 0,
  is_playing: false,
  item: {
    album: {
      album_type: "compilation",
      total_tracks: 9,
      available_markets: ["CA", "BR", "IT"],
      external_urls: {
        spotify: "string",
      },
      href: "string",
      id: "2up3OPMp9Tb4dAKM2erWXQ",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          height: 300,
          width: 300,
        },
      ],
      name: "string",
      release_date: "1981-12",
      release_date_precision: "year",
      restrictions: {
        reason: "market",
      },
      type: "album",
      uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
      artists: [
        {
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          name: "string",
          type: "artist",
          uri: "string",
        },
      ],
    },
    artists: [
      {
        external_urls: {
          spotify: "string",
        },
        href: "string",
        id: "string",
        name: "string",
        type: "artist",
        uri: "string",
      },
    ],
    available_markets: ["string"],
    disc_number: 0,
    duration_ms: 0,
    explicit: false,
    external_ids: {
      isrc: "string",
      ean: "string",
      upc: "string",
    },
    external_urls: {
      spotify: "string",
    },
    href: "string",
    id: "string",
    is_playable: false,
    linked_from: {},
    restrictions: {
      reason: "string",
    },
    name: "string",
    popularity: 0,
    preview_url: "string",
    track_number: 0,
    type: "track",
    uri: "string",
    is_local: false,
  },
  currently_playing_type: "string",
  actions: {
    interrupting_playback: false,
    pausing: false,
    resuming: false,
    seeking: false,
    skipping_next: false,
    skipping_prev: false,
    toggling_repeat_context: false,
    toggling_shuffle: false,
    toggling_repeat_track: false,
    transferring_playback: false,
  },
};

export const getAvailableDevicesResponse = {
  devices: [
    {
      id: "string",
      is_active: false,
      is_private_session: false,
      is_restricted: false,
      name: "Kitchen speaker",
      type: "computer",
      volume_percent: 59,
      supports_volume: false,
    },
  ],
};

export const getUserQueueResponse = {
  currently_playing: {
    album: {
      album_type: "compilation",
      total_tracks: 9,
      available_markets: ["CA", "BR", "IT"],
      external_urls: {
        spotify: "string",
      },
      href: "string",
      id: "2up3OPMp9Tb4dAKM2erWXQ",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          height: 300,
          width: 300,
        },
      ],
      name: "string",
      release_date: "1981-12",
      release_date_precision: "year",
      restrictions: {
        reason: "market",
      },
      type: "album",
      uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
      artists: [
        {
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          name: "string",
          type: "artist",
          uri: "string",
        },
      ],
    },
    artists: [
      {
        external_urls: {
          spotify: "string",
        },
        href: "string",
        id: "string",
        name: "string",
        type: "artist",
        uri: "string",
      },
    ],
    available_markets: ["string"],
    disc_number: 0,
    duration_ms: 0,
    explicit: false,
    external_ids: {
      isrc: "string",
      ean: "string",
      upc: "string",
    },
    external_urls: {
      spotify: "string",
    },
    href: "string",
    id: "string",
    is_playable: false,
    linked_from: {},
    restrictions: {
      reason: "string",
    },
    name: "string",
    popularity: 0,
    preview_url: "string",
    track_number: 0,
    type: "track",
    uri: "string",
    is_local: false,
  },
  queue: [
    {
      album: {
        album_type: "compilation",
        total_tracks: 9,
        available_markets: ["CA", "BR", "IT"],
        external_urls: {
          spotify: "string",
        },
        href: "string",
        id: "2up3OPMp9Tb4dAKM2erWXQ",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            height: 300,
            width: 300,
          },
        ],
        name: "string",
        release_date: "1981-12",
        release_date_precision: "year",
        restrictions: {
          reason: "market",
        },
        type: "album",
        uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
        artists: [
          {
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "string",
            name: "string",
            type: "artist",
            uri: "string",
          },
        ],
      },
      artists: [
        {
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          name: "string",
          type: "artist",
          uri: "string",
        },
      ],
      available_markets: ["string"],
      disc_number: 0,
      duration_ms: 0,
      explicit: false,
      external_ids: {
        isrc: "string",
        ean: "string",
        upc: "string",
      },
      external_urls: {
        spotify: "string",
      },
      href: "string",
      id: "string",
      is_playable: false,
      linked_from: {},
      restrictions: {
        reason: "string",
      },
      name: "string",
      popularity: 0,
      preview_url: "string",
      track_number: 0,
      type: "track",
      uri: "string",
      is_local: false,
    },
  ],
};

export const getPlaylistResponse = {
  collaborative: false,
  description: "string",
  external_urls: {
    spotify: "string",
  },
  followers: {
    href: "string",
    total: 0,
  },
  href: "string",
  id: "string",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      height: 300,
      width: 300,
    },
  ],
  name: "string",
  owner: {
    external_urls: {
      spotify: "string",
    },
    followers: {
      href: "string",
      total: 0,
    },
    href: "string",
    id: "string",
    type: "user",
    uri: "string",
    display_name: "string",
  },
  public: false,
  snapshot_id: "string",
  tracks: {
    href: "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    limit: 20,
    next: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    offset: 0,
    previous: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    total: 4,
    items: [
      {
        added_at: "string",
        added_by: {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          href: "string",
          id: "string",
          type: "user",
          uri: "string",
        },
        is_local: false,
        track: {
          album: {
            album_type: "compilation",
            total_tracks: 9,
            available_markets: ["CA", "BR", "IT"],
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "2up3OPMp9Tb4dAKM2erWXQ",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                height: 300,
                width: 300,
              },
            ],
            name: "string",
            release_date: "1981-12",
            release_date_precision: "year",
            restrictions: {
              reason: "market",
            },
            type: "album",
            uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
            artists: [
              {
                external_urls: {
                  spotify: "string",
                },
                href: "string",
                id: "string",
                name: "string",
                type: "artist",
                uri: "string",
              },
            ],
          },
          artists: [
            {
              external_urls: {
                spotify: "string",
              },
              href: "string",
              id: "string",
              name: "string",
              type: "artist",
              uri: "string",
            },
          ],
          available_markets: ["string"],
          disc_number: 0,
          duration_ms: 0,
          explicit: false,
          external_ids: {
            isrc: "string",
            ean: "string",
            upc: "string",
          },
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          is_playable: false,
          linked_from: {},
          restrictions: {
            reason: "string",
          },
          name: "string",
          popularity: 0,
          preview_url: "string",
          track_number: 0,
          type: "track",
          uri: "string",
          is_local: false,
        },
      },
    ],
  },
  type: "string",
  uri: "string",
};

export const getUserPlaylistResponse = {
  href: "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  limit: 20,
  next: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  offset: 0,
  previous: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  total: 4,
  items: [
    {
      collaborative: false,
      description: "string",
      external_urls: {
        spotify: "string",
      },
      href: "string",
      id: "string",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          height: 300,
          width: 300,
        },
      ],
      name: "string",
      owner: {
        external_urls: {
          spotify: "string",
        },
        followers: {
          href: "string",
          total: 0,
        },
        href: "string",
        id: "string",
        type: "user",
        uri: "string",
        display_name: "string",
      },
      public: false,
      snapshot_id: "string",
      tracks: {
        href: "string",
        total: 0,
      },
      type: "string",
      uri: "string",
    },
  ],
};

export const getCurrentUserProfileResponse = {
  country: "string",
  display_name: "string",
  email: "string",
  explicit_content: {
    filter_enabled: false,
    filter_locked: false,
  },
  external_urls: {
    spotify: "string",
  },
  followers: {
    href: "string",
    total: 0,
  },
  href: "string",
  id: "string",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      height: 300,
      width: 300,
    },
  ],
  product: "string",
  type: "string",
  uri: "string",
};
