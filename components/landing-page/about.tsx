"use client";
import React from "react";

import { useLottie } from "lottie-react";
import { Bolt } from "lucide-react";
import animationData from "@/lottie/learning.json";

const AboutUs = () => {
  const defaultOptions = {
    animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <div className="my-36 space-y-5" id="about">
      <div className="text-sm border border-secondary w-fit p-2 font-base text-dark/80 rounded-4xl z-10">
        Master Learning Effortlessly
      </div>
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-20">
        <div className="space-y-5 xl:w-1/2 xl:flex-1">
          <h2 className="text-3xl md:text-5xl font-semibold">
            <span className="text-secondary">Learn</span> Something About Us
          </h2>
          <div className="text-dark/80">
            At our core, we believe in making learning accessible, engaging, and
            effective for everyone. Our flashcard app was born from a simple
            idea: to help students, professionals, and lifelong learners master
            new information with ease and confidence.
            <ol className="list-disc space-y-5 mt-5">
              <li className="ml-5">
                <h3 className="font-semibold text-lg">
                  Smart, AI-Powered Tools:
                </h3>
                <p className="font-light">
                  Our unique AI technology transforms your notes, photos, and
                  texts into ready-to-use flashcards—saving you time and
                  boosting your study sessions.
                </p>
              </li>
              <li className="ml-5">
                <h3 className="font-semibold text-lg">
                  Customizable Learning Experience:
                </h3>
                <p className="font-light">
                  Create, edit, and organize flashcards tailored to your needs.
                  Add images, and track your progress with intuitive analytics.
                </p>
              </li>
              <li className="ml-5">
                <h3 className="font-semibold text-lg">
                  Study Anywhere, Anytime:
                </h3>
                <p className="font-light">
                  Access your flashcards on any device, so you can learn on the
                  go, at home, or wherever inspiration strikes.
                </p>
              </li>
              <li className="ml-5">
                <h3 className="font-semibold text-lg">Community Driven:</h3>
                <p className="font-light">
                  Join thousands of learners who trust our app to help them
                  reach their goals every day.
                </p>
              </li>
            </ol>
          </div>
        </div>
        <div className="xl:w-1/2 min-h-full xl:flex-1 border border-border rounded-lg flex justify-center items-center hover:border-secondary duration-300">
          <div className="max-w-3/4">{View}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
