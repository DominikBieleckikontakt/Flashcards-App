import React from "react";
import Image from "next/image";

import blob from "@/public/blob.svg";

const CallToAction = () => {
  return (
    <div className="w-full bg-secondary rounded-4xl px-8 py-16 xl:py-24 max-xl:space-y-8 xl:px-16 relative overflow-hidden flex max-xl:flex-col justify-between xl:items-center">
      <div className="space-y-4 xl:w-1/2 xl:flex-1">
        <h3 className="text-2xl md:text-4xl font-semibold text-light">
          Start Learning Smarter Today!
        </h3>
        <p className="text-lg text-light">
          Unlock the full potential of your study sessions with our intuitive
          flashcard app. Create, organize, and review your cards anytime,
          anywhere. <br /> <br />
          <span className="font-semibold">
            Join thousands of users who are already mastering their subjects —
            click to get started!
          </span>
        </p>
      </div>
      <div className="xl:w-1/2 flex xl:flex-1 justify-center z-10">
        <button className="bg-transparent border-light border-2 text-white text-lg font-bold rounded-4xl px-16 py-4 cursor-pointer duration-300 hover:rounded-md">
          Create an account
        </button>
      </div>
      <Image
        src={blob}
        alt="blob"
        className="absolute -top-24 -right-12 opacity-20 rotate-45 z-0"
      />
    </div>
  );
};

export default CallToAction;
