"use client";
import React from "react";
import { useLottie } from "lottie-react";

import animationData from "@/lottie/fail.json";
const FailAnimation = ({ className }: { className: string }) => {
  const defaultOptions = {
    animationData,
    loop: false,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div>
        <div className={`${className}`}>{View}</div>
      </div>
    </>
  );
};

export default FailAnimation;
