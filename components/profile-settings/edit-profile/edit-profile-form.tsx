"use client";
import React, { useEffect, useState } from "react";

import { useUserStore } from "@/stores/user";

import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Button from "@/components/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "@/components/loader";
import Link from "next/link";
import { UserUpdateType } from "@/types";
import { updateUser } from "@/actions/user";
import { getDateWithoutTimezoneOffset } from "@/lib/utils";
import { Download } from "lucide-react";
import { uploadProfilePicture } from "@/lib/utils";

const editProfileSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  gender: z.string(),
  birthDate: z.date(),
  profilePicture: z.any().optional(),
});

const EditProfileForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isLoading, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(editProfileSchema),
  });

  const [success, setSuccess] = useState<boolean>();
  const [message, setMessage] = useState("");

  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);

  const onSubmitHandler = async (data: any) => {
    const updatedData: UserUpdateType = {};

    if (data.firstname !== currentUser?.firstname)
      updatedData.firstname = data.firstname;
    if (data.lastname !== currentUser?.lastname)
      updatedData.lastname = data.lastname;
    if (data.username !== currentUser?.username)
      updatedData.username = data.username;
    if (data.gender !== currentUser?.gender) updatedData.gender = data.gender;
    const selectedFile = data.profilePicture as File | null;
    if (selectedFile) {
      const url = await uploadProfilePicture(selectedFile);
      if (url && url !== currentUser?.profilePicture) {
        updatedData.profilePicture = url;
      }
    }

    if (currentUser?.birthDate) {
      const currentBirthDate = getDateWithoutTimezoneOffset(
        currentUser!.birthDate!
      );
      const newBirthDate = getDateWithoutTimezoneOffset(data.birthDate);

      if (currentBirthDate.getTime() !== newBirthDate.getTime()) {
        updatedData.birthDate = newBirthDate;
      }
    } else {
      updatedData.birthDate = data.birthDate;
    }

    if (Object.keys(updatedData).length === 0) {
      setSuccess(false);
      setMessage("No fields to update!");
      return;
    }

    const result = await updateUser({ id: currentUser!.id, ...updatedData });

    if (result.success) {
      currentUser && setUser({ ...currentUser, ...updatedData });

      setSuccess(result.success);
    }

    result.success === false && setSuccess(result.success);

    result && setMessage(result.message);
  };

  useEffect(() => {
    const saveUser = async () => {
      if (currentUser) {
        setValue("firstname", currentUser?.firstname);
        setValue("lastname", currentUser?.lastname);
        setValue("username", currentUser?.username);
        setValue("gender", currentUser?.gender || "");
        setValue(
          "birthDate",
          currentUser.birthDate ? new Date(currentUser.birthDate) : new Date()
        );
        setValue("profilePicture", currentUser?.profilePicture || "");
      }
    };

    saveUser();
  }, [setUser, currentUser]);

  return (
    <form
      className="max-w-[60rem] mx-auto rounded-lg p-5 border border-text-black/10 space-y-8"
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
    >
      {!currentUser ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex gap-8 max-md:flex-col">
            <Input
              type="text"
              placeholder="John"
              label="First Name"
              registerProps={register("firstname")}
              inputClassnames="bg-text-black/5"
              styles="w-full md:w-1/2"
              ariaInvalid={Boolean(errors.firstname)}
              errors={errors?.firstname?.message}
            />
            <Input
              type="text"
              placeholder="Smith"
              label="Last Name"
              registerProps={register("lastname")}
              inputClassnames="bg-text-black/5"
              styles="w-full md:w-1/2"
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
            ariaInvalid={Boolean(errors.username)}
            errors={errors?.username?.message}
          />
          <Input
            type="text"
            placeholder="Male"
            label="Gender"
            registerProps={register("gender")}
            inputClassnames="bg-text-black/5"
            ariaInvalid={Boolean(errors.gender)}
            errors={errors?.gender?.message}
          />

          <div className="flex gap-8 max-md:flex-col">
            <div className="flex flex-col gap-2 relative w-full md:w-1/2">
              <label>Birth Date</label>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            {/* <Input
              type="file"
              accept="image/*"
              label="Profile Picture"
              styles="w-full md:w-1/2"
              icon={<Download className="size-5" />}
              // registerProps={register("profilePicture")}
              inputClassnames="bg-text-black/5"
              placeholder="Upload a profile picture"
            /> */}
            <Controller
              name="profilePicture"
              control={control}
              render={({ field }) => (
                <Input
                  type="file"
                  accept="image/*"
                  label="Profile Picture"
                  styles="w-full md:w-1/2"
                  icon={<Download className="size-5" />}
                  inputClassnames="bg-text-black/5"
                  placeholder="Upload a profile picture"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    field.onChange(file);
                  }}
                />
              )}
            />
          </div>
          {success && <p className="text-green-500">{message}</p>}
          {success === false && <p className="text-red-500">{message}</p>}
          <div className="w-full gap-8 flex">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
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
            <Link href="/dashboard/reset-password" className="w-1/2">
              <Button styles="disabled:opacity-50 disabled:hover:bg-secondary bg-red-400 hover:bg-red-500 w-full">
                Reset Password
              </Button>
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default EditProfileForm;
