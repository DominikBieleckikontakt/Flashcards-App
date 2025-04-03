"use client";
import { getCurrentSession } from "@/actions/cookies";
import { useUserStore } from "@/stores/user";
import { useEffect } from "react";

const Home = () => {
  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);

  useEffect(() => {
    const saveUser = async () => {
      if (!currentUser) {
        const { user } = await getCurrentSession();

        user && setUser(user);
      }
    };

    saveUser();
  }, [setUser]);

  return <div className=""></div>;
};

export default Home;
