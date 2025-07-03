import React from "react";
import Image from "next/image";

import background from "@/public/backgrounds/login_bg.jpg";
import LoginText from "@/components/login-page/login-text";
import LoginForm from "@/components/login-page/login-form";

const LoginPage = () => {
  return (
    <main className="h-[100svh] flex justify-center items-center px-8">
      {/* <div className="grid lg:grid-cols-2 gap-24"> */}
      <div className="w-full flex-1 flex justify-center max-xl:hidden">
        <LoginText />
      </div>
      <div className="w-full flex-1 flex justify-center h-full items-center xl:shadow-xl xl:border-l xl:border-border">
        <LoginForm />
      </div>
      {/* </div> */}
    </main>
  );
};

export default LoginPage;
