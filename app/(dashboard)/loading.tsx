import React from "react";
import Image from "next/image";

import background from "@/public/backgrounds/login_bg.jpg";
import Loader from "@/components/loader";

const Loading = () => {
  return (
    <>
      <main className="h-screen flex justify-center items-center lg:mx-8">
        <Loader styles="size-12 border-4" />
      </main>
    </>
  );
};

export default Loading;
