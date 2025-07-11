"use client";
import React, { useState } from "react";

import { FlashcardsProps } from "@/types";
import Button from "../button";
import { set } from "date-fns";
import Loader from "../loader";

type FlashcardSummaryProps = FlashcardsProps & {
  setCompleted: (completed: boolean) => void;
};

const FlashcardSummary = ({
  updateData,
  updateCurrentStep,
  currentData,
  setCompleted,
  currentStep,
  setData,
}: FlashcardSummaryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleFinish = async () => {
    setIsLoading(true);

    const res = !setData
      ? await fetch("/api/flashcards/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: currentData?.title,
            description: currentData?.description,
            privacy: currentData?.privacy,
            category: currentData?.category,
            flashcards: currentData?.flashcards,
          }),
        })
      : await fetch("/api/flashcards/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: setData?.id,
            title: currentData?.title,
            description: currentData?.description,
            privacy: currentData?.privacy,
            category: currentData?.category,
            flashcards: currentData?.flashcards,
          }),
        });

    if (res.ok) {
      // const data = await res.json();
      setCompleted(true);
      setIsLoading(false);
      updateCurrentStep(3);
    } else {
      // const error = await res.json();
      setCompleted(false);
      setIsLoading(false);
      updateCurrentStep(3);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="space-y-8">
          {" "}
          <p className="font-light">
            Let's summarize your flashcard data. You can always edit it later so
            don't worry.
          </p>
          <div>
            <p className="font-light">
              Title:{" "}
              <span className="font-semibold text-secondary">
                {currentData?.title}
              </span>
            </p>
            {currentData?.description && (
              <p className="font-light">
                Description:{" "}
                <span className="font-semibold text-secondary">
                  {currentData?.description}
                </span>
              </p>
            )}
            <p className="font-light">
              Privacy:{" "}
              <span className="font-semibold text-secondary">
                {currentData!.privacy?.charAt(0)?.toUpperCase() +
                  currentData?.privacy.slice(1)}
              </span>
            </p>
            {currentData?.category && (
              <p className="font-light">
                Categories:{" "}
                <span className="font-semibold text-secondary">
                  {currentData?.category.join(", ")}
                </span>
              </p>
            )}
            <div className="mt-5">
              <p className="font-light">Flashcards:</p>
              {currentData!.flashcards!.map((flashcard, index) => (
                <div key={index} className="space-y-5">
                  <div className="flex w-full sm:flex-row sm:gap-10 flex-col gap-3">
                    <div className="border border-border rounded-lg p-3 px-5 w-full text-sm">
                      {flashcard.question}
                    </div>
                    <div className="border border-border rounded-lg p-3 px-5 w-full text-sm">
                      {flashcard.answer}
                    </div>
                  </div>
                  {index !== currentData!.flashcards!.length - 1 && (
                    <hr className="bg-dark/5 border-none h-[0.1px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <Button
                className="bg-transparent font-normal !text-dark border border-border cursor-pointer hover:bg-dark/5 disabled:opacity-50 disabled:hover:bg-secondary px-8"
                onClick={() => updateCurrentStep(currentStep! - 1)}
              >
                Back
              </Button>
            </div>
            <div className="">
              <Button
                className="bg-secondary cursor-pointer hover:bg-secondary/90 disabled:opacity-50 disabled:hover:bg-secondary px-8"
                onClick={() => handleFinish()}
              >
                Finish
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlashcardSummary;
