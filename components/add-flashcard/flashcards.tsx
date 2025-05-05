import React, { useState } from "react";

import { Button } from "../ui/button";
import FlashcardsInput from "./flashcards-input";
import Input from "../ui/input";
import { Download } from "lucide-react";
import Loader from "../loader";

type Flashcard = {
  id: number;
  question: string;
  answer: string;
};

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: 0,
      question: "",
      answer: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addFlashcard = () => {
    setFlashcards((prev) => [
      ...prev,
      { id: prev.length, question: "", answer: "" },
    ]);
  };

  const editFlashcard = (id: number, question: string, answer: string) => {
    setFlashcards((prev) =>
      prev.map((flashcard) =>
        flashcard.id === id ? { ...flashcard, question, answer } : flashcard
      )
    );
  };

  const removeFlashcard = (id: number) => {
    setFlashcards((prev) => prev.filter((flashcard) => flashcard.id !== id));
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/flashcards/generate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setIsLoading(false);
    console.log(data); // Handle the recognized text as needed
    setFlashcards((prev) => {
      const raw = data.flashcards;

      // Usuń początkowy i końcowy cudzysłów, jeśli są
      let cleaned = raw.trim();
      if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.slice(1, -1);
      }

      // Zamień wszystkie pojedyncze cudzysłowy wokół kluczy na podwójne
      // Uwaga: To bardzo uproszczone i działa tylko na poprawnym JS-like obiekcie
      cleaned = cleaned
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // klucze w ""
        .replace(/\\?"/g, '\\"'); // escape cudzysłowy w wartościach

      // Popraw potencjalnie podwójne escapowanie
      cleaned = cleaned.replace(/\\"/g, '"');

      const flashcards = JSON.parse(cleaned) as Flashcard[];

      return [
        ...prev,
        ...flashcards.map((flashcard, index) => ({
          ...flashcard,
          id: prev.length + index,
        })),
      ];
    });
  };

  return (
    <div className="space-y-8">
      <p className="font-light">
        Create flashcards for your set! You can make a photo to let AI create
        flashcards for you or just enter it manually.
      </p>
      {!isLoading ? (
        <>
          <div className="space-y-2">
            <p className="font-light">
              Let <span className="font-normal text-secondary">AI</span> create
              flashcards for you...
            </p>
            <Input
              placeholder="Upload a photo"
              type="file"
              accept="image/*"
              inputClassnames="!border !border-dark/10 text-dark/60 cursor-pointer hover:!border-primary"
              icon={<Download className="text-dark/30" />}
              onChange={handleFileChange}
            />
          </div>
          <div className="space-y-2">
            <p className="font-light">
              ...or add them{" "}
              <span className="font-normal text-secondary">manually</span>!
            </p>
            <div className="space-y-5">
              {flashcards.map((flashcard) => (
                <FlashcardsInput
                  key={flashcard.id}
                  id={flashcard.id}
                  remove={removeFlashcard}
                  edit={editFlashcard}
                  question={flashcard.question}
                  answer={flashcard.answer}
                />
              ))}
            </div>
          </div>
          <div className="w-full flex place-content-center">
            <Button
              variant="outline"
              className="cursor-pointer hover:bg-secondary/20 duration-300 font-light text-lg py-5"
              onClick={addFlashcard}
              disabled={isLoading}
            >
              Add a flashcard
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-5">
          <p className="font-light">Please wait, we are proccesing your file</p>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Flashcards;
