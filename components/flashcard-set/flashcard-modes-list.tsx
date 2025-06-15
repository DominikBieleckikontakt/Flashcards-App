"use client";
import React from "react";
import Link from "next/link";
import { useFlashcardModeStore } from "@/stores/flashcards-mode";

const FlashcardModeItem = ({
  label,
  description,
  href,
  className,
}: {
  label: string;
  description: string;
  href?: string;
  className?: string;
}) => {
  const mode = useFlashcardModeStore((state) => state.mode);
  const setMode = useFlashcardModeStore((state) => state.setMode);

  return (
    <div
      className={`${className} border border-border rounded-lg w-full p-5 hover:border-secondary duration-300 cursor-pointer ${
        mode === label.toLowerCase() ? "border-secondary" : "border-border"
      }`}
      onClick={() => setMode(label.toLowerCase())}
    >
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="font-light">{description}</p>
    </div>
  );
};

const FlashcardModesList = () => {
  return (
    <div className="w-full space-y-2">
      <h3 className="w-full text-xl font-light">Choose mode</h3>
      <div className="grid lg:grid-cols-2 gap-5 w-full">
        <FlashcardModeItem
          label="Flashcards"
          description="Review cards one by one to learn at your own pace."
        />
        <FlashcardModeItem
          label="Test"
          description="Answer questions to check what you’ve learned."
        />
      </div>
    </div>
  );
};

export default FlashcardModesList;
