"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/input";
import Button from "../button";
import Link from "next/link";

import { Lock, Mail } from "lucide-react";

import { LoginForm as LoginFormType } from "@/types";
import { loginUser } from "@/actions/auth";
import Loader from "../loader";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Its for sure too short for an email or username!" }),
  password: z
    .string()
    .regex(/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: "Must contain at least one number and one special character",
    })
    .min(8, { message: "Password must be at least 8 characters" }),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(loginFormSchema),
  });

  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmitHandler = async (formData: LoginFormType) => {
    const res = await loginUser(formData);

    if (res.error) {
      setMessage(res.error);
    }

    if (res.user) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="text-light bg-white/10 backdrop-blur-sm w-full h-full rounded-3xl p-8 flex flex-col justify-between">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        className="space-y-8"
      >
        <Input
          type="text"
          label="Email or Username"
          placeholder="example@example.com"
          icon={<Mail size={24} />}
          registerProps={register("email")}
          ariaInvalid={Boolean(errors.email)}
          errors={errors?.email?.message}
          inputClassnames="bg-white/10"
        />

        <Input
          type="password"
          label="Password"
          placeholder="MyStrongPassword123#"
          icon={<Lock size={24} />}
          registerProps={register("password")}
          ariaInvalid={Boolean(errors.password)}
          errors={errors?.password?.message}
          inputClassnames="bg-white/10"
        />

        <div className="w-full text-right">
          <Button
            type="submit"
            disabled={isSubmitting || (!isValid && true)}
            className="disabled:opacity-50 disabled:hover:bg-secondary bg-secondary hover:bg-secondary/50 w-full"
          >
            {isSubmitting || isLoading ? (
              <Loader
                styles={`border-text border-t-transparent mx-auto size-8`}
              />
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <div>
          <p className="text-center text-red-500 font-bold text-lg">
            {message}
          </p>
        </div>
      </form>
      <div>
        <p className="text-center">
          You don't have an account?{" "}
          <Link
            href="/signup"
            className="text-accent hover:text-accent/80 duration-300 font-semibold"
          >
            Sign Up
          </Link>{" "}
          for free!
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
