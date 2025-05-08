import React, { useState } from "react";

import Button from "../button";
import FlashcardsInput from "./flashcards-input";
import Input from "../ui/input";
import { Download } from "lucide-react";
import Loader from "../loader";
import Textarea from "../ui/textarea";
import { CollectedFlashcardDataType, FlashcardsProps } from "@/types";

type Flashcard = {
  id: number;
  question: string;
  answer: string;
};

const Flashcards = ({
  updateData,
  updateCurrentStep,
  currentData,
}: FlashcardsProps) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(
    currentData?.flashcards || [
      {
        id: 0,
        question: "",
        answer: "",
      },
    ]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

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

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;
    if (!file) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/flashcards/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      let raw = data.flashcards?.trim() ?? "";

      // Clean up AI response for safe parsing
      if (raw.startsWith('"') && raw.endsWith('"')) {
        raw = raw.slice(1, -1);
      }

      raw = raw
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
        .replace(/\\?"/g, '\\"')
        .replace(/\\"/g, '"');

      const parsed: Flashcard[] = JSON.parse(raw);

      setFlashcards((prev) => [
        ...prev,
        ...parsed.map((fc, i) => ({
          ...fc,
          id: prev.length + i,
        })),
      ]);
    } catch (error) {
      console.error("Failed to parse AI response", error);
    } finally {
      setIsLoading(false);
      setIsFileUploaded(false);
    }
  };

  const updateDataHandler = () => {
    updateData((prev: CollectedFlashcardDataType | null) => ({
      ...prev,
      flashcards,
    }));
  };

  const changeStep = (type: "prev" | "next") => {
    updateDataHandler();
    updateCurrentStep((prev: number) =>
      type === "prev" ? prev - 1 : prev + 1
    );
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
            <div>
              <form onSubmit={handleFileUpload} className="space-y-5">
                <Input
                  placeholder="Upload a photo"
                  name="file"
                  id="file"
                  type="file"
                  accept="image/*"
                  inputClassnames="!border !border-dark/10 text-dark/60 cursor-pointer hover:!border-primary"
                  icon={<Download className="text-dark/30" />}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    file ? setIsFileUploaded(true) : setIsFileUploaded(false);
                  }}
                />
                <Textarea
                  label=""
                  placeholder="Give AI some hints about your flashcards. It will help it to create better flashcards for you! You can tell what is in the photo, what is the topic of your flashcards, etc."
                  styles="border border-dark/10 rounded-md mt-2"
                  rows={3}
                  name="description"
                  id="description"
                />
                <div className="w-full text-center mt-6">
                  <Button
                    type="submit"
                    styles="bg-transparent !text-dark border !border-dark/10 hover:bg-dark/5 !font-light text-lg disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer"
                    disabled={!isFileUploaded}
                  >
                    Generate
                  </Button>
                </div>
              </form>
            </div>
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
              styles="!text-dark cursor-pointer border border-dark/10 hover:bg-dark/5 duration-300 font-light text-lg bg-transparent"
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
      <div className="flex justify-between">
        <div className="">
          <Button
            disabled={isLoading}
            styles="bg-transparent font-normal !text-dark border border-dark/10 cursor-pointer hover:bg-dark/5 disabled:opacity-50 disabled:hover:bg-secondary px-8"
            onClick={() => changeStep("prev")}
          >
            Back
          </Button>
        </div>
        <div className="">
          <Button
            disabled={
              isLoading ||
              flashcards.length === 0 ||
              flashcards[0].question === "" ||
              flashcards[0].answer === ""
            }
            styles="bg-secondary cursor-pointer hover:bg-secondary/90 disabled:opacity-50 disabled:hover:bg-secondary px-8"
            onClick={() => changeStep("next")}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
