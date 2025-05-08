"use client";
import React, { useState, useEffect } from "react";
import FlashcardData from "./flashcard-data-form";
import Flashcards from "./flashcards";
import { CollectedFlashcardDataType } from "@/types";
import FlashcardSummary from "./flashcard-summary";

const Steps = () => {
  const [steps, setSteps] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);
  const [collectedData, setCollectedData] =
    useState<CollectedFlashcardDataType | null>();

  let content;

  switch (currentStep) {
    case 0:
      content = (
        <FlashcardData
          updateData={setCollectedData}
          updateCurrentStep={setCurrentStep}
          currentData={collectedData}
        />
      );
      break;
    case 1:
      content = (
        <Flashcards
          updateData={setCollectedData}
          updateCurrentStep={setCurrentStep}
          currentData={collectedData}
        />
      );
      break;
    case 2:
      content = (
        <FlashcardSummary
          updateData={setCollectedData}
          updateCurrentStep={setCurrentStep}
          currentData={collectedData}
        />
      );
  }

  // useEffect(() => {
  //   console.log(collectedData);
  // }, [collectedData]);

  return (
    <div className="grid gap-16 py-8">
      <div className="md:w-4/6 md:mx-auto">{content}</div>
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
    </div>
  );
};

export default Steps;
