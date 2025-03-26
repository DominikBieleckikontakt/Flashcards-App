import React from "react";
import Image from "next/image";

import background from "@/public/backgrounds/login_bg.jpg";
import Loader from "@/components/loader";

const Loading = () => {
  return (
    <>
      <div className="">
        <Image
          src={background}
          alt="background"
          layout="fill"
          className="object-cover"
        />
        <div className="absolute size-full bg-black/50 backdrop-blur-sm left-0 top-0"></div>
      </div>
      <main className="h-screen flex justify-center items-center lg:mx-8 bg-primary">
        <div className="z-10 bg-black/10 backdrop-blur-sm p-8 rounded-full">
          <Loader styles="size-12 border-4" />
        </div>
      </main>
    </>
  );
};

export default Loading;
