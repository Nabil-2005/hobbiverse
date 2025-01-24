"use client";
import usePageContext from "@/hooks/usePageContext";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface UserProfile {
  uid: number;
  username: string;
}

const dummyUser = {
  uid: 1,
  username: "nabil",
};

export const AuthContext = createContext<{
  profile: UserProfile | null;
  fetchProfile: () => void;
  signUp: () => void;
  signIn: () => void;
  signOut: () => void;
} | null>(null);

export default function AuthProvider({ children }: AuthContextProps) {
  const { toLoginPage } = usePageContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = useCallback(() => {
    const data = dummyUser;
    setProfile(data);
    console.log(data);
  }, []);

  const signUp = useCallback(() => {
    console.log("signUp function here");
  }, []);

  const signIn = useCallback(() => {
    console.log("signIn function here");
  }, []);

  const signOut = useCallback(() => {
    console.log("signOut function here");
    setProfile(null);
    toLoginPage();
  }, [toLoginPage]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const providerValue = useMemo(
    () => ({
      profile,
      fetchProfile,
      signUp,
      signIn,
      signOut,
    }),
    [profile, fetchProfile, signUp, signIn, signOut]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
