"use client";
import Image from "next/image";
import React, { useState } from "react";
import olila from "@/public/img/olila.jpg";

const Olila = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-screen h-screen bg-[#222222] flex flex-col gap-5 justify-center items-center">
      <button
        className="text-white bg-pink-300 px-5 p-3 rounded-lg cursor-pointer duration-300 hover:bg-pink-400 font-semibold text-lg"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Ukryj słodziaka" : "Pokaż słodziaka"}
      </button>
      <div>
        {isVisible && (
          <Image
            src={olila}
            alt="olila"
            className="max-w-96 rounded-xl max-md:max-w-64"
          />
        )}
      </div>
    </div>
  );
};

export default Olila;
