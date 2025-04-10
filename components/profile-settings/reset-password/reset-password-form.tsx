"use client";
import React, { useEffect, useState } from "react";

import { useUserStore } from "@/stores/user";
import { getCurrentSession } from "@/actions/cookies";

import Input from "@/components/ui/input";
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "@/components/loader";
import { resetPassword } from "@/actions/user";

const resetPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .regex(/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/, {
        message: "Must contain at least one number and one special character",
      })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmNewPassword: z.string().min(8),
  })
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(resetPasswordSchema),
  });

  const [success, setSuccess] = useState<boolean>();
  const [message, setMessage] = useState("");

  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);

  const onSubmitHandler = async (data: any) => {
    const result = await resetPassword({
      id: currentUser!.id,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });

    result && setSuccess(result.success);

    result && setMessage(result.message);
  };

  useEffect(() => {
    const saveUser = async () => {
      if (!currentUser) {
        const { user } = await getCurrentSession();
        user && setUser(user);
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
          <Input
            type="password"
            placeholder="Enter your current password"
            label="Current password"
            registerProps={register("currentPassword")}
            inputClassnames="bg-text-black/5"
            ariaInvalid={Boolean(errors.currentPassword)}
            errors={errors?.currentPassword?.message}
          />
          <Input
            type="password"
            placeholder="Enter your new password"
            label="New password"
            registerProps={register("newPassword")}
            inputClassnames="bg-text-black/5"
            ariaInvalid={Boolean(errors.newPassword)}
            errors={errors?.newPassword?.message}
          />
          <Input
            type="password"
            placeholder="Confirm your new password"
            label="Confirm new password"
            registerProps={register("confirmNewPassword")}
            inputClassnames="bg-text-black/5"
            ariaInvalid={Boolean(errors.confirmNewPassword)}
            errors={errors?.confirmNewPassword?.message}
          />
          {success && <p className="text-green-500">{message}</p>}
          {success === false && <p className="text-red-500">{message}</p>}
          <div className="w-full gap-8 flex justify-end">
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
          </div>
        </>
      )}
    </form>
  );
};

export default ResetPasswordForm;
