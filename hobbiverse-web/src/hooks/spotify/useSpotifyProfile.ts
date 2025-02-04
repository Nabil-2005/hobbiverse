interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}
interface ExternalUrls {
  spotify: string;
}
interface Followers {
  href: string | null;
  total: number;
}
interface Image {
  height: number;
  url: string;
  width: number;
}
interface SpotifyProfile {
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
  profileImage?: string;
}

// Get Current User's Profile
const useSpotifyProfile = (profile: SpotifyProfile | null) => {
  const country = profile?.country || "";
  const display_name = profile?.display_name || "";
  const email = profile?.email || "";
  const explicit_content = profile?.explicit_content || {
    filter_enabled: false,
    filter_locked: false,
  };
  const external_urls = profile?.external_urls || { spotify: "" };
  const followers = profile?.followers || { href: null, total: 0 };
  const href = profile?.href || "";
  const id = profile?.id || null;
  const images = profile?.images || [];
  const product = profile?.product || null;
  const type = profile?.type || "user";
  const uri = profile?.uri || "";
  const profileImage = images[0]?.url || null;

  return {
    country,
    display_name,
    email,
    explicit_content,
    external_urls,
    followers,
    href,
    id,
    images,
    product,
    type,
    uri,
    profileImage,
  };
};

export default useSpotifyProfile;
