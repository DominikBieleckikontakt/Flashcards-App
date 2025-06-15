import { create } from "zustand";

interface FlashcardMode {
  mode: string;
  setMode: (mode: string) => void;
}

export const useFlashcardModeStore = create<FlashcardMode>((set) => ({
  mode: "flashcards",
  setMode: (mode: string) => set({ mode }),
}));
