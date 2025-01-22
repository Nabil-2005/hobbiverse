"use client";
import Login from "@/components/Login";
import SpotifyProfile from "@/components/profile/SpotifyProfile";
import useSpotifyAuth from "@/hooks/useSpotifyAuth";
// import { useEffect, useState } from "react";

export default function Home() {
  const accessToken = useSpotifyAuth();

  if (!accessToken || accessToken == "undefined") {
    return <Login />;
  }
  return <SpotifyProfile />;
}
