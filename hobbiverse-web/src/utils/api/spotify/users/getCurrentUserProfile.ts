import { Profile } from "@/types/spotifytype";

// Get Current User's Profile
const getCurrentUserProfile = (profile: Profile | null) => {
  const country = profile?.country || "";
  const display_name = profile?.display_name || "";
  const email = profile?.email || "";
  const explicit_content = profile?.explicit_content || {
    filter_enabled: false,
    filter_locked: false,
  };
  const external_urls = profile?.external_urls || { spotify: "" };
  const followers = profile?.followers || { href: "", total: 0 };
  const href = profile?.href || "";
  const id = profile?.id || "";
  const images = profile?.images || [];
  const profile_image = images[0]?.url || null;
  const product = profile?.product || null;
  const type = profile?.type || "user";
  const uri = profile?.uri || "";

  return {
    country,
    display_name,
    email,
    explicit_content,
    external_urls,
    followers,
    href,
    id,
    profile_image,
    product,
    type,
    uri,
  };
};

export default getCurrentUserProfile;
