"use client";
import { useFlashcardModeStore } from "@/stores/flashcards-mode";
import { Flashcard } from "@/types";
import React from "react";
import FlashcardMode from "./flashcard-mode";
import TestMode from "./test-mode";

const FlashcardsModes = ({ flashcards }: { flashcards: Flashcard[] }) => {
  const mode = useFlashcardModeStore((state) => state.mode);

  return (
    <>
      {mode === "flashcards" && <FlashcardMode flashcards={flashcards} />}
      {mode === "test" && <TestMode flashcards={flashcards} />}
    </>
  );
};

export default FlashcardsModes;
