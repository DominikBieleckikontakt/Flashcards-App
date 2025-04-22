import React from "react";
import Image from "next/image";

import background from "@/public/backgrounds/login_bg.jpg";
import SignupText from "@/components/signup-page/signup-text";
import SignupForm from "@/components/signup-page/signup-form";

const SignUpPage = () => {
  return (
    <>
      <div className="">
        <Image
          src={background}
          alt="background"
          fill
          className="object-cover"
        />
        <div className="absolute size-full bg-black/50 backdrop-blur-sm left-0 top-0"></div>
      </div>
      <main className="h-[100svh] flex justify-center items-center lg:mx-8 bg-primary">
        <div className="grid lg:grid-cols-2 gap-24">
          <SignupText />
          <SignupForm />
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
