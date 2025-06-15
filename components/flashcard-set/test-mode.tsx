"use client";
import React, { useState, useEffect } from "react";
import { ArrowRightCircle } from "lucide-react";
import Button from "../button";
import { AnimatePresence, motion } from "framer-motion";
import { generateAnswers, shuffleArray } from "@/lib/utils";
import { Flashcard } from "@/types";
import { POINTS_THRESHOLDS } from "@/constants";
import Link from "next/link";

const resultMessages = [
  "Not many, but don’t give up! Everyone can improve.",
  "Your score could be better—try again and see how far you can go!",
  "Average score! You’re on the right track—keep learning!",
  "Well done! There’s always room for improvement, but you did well.",
  "Great score! Congratulations, you’re doing very well!",
  "Amazing! You’re an expert in this topic!",
];

const TestMode = ({ flashcards }: { flashcards: Flashcard[] }) => {
  const [shuffledFlashcards, setShuffledFlashcards] = useState<Flashcard[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>();
  const [answered, setAnswered] = useState(false);
  const [points, setPoints] = useState(0);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>();
  const [clickedAnswer, setClickedAnswer] = useState(-1);
  const [resultMessage, setResultMessage] = useState<string>();
  const [isFinished, setIsFinished] = useState(false);
  const [pointsPercent, setPointsPercent] = useState(0);

  const reset = () => {
    const shuffledArray = shuffleArray(flashcards);
    setShuffledFlashcards(shuffledArray);

    setAnswered(false);
    setCurrentFlashcardIndex(0);
    setPoints(0);
    setClickedAnswer(-1);
    setIsFinished(false);

    const firstFlashcardAnswers = generateAnswers(shuffledArray, 0);
    setAnswers(firstFlashcardAnswers);
    setCorrectAnswerIndex(
      firstFlashcardAnswers.findIndex(
        (answer) => answer === shuffledArray[currentFlashcardIndex].answer
      )
    );
  };

  useEffect(() => {
    setIsMounted(true);
    reset();
  }, [flashcards]);

  if (!isMounted) return <div>Loading...</div>;

  const handleNext = () => {
    setAnswered(false);
    const newIndex = currentFlashcardIndex + 1;
    setCurrentFlashcardIndex(newIndex);

    const generatedAnswers = generateAnswers(shuffledFlashcards, newIndex);
    setAnswers(generatedAnswers);
    setCorrectAnswerIndex(
      generatedAnswers.findIndex(
        (answer) => answer === shuffledFlashcards[newIndex].answer
      )
    );
  };

  const onAnswerHandler = (index: number) => {
    if (answered) return;
    setClickedAnswer(index);
    setAnswered(true);

    const isCorrectAnswer = index === correctAnswerIndex;
    if (isCorrectAnswer && currentFlashcardIndex < flashcards.length) {
      setPoints((prev) => prev + 1);
    }
  };

  const onFinishHandler = () => {
    setIsFinished(true);

    const resultPoints = Math.round((points / currentFlashcardIndex) * 100);
    setPointsPercent(resultPoints);
    let message = "";
    switch (true) {
      case resultPoints <= POINTS_THRESHOLDS[0]:
        message = resultMessages[0];
        break;
      case resultPoints <= POINTS_THRESHOLDS[1]:
        message = resultMessages[1];
        break;
      case resultPoints <= POINTS_THRESHOLDS[2]:
        message = resultMessages[2];
        break;
      case resultPoints <= POINTS_THRESHOLDS[3]:
        message = resultMessages[3];
        break;
      case resultPoints <= POINTS_THRESHOLDS[4]:
        message = resultMessages[4];
        break;
      default:
        message = resultMessages[5];
        break;
    }

    setResultMessage(message);
  };

  const variants = {
    initial: () => ({
      x: "100%",
      opacity: 0,
      scale: 0.9,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 45 },
    },
    exit: () => ({
      x: "-100%",
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.1 },
    }),
  };

  return (
    <div className="w-full space-y-3 overflow-hidden">
      <AnimatePresence mode="wait" custom={"forward"}>
        <motion.div
          key={currentFlashcardIndex}
          custom={"forward"}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full rounded-lg relative h-fit"
          style={{ perspective: 2500 }}
        >
          <div className="border border-border w-full h-auto max-lg:px-4 max-lg:py-16 lg:h-[400px] flex items-center justify-center rounded-lg">
            {!isFinished ? (
              <div className="flex flex-col w-full justify-center items-center">
                <div className="font-semibold text-xl">
                  {shuffledFlashcards[currentFlashcardIndex].question}
                </div>
                <div className="mt-16 grid lg:grid-cols-2 gap-5 w-full px-16">
                  {answers?.map((answer, index) => (
                    <div
                      key={index}
                      className={`rounded-lg font-light border border-border ${
                        !answered && "cursor-pointer"
                      } p-3 flex justify-center items-center duration-300 hover:border-secondary ${
                        answered &&
                        correctAnswerIndex === index &&
                        "border-green-600"
                      } ${
                        answered &&
                        index !== correctAnswerIndex &&
                        clickedAnswer === index &&
                        "border-red-400"
                      }`}
                      onClick={() => onAnswerHandler(index)}
                    >
                      {answer}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-3xl text-center">
                  You have completed the test
                </h3>
                <p className="text-center mt-5 font-light">
                  You earned{" "}
                  <span className="font-semibold text-secondary">{points}</span>{" "}
                  points and its{" "}
                  <span className="font-semibold text-secondary">
                    {pointsPercent}%
                  </span>
                  .
                </p>
                <p className="mt-2 font-light text-center">{resultMessage}</p>
                <div className="mt-8 text-center">
                  You can{" "}
                  <span
                    className="text-secondary font-semibold cursor-pointer"
                    onClick={reset}
                  >
                    repeat this test
                  </span>{" "}
                  or{" "}
                  <Link
                    href="/flashcards/explore"
                    className="text-secondary font-semibold"
                  >
                    find another one!
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between items-center">
        <div>
          <div>
            Points:{" "}
            <span className="font-semibold text-secondary">{points}</span>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div className="text-dark/70 text-xl">
            <span className="text-secondary font-semibold">
              {currentFlashcardIndex + 1}
            </span>{" "}
            / {shuffledFlashcards.length}
          </div>
          {currentFlashcardIndex + 1 < shuffledFlashcards.length && (
            <Button
              className="p-0 bg-transparent"
              onClick={handleNext}
              disabled={!answered}
            >
              <ArrowRightCircle
                className={`font-extralight stroke-1 size-8 ${
                  !answered
                    ? "cursor-not-allowed text-dark/10"
                    : "cursor-pointer text-dark/70"
                } hover:bg-border rounded-full duration-300`}
              />
            </Button>
          )}
          {currentFlashcardIndex + 1 === shuffledFlashcards.length &&
            !isFinished && (
              <Button
                disabled={!answered}
                className={`${
                  !answered
                    ? "!cursor-not-allowed  text-dark/30"
                    : "cursor-pointer text-dark"
                } bg-transparent border-border border  font-light hover:bg-dark/5`}
                onClick={onFinishHandler}
              >
                Finish
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default TestMode;
