"use client";
import Login from "@/components/Login";
import SpotifyProfile from "@/components/profile/SpotifyProfile";

export default function Home() {
  const accessToken = localStorage.getItem("access_token");
  console.log(accessToken);

  if (accessToken) {
    return <SpotifyProfile accessToken={accessToken} />;
  }
  return <Login />;
}
