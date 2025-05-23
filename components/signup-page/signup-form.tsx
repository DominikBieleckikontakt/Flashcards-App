"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/input";
import Button from "../button";
import Link from "next/link";
import Loader from "../loader";

import {
  CircleUserRound,
  Lock,
  LockOpen,
  Mail,
  User,
  Users,
} from "lucide-react";

import { RegisterForm } from "@/types";
import { createUser } from "@/actions/auth";

const signupFormSchema = z
  .object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
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
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isLoading },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(signupFormSchema),
  });

  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmitHandler = async (formData: RegisterForm) => {
    const res = await createUser(formData);

    if (res.error) {
      setMessage(res.error);
    }

    if (res.user) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="text-light bg-white/10 backdrop-blur-sm w-full h-full rounded-3xl p-8 flex flex-col justify-between space-y-16">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        className="space-y-8"
      >
        <div className="flex justify-between gap-8">
          <Input
            type="text"
            label="First name"
            icon={<User size={24} />}
            placeholder="John"
            registerProps={register("firstname")}
            ariaInvalid={Boolean(errors.firstname)}
            errors={errors?.firstname?.message}
            styles="w-1/2"
            inputClassnames="bg-white/10"
          />
          <Input
            type="text"
            label="Last name"
            icon={<Users size={24} />}
            placeholder="Smith"
            registerProps={register("lastname")}
            ariaInvalid={Boolean(errors.lastname)}
            errors={errors?.lastname?.message}
            styles="w-1/2"
            inputClassnames="bg-white/10"
          />
        </div>

        <Input
          type="text"
          label="Username"
          icon={<CircleUserRound size={24} />}
          placeholder="MyExtraUsername"
          registerProps={register("username")}
          ariaInvalid={Boolean(errors.username)}
          errors={errors?.username?.message}
          inputClassnames="bg-white/10"
        />

        <Input
          type="text"
          label="Email"
          icon={<Mail size={24} />}
          placeholder="example@example.com"
          registerProps={register("email")}
          ariaInvalid={Boolean(errors.email)}
          errors={errors?.email?.message}
          inputClassnames="bg-white/10"
        />

        <Input
          type="password"
          label="Password"
          icon={<Lock size={24} />}
          placeholder="MyStrongPassword123#"
          registerProps={register("password")}
          ariaInvalid={Boolean(errors.password)}
          errors={errors?.password?.message}
          inputClassnames="bg-white/10"
        />

        <Input
          type="password"
          label="Confirm password"
          icon={<LockOpen size={24} />}
          placeholder="MyStrongPassword123#"
          registerProps={register("confirmPassword")}
          ariaInvalid={Boolean(errors.confirmPassword)}
          errors={errors?.confirmPassword?.message}
          inputClassnames="bg-white/10"
        />

        <div className="w-full text-right">
          <Button
            type="submit"
            disabled={isSubmitting || (!isValid && true)}
            className=" disabled:opacity-50 disabled:hover:bg-secondary bg-secondary hover:bg-secondary/50 w-full h-12"
          >
            {isSubmitting || isLoading ? (
              <Loader
                styles={`border-text border-t-transparent mx-auto size-8`}
              />
            ) : (
              "Sign up"
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
            href="/login"
            className="text-accent hover:text-accent/80 duration-300 font-semibold"
          >
            Log In
          </Link>{" "}
          for free!
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
