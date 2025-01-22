"use client";
import React from "react";
import { Button } from "./ui/button";
import { LoginSpotify } from "@/utils/api/spotify";

const Login = () => {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div>
        <h1 className="flex items-center justify-center text-4xl font-bold">
          Welcome to Hobbiverse!
        </h1>
        <div className="flex items-center justify-center">
          <Button
            onClick={() => {
              LoginSpotify();
            }}
          >
            Login to Spotify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
