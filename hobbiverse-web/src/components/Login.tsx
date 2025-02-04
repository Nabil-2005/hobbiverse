"use client";
import React from "react";
import { Button } from "./ui/button";
import { LoginSpotify } from "@/utils/api/spotify";

interface LoginProps {
  page: string;
}

const Login = ({ page }: LoginProps) => {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div>
        <h1 className="flex items-center justify-center text-4xl font-bold">
          Welcome to Hobbiverse!
        </h1>
        {page == "music" ? (
          <div className="flex items-center justify-center">
            <Button
              onClick={() => {
                LoginSpotify();
              }}
            >
              Login to Spotify
            </Button>
          </div>
        ) : page == "games" ? (
          <div className="flex items-center justify-center">
            <Button
              onClick={() => {
                // LoginSteam();
              }}
            >
              Login to Steam
            </Button>
          </div>
        ) : page == "animanga" ? (
          <div className="flex items-center justify-center">
            <Button
              onClick={() => {
                // LoginMAL();
              }}
            >
              Login to MyAnimeList
            </Button>
          </div>
        ) : (
          <div>Invalid page params.</div>
        )}
      </div>
    </div>
  );
};

export default Login;
