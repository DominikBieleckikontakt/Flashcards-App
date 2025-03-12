import React from "react";
import Image from "next/image";

import background from "@/public/backgrounds/login_bg.jpg";
import SignupText from "@/components/signup-page/signup-text";
import SignupForm from "@/components/signup-page/signup-form";

const SignUpPage = () => {
  return (
    <>
      <Image
        src={background}
        alt="background"
        layout="fill"
        className="object-cover"
      />
      <main className="h-screen flex justify-center items-center lg:mx-8">
        <div className="grid lg:grid-cols-2 gap-24">
          <SignupText />
          <SignupForm />
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
