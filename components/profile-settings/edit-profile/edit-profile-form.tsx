"use client";
import React, { useEffect } from "react";

import { useUserStore } from "@/stores/user";
import { getCurrentSession } from "@/actions/cookies";

import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "@/components/loader";
import Link from "next/link";

const editProfileSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  gender: z.string(),
});

const EditProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(editProfileSchema),
  });

  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);

  const onSubmitHandler = async () => {};

  useEffect(() => {
    const saveUser = async () => {
      if (!currentUser) {
        const { user } = await getCurrentSession();

        user && setUser(user);
      }
    };

    saveUser();
  }, [setUser]);

  return (
    <form
      className="max-w-[60rem] mx-auto rounded-lg p-5 border border-text-black/10 space-y-8"
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
    >
      <div className="flex gap-8">
        <Input
          type="text"
          placeholder="John"
          label="First Name"
          registerProps={register("firstname")}
          inputClassnames="bg-text-black/5"
          styles="w-1/2"
          value={currentUser?.firstname}
          ariaInvalid={Boolean(errors.firstname)}
          errors={errors?.firstname?.message}
        />
        <Input
          type="text"
          placeholder="Smith"
          label="Last Name"
          registerProps={register("lastname")}
          inputClassnames="bg-text-black/5"
          styles="w-1/2"
          value={currentUser?.lastname}
          ariaInvalid={Boolean(errors.lastname)}
          errors={errors?.lastname?.message}
        />
      </div>
      <Input
        type="text"
        placeholder="Username"
        label="Username"
        registerProps={register("username")}
        inputClassnames="bg-text-black/5"
        value={currentUser?.username}
        ariaInvalid={Boolean(errors.username)}
        errors={errors?.username?.message}
      />
      <Input
        type="text"
        placeholder="Male"
        label="Gender"
        registerProps={register("gender")}
        inputClassnames="bg-text-black/5"
        value={currentUser?.gender || ""}
        ariaInvalid={Boolean(errors.gender)}
        errors={errors?.gender?.message}
      />
      {/* <Input type="date" placeholder="03.04.1998" label="Date of Birth" /> */}
      <div className="flex flex-col gap-2 relative">
        <label>Birth Date</label>
        <DatePicker />
      </div>
      <div className="w-full gap-8 flex">
        <Button
          type="submit"
          disabled={isSubmitting || (!isValid && true)}
          styles="disabled:opacity-50 disabled:hover:bg-secondary bg-primary hover:bg-primary/80 w-1/2"
        >
          {isSubmitting || isLoading ? (
            <Loader
              styles={`border-text border-t-transparent mx-auto size-8`}
            />
          ) : (
            "Save"
          )}
        </Button>
        <Link href="/profile/reset-password" className="w-1/2">
          <Button styles="disabled:opacity-50 disabled:hover:bg-secondary bg-red-400 hover:bg-red-500 w-full">
            Reset Password
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default EditProfileForm;
