"use client";
import React, { useEffect, useState } from "react";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeftRight, Trash } from "lucide-react";

const FlashcardsInput = ({
  id,
  remove,
  edit,
  question,
  answer,
}: {
  id: number;
  remove: (id: number) => void;
  edit: (id: number, question: string, answer: string) => void;
  question: string;
  answer: string;
}) => {
  const [firstSide, setFirstSide] = useState(question);
  const [secondSide, setSecondSide] = useState(answer);

  useEffect(() => {
    setFirstSide(question);
    setSecondSide(answer);
  }, [question, answer]);

  const changeSidesHandler = () => {
    const newFirst = secondSide;
    const newSecond = firstSide;

    setFirstSide(newFirst);
    setSecondSide(newSecond);

    edit(id, newFirst, newSecond);
  };

  const removeHandler = () => {
    remove(id);
  };

  const editFirstHandler = (value: string) => {
    setFirstSide(value);
    edit(id, value, secondSide);
  };

  const editSecondHandler = (value: string) => {
    setSecondSide(value);
    edit(id, firstSide, value);
  };

  return (
    <div className="flex gap-5 w-full justify-center items-center">
      <Input
        placeholder="Enter content of the first side"
        type="text"
        inputClassnames="!border !border-border focus:!border-primary"
        styles="w-full"
        value={firstSide}
        onChange={(e) => {
          setFirstSide(e.target.value);
          editFirstHandler(e.target.value);
        }}
      />
      <Button
        className="cursor-pointer hover:bg-secondary/20 duration-300 p-5"
        variant="outline"
        onClick={changeSidesHandler}
      >
        <ArrowLeftRight className="text-dark/60" />
      </Button>
      <Input
        placeholder="Enter content of the second side"
        type="text"
        inputClassnames="!border !border-border focus:!border-primary"
        styles="w-full"
        value={secondSide}
        onChange={(e) => {
          setSecondSide(e.target.value);
          editSecondHandler(e.target.value);
        }}
      />
      <Button
        className="cursor-pointer hover:bg-secondary/20 duration-300 p-5"
        variant="outline"
        onClick={removeHandler}
      >
        <Trash className="text-dark/60" />
      </Button>
    </div>
  );
};

export default FlashcardsInput;
