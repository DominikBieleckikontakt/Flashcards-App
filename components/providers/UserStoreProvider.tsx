"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/user";
import { UserType } from "@/types";

type UserAuthProviderProps = {
  user: UserType | null;
  children: React.ReactNode;
};

const UserAuthProvider = ({ user, children }: UserAuthProviderProps) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user !== null) {
      setUser(user);
    }
  }, [user, setUser]);

  return <>{children}</>;
};

export default UserAuthProvider;
