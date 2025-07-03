import React from "react";
import Image from "next/image";

import background from "@/public/backgrounds/login_bg.jpg";
import SignupText from "@/components/signup-page/signup-text";
import SignupForm from "@/components/signup-page/signup-form";

const SignUpPage = () => {
  return (
    <main className="h-[100svh] flex justify-center items-center">
      <div className="w-full flex-1 flex justify-center max-xl:hidden">
        <SignupText />
      </div>
      <div className="w-full flex-1 flex justify-center h-full items-center xl:shadow-xl xl:border-l xl:border-border">
        <SignupForm />
      </div>
    </main>
  );
};

export default SignUpPage;
