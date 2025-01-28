"use client";

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { profile, fetchProfile, signUp, signIn, signOut } = authContext;

  return {
    profile,
    fetchProfile,
    signUp,
    signIn,
    signOut,
  };
};

export default useAuth;
