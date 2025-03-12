import React from "react";
import Image from "next/image";

import background from "@/public/backgrounds/login_bg.jpg";
import LoginText from "@/components/login-page/login-text";
import LoginForm from "@/components/login-page/login-form";

const LoginPage = () => {
  return (
    <>
      <Image
        src={background}
        alt="background"
        layout="fill"
        className="object-cover"
      />
      <main className="h-screen flex justify-center items-center bg-red-500 mx-8">
        <div className="grid lg:grid-cols-2 gap-24">
          <LoginText />
          <LoginForm />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
