import Image from "next/image";
import React from "react";

import dashboardMobileScreen from "@/public/img/dashboard_mobile_screen.png";
import dashboardScreen from "@/public/img/dashboard_screenshot.png";

const Hero = () => {
  return (
    <div className="sm:mt-16 flex justify-center items-center relative bg-white overflow-hidden flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 
              opacity-70 h-[100%] 
              bg-[url('/grid.svg')] bg-repeat
              bg-[position:10px_10px]
              bg-[length:40px_40px]
              [mask-image:radial-gradient(circle_at_center,black_10%,transparent_100%)]
              [mask-size:100%_100%] pointer-events-none"
      />
      <div className="py-16 pb-16 flex justify-center items-center flex-col gap-2">
        <div className="text-sm border border-secondary w-fit p-2 font-base text-dark/80 rounded-4xl z-10">
          Master Learning Effortlessly
        </div>
        <div className="lg:mx-24 2xl:mx-64 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-5xl 2xl:text-6xl font-semibold text-center text-pretty z-10">
            Unlock Knowledge with{" "}
            <span className="text-transparent relative inline-block text-stroke">
              Smart
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1213 73">
                <path
                  d="M1212.41 5.51c3.05 12.87-22.36 11.93-30.26 15.68-94.32 20.51-269.09 32.42-365.48 37.51-77.91 3.82-155.66 9.93-233.67 11.67-57.49 2.56-115.05-.19-172.57 1.58-121.28.91-243.17 1.88-363.69-13.33-12.51-2.64-25.8-2.92-37.77-7.45-30.66-21.42 26.02-21.53 38.52-19.26 359.95 29.05 364.68 27.36 638.24 17.85 121-3.78 241.22-19.21 426.76-41.46 4.72-.65 9.18 3.56 8.45 8.36a941.74 941.74 0 0 0 54.29-9.21c9.33-2.33 18.7-4.56 27.95-7.19a7.59 7.59 0 0 1 9.23 5.24Z"
                  fill="#f72684"
                ></path>
              </svg>
            </span>{" "}
            Flashcards
          </h1>
        </div>
        <div className="lg:mx-36 2xl:mx-80 2xl:px-16 text-center">
          <p className="text-sm text-dark/80 text-pretty">
            Supercharge your studies with interactive flashcards designed to
            help you memorize, review, and retain information faster.
          </p>
        </div>
      </div>
      <div className="relative w-full h-full max-h-96">
        <Image
          src={dashboardScreen}
          alt="dashboard"
          className="w-full h-full object-cover z-10 rounded-2xl border border-border/50 hidden lg:block"
        />
        <Image
          src={dashboardMobileScreen}
          alt="dashboard"
          className="w-full h-full object-cover z-10 rounded-2xl border border-border/50 lg:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-light via-light/50 to-transparent rounded-2xl z-20 pointer-events-none" />
      </div>
    </div>
  );
};

export default Hero;
