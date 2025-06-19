"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import FlashcardData from "./flashcard-data-form";
import Flashcards from "./flashcards";
import { CollectedFlashcardDataType, StepsProps } from "@/types";
import FlashcardSummary from "./flashcard-summary";
import FlashcardCallback from "./flashcard-callback";

const Steps = ({ flashcards, setData }: StepsProps) => {
  const [steps, setSteps] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);
  const [collectedData, setCollectedData] =
    useState<CollectedFlashcardDataType | null>({
      title: setData?.title || "",
      description: setData?.description || undefined,
      privacy: (setData?.privacy as "public" | "private") || "public",
      category: setData?.category || undefined,
      flashcards: flashcards || undefined,
    });
  const [isCompleted, setIsCompleted] = useState(false);
  // const [direction, setDirection] = useState<"forward" | "backward">("forward");

  console.log(flashcards);

  const goToStep = (step: number) => {
    // setDirection(step > currentStep ? "forward" : "backward");
    setCurrentStep(step);
  };

  let content;

  switch (currentStep) {
    case 0:
      content = (
        <FlashcardData
          updateData={setCollectedData}
          updateCurrentStep={goToStep}
          currentData={collectedData}
          currentStep={currentStep}
          setData={setData}
        />
      );
      break;
    case 1:
      content = (
        <Flashcards
          updateData={setCollectedData}
          updateCurrentStep={goToStep}
          currentData={collectedData}
          currentStep={currentStep}
        />
      );
      break;
    case 2:
      content = (
        <FlashcardSummary
          updateData={setCollectedData}
          updateCurrentStep={goToStep}
          currentData={collectedData}
          setCompleted={setIsCompleted}
          currentStep={currentStep}
          setData={setData}
        />
      );
      break;
    case 3:
      content = (
        <FlashcardCallback
          isCompleted={isCompleted}
          updateCurrentStep={goToStep}
          currentStep={currentStep}
          setData={setData}
        />
      );
      break;
  }

  return (
    <div className="grid gap-16 py-8 h-full">
      <div className="md:w-4/6 md:mx-auto">{content}</div>
      {currentStep !== steps && (
        <div className="flex place-content-center">
          {Array.from({ length: steps }).map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`relative ${
                  index <= currentStep ? "bg-secondary" : "bg-primary/20"
                } ${
                  index === currentStep
                    ? "after:content-[''] after:absolute after:top-[-2px] after:left-[-2px] after:blur-sm after:bg-secondary/80 after:size-8 after:rounded-full "
                    : ""
                } size-7 rounded-full`}
              />
              {index !== steps - 1 && (
                <div
                  className={`${
                    index < currentStep ? "bg-secondary/40" : "bg-primary/20"
                  } w-4 h-[2px]`}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Steps;
