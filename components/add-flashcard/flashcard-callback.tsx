"use client";
import React from "react";
import CheckmarkAnimation from "../ui/checkmark-animation";
import FailAnimation from "../ui/fail-animation";
import Button from "../button";
import Link from "next/link";

const FlashcardCallback = ({
  isCompleted,
  updateCurrentStep,
  currentStep,
}: {
  isCompleted: boolean;
  updateCurrentStep: (data: any) => void;
  currentStep: number;
}) => {
  return (
    <div className="">
      {isCompleted ? (
        <div className="flex flex-col items-center lg:flex-row">
          <CheckmarkAnimation className="w-64 lg:w-96 mx-auto" />
          <div className="text-center lg:text-left space-y-6">
            <h2 className="text-4xl font-semibold">Success!</h2>
            <p className="font-light">
              Your flashcards have been saved successfully. You can start
              learning right away or come back later.{" "}
              <Link href="/flashcards" className="font-semibold text-secondary">
                You can browse your flashcards here.
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col items-center lg:flex-row">
            <FailAnimation className="w-52 lg:w-72 mx-auto" />
            <div className="text-center lg:text-left space-y-6">
              <h2 className="text-4xl font-semibold">Something went wrong</h2>
              <p className="font-light">
                We couldn’t save your flashcards. Please check your internet
                connection and try again.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button
              styles="bg-transparent font-normal !text-dark border border-dark/10 cursor-pointer hover:bg-dark/5 disabled:opacity-50 disabled:hover:bg-secondary px-8"
              onClick={() => updateCurrentStep(currentStep - 1)}
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
