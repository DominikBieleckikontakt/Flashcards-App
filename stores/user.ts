import { UserType } from "@/types";
import { create } from "zustand";

interface UserState {
  user: UserType | null;
  setUser: (user: UserType) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: UserType) => set({ user }),
  clearUser: () => set({ user: null }),
}));
