"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Input from "../input";
import Button from "../button";
import Link from "next/link";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Its for sure too short for an email!" })
    .email({ message: "Invalid email address" }),
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
    watch,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmitHandler = (data: any) => {
    console.log("Form submitted!", data);
  };

  return (
    <div className="text-text bg-white/10 backdrop-blur-sm w-full h-full rounded-3xl p-8 flex flex-col justify-between">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        className="space-y-8"
      >
        <Input
          type="text"
          label="Email"
          placeholder="example@example.com"
          registerProps={register("email")}
          ariaInvalid={Boolean(errors.email)}
          errors={errors?.email?.message}
        />

        <Input
          type="password"
          label="Password"
          placeholder="MyStrongPassword123#"
          registerProps={register("password")}
          ariaInvalid={Boolean(errors.password)}
          errors={errors?.password?.message}
        />

        <div className="w-full text-right">
          <Button
            type="submit"
            disabled={isSubmitting || (!isValid && true)}
            styles="disabled:opacity-50 disabled:hover:bg-secondary bg-secondary hover:bg-secondary/50 w-full"
          >
            Log in
          </Button>
        </div>
      </form>
      <div>
        <p className="text-center">
          You don't have an account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:text-accent duration-300 font-semibold"
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
