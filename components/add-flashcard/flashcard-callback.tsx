"use client";
import React from "react";
import CheckmarkAnimation from "../ui/checkmark-animation";
import FailAnimation from "../ui/fail-animation";
import Button from "../button";

const FlashcardCallback = ({
  isCompleted,
  updateCurrentStep,
}: {
  isCompleted: boolean;
  updateCurrentStep: (data: any) => void;
}) => {
  return (
    <div className="">
      {isCompleted ? (
        <div className="flex flex-col items-center lg:flex-row">
          <CheckmarkAnimation className="w-96 mx-auto" />
          <div className="text-center lg:text-left space-y-1">
            <h2 className="text-3xl font-semibold">Flashcards set created</h2>
            <p className="font-light">
              Please go to your flashcards to see your new set!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col items-center lg:flex-row">
            <FailAnimation className="w-72 mx-auto" />
            <div className="text-center lg:text-left space-y-1">
              <h2 className="text-3xl font-semibold">
                Failed to create your flashcards set
              </h2>
              <p className="font-light">
                Please go back and try again. Make sure you filled all the
                required fields!
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button
              styles="bg-transparent font-normal !text-dark border border-dark/10 cursor-pointer hover:bg-dark/5 disabled:opacity-50 disabled:hover:bg-secondary px-8"
              onClick={() => updateCurrentStep((prev: number) => prev - 1)}
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardCallback;
