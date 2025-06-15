"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { shuffleArray } from "@/lib/utils";

import { ArrowLeftCircle, ArrowRightCircle, Shuffle } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Button from "../button";

const FlashcardMode = ({
  flashcards,
}: {
  flashcards: {
    id: string;
    question: string;
    answer: string;
  }[];
}) => {
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcardsSet, setFlashcardsSet] = useState(flashcards);
  const [showAnswer, setShowAnswer] = useState(false);

  const [direction, setDirection] = useState("forward");

  const shuffleFlashcards = () => {
    setFlashcardsSet(shuffleArray(flashcards));
    setCurrentFlashcardIndex(0);
  };

  const handleNext = () => {
    setDirection("forward");
    setCurrentFlashcardIndex((prev) => prev + 1);
    setShowAnswer(false);
  };

  const handlePrevious = () => {
    setDirection("backward");
    setCurrentFlashcardIndex((prev) => prev - 1);
    setShowAnswer(false);
  };

  const variants = {
    initial: (direction: string) => ({
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 45 },
    },
    exit: (direction: string) => ({
      x: direction === "forward" ? "-100%" : "100%",
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.1 },
    }),
  };

  return (
    <div className="w-full space-y-3 overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentFlashcardIndex}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full rounded-lg cursor-pointer relative h-fit"
          style={{ perspective: 2500 }}
        >
          <motion.div
            className={`border border-border w-full h-[250px] lg:h-[400px] flex items-center justify-center rounded-t-lg
            ${
              currentFlashcardIndex === flashcardsSet.length - 1 &&
              "rounded-bl-none rounded-br-none"
            }
            ${
              currentFlashcardIndex < flashcardsSet.length - 1 && showAnswer
                ? "rounded-bl-lg"
                : "rounded-br-lg"
            }    

            `}
            animate={{ rotateY: showAnswer ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={() => setShowAnswer((prev) => !prev)}
          >
            {/* Front */}
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center max-sm:px-2">
              {flashcardsSet[currentFlashcardIndex].question}
            </div>

            {/* Back */}
            <div
              className="absolute w-full h-full backface-hidden flex items-center justify-center max-sm:px-2"
              style={{ transform: "rotateY(180deg)" }}
            >
              {flashcardsSet[currentFlashcardIndex].answer}
            </div>
          </motion.div>
          <div
            style={{
              width: `${
                ((currentFlashcardIndex + 1) / flashcardsSet.length) * 100
              }%`,
            }}
            className={`h-1 bg-secondary absolute left-0 bottom-0 rounded-bl-xl ${
              currentFlashcardIndex === flashcardsSet.length - 1
                ? "rounded-br-xl"
                : ""
            }`}
          ></div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <div>
          <Tooltip>
            <TooltipTrigger>
              <Shuffle
                className="text-dark/70 size-10 p-2 bg-transparent border-border border hover:bg-border/20 rounded-lg duration-300 cursor-pointer"
                onClick={shuffleFlashcards}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-white border border-border text-dark">
              <p>Shuffle flashcards</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex gap-5 items-center">
          {currentFlashcardIndex !== 0 && (
            <Button className="p-0 bg-transparent" onClick={handlePrevious}>
              <ArrowLeftCircle className="font-extralight stroke-1 size-8 text-dark/70 cursor-pointer hover:bg-border rounded-full duration-300" />
            </Button>
          )}

          <div className="text-dark/70 text-xl">
            <span className="text-secondary font-semibold">
              {currentFlashcardIndex + 1}
            </span>{" "}
            / {flashcardsSet.length}
          </div>
          {currentFlashcardIndex !== flashcardsSet.length - 1 && (
            <Button className="p-0 bg-transparent" onClick={handleNext}>
              <ArrowRightCircle className="font-extralight stroke-1 size-8 text-dark/70 cursor-pointer hover:bg-border rounded-full duration-300" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardMode;
