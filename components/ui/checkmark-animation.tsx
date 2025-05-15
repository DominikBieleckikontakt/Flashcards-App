"use client";
import React from "react";
import { useLottie } from "lottie-react";

import animationData from "@/lottie/checkmark.json";
const CheckmarkAnimation = ({ className }: { className: string }) => {
  const defaultOptions = {
    animationData,
    loop: false,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className="">
        <div className={`${className}`}>{View}</div>
      </div>
    </>
  );
};

export default CheckmarkAnimation;
