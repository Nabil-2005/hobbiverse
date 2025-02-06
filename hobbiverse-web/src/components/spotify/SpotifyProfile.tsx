"use client";
import useSpotifyAuth from "@/hooks/spotify/useSpotifyAuth";
import { fetchProfile } from "@/utils/api/spotify/spotify";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import getCurrentUserProfile from "@/utils/api/spotify/users/getCurrentUserProfile";

const SpotifyProfile: React.FC = () => {
  const { accessToken } = useSpotifyAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      if (accessToken) {
        const profileData = await fetchProfile();
        setProfile(profileData);
      }
    };
    getProfile();
  }, [accessToken]);

  const { display_name, email, href, id, profile_image, uri } =
    getCurrentUserProfile(profile);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-xl font-bold">Display your Spotify profile data</h1>

        <section className="flex flex-col gap-2 mt-10">
          <h2 className="text-lg font-semibold">Logged in as {display_name}</h2>
          <ul className="flex flex-col gap-5 text-md font-light">
            <li>
              Profile Image:
              {profile_image ? (
                <Image
                  className="rounded-md"
                  src={profile_image}
                  width={200}
                  height={200}
                  alt={`${display_name}'s profile image`}
                />
              ) : (
                <div>
                  <p>No Image</p>
                </div>
              )}
            </li>
            <li>User ID: {id}</li>
            <li>Email: {email}</li>
            <li>Spotify URI: {uri}</li>
            <li>Link: {href}</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SpotifyProfile;
