import useProfile from "@/hooks/useProfile";
import { fetchProfile } from "@/utils/api/spotify";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type SpotifyProfileProps = {
  accessToken: string | null;
};

const SpotifyProfile: React.FC<SpotifyProfileProps> = ({ accessToken }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const profileData = await fetchProfile(accessToken!);
      setProfile(profileData);
      console.log(profileData);
    };
    getProfile();
  }, [accessToken]);

  const { display_name, email, href, id, uri, profileImage } =
    useProfile(profile);

  return (
    <div className="flex flex-col gap-5 mt-10">
      <div>
        <h1 className="flex items-center justify-center text-4xl font-bold">
          Display your Spotify profile data
        </h1>

        <section id="profile">
          <h2>
            Logged in as <span id="displayName">{display_name}</span>
          </h2>
          <ul>
            <li>
              Profile Image: <span id="imgUrl"></span>
              {profileImage ? (
                <span id="avatar">
                  <Image
                    src={profileImage}
                    width={200}
                    height={200}
                    alt={`${display_name}'s profile image`}
                  />
                </span>
              ) : (
                <div>
                  <p>No Image</p>
                </div>
              )}
            </li>
            <li>
              User ID: <span id="id">{id}</span>
            </li>
            <li>
              Email: <span id="email">{email}</span>
            </li>
            <li>
              Spotify URI:{" "}
              <a id="uri" href="#">
                {uri}
              </a>
            </li>
            <li>
              Link:{" "}
              <a id="url" href="#">
                {href}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SpotifyProfile;
