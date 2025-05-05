"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { Eye, Shield } from "lucide-react";
import SelectDropdown from "../ui/select-dropdown";
import Button from "../button";
import { CollectedDataType } from "./steps";

const formResolver = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  privacy: z.enum(["public", "private"]),
  category: z.array(z.string()),
});

const FlashcardData = ({
  updateData,
  updateCurrentStep,
}: {
  updateData: (data: any) => void;
  updateCurrentStep: (data: any) => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isLoading, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(formResolver),
    defaultValues: {
      category: [],
    },
  });

  const onSubmitHandler = async (data: {
    title: string;
    description?: string;
    privacy: "public" | "private";
    category?: string[];
  }) => {
    updateData((prev: CollectedDataType | null) => ({
      ...prev,
      title: data.title,
      description: data.description,
      privacy: data.privacy,
      category: data.category,
    }));
    updateCurrentStep((prev: number) => prev + 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      className="space-y-8"
    >
      <Input
        label="Title"
        type="text"
        ariaInvalid={Boolean(errors.title)}
        registerProps={register("title")}
        placeholder="Enter the title of your flashcards set"
        errors={errors.title?.message}
        {...register("title")}
        inputClassnames="!border-dark/10 !border focus:!border-primary"
        labelClassnames="text-dark/70"
        styles="!gap-1"
      />
      <Textarea
        label="Description"
        ariaInvalid={Boolean(errors.description)}
        registerProps={register("description")}
        placeholder="Enter the description of your flashcards set"
        errors={errors.description?.message}
        {...register("description")}
        textareaClassnames="!border-dark/10 !border focus:!border-primary"
        labelClassnames="text-dark/70"
        styles="!gap-1"
        rows={4}
      />
      <hr className="w-full" />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="radio"
            id="public"
            value="public"
            {...register("privacy")}
          />
          <label htmlFor="public" className="flex items-center gap-2">
            <Eye className="text-dark/60" />
            <div>
              Public
              <span className="text-dark/70 text-sm flex">
                {" "}
                Anyone can see this flashcards set
              </span>
            </div>
          </label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            id="private"
            value="private"
            {...register("privacy")}
          />
          <label htmlFor="private" className="flex items-center gap-2">
            <Shield className="text-dark/60" />
            <div>
              Private
              <span className="text-dark/70 text-sm flex">
                {" "}
                Only you can see this flashcards set
              </span>
            </div>
          </label>
        </div>
      </div>
      <hr />
      <div>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <SelectDropdown
              value={field.value}
              onChange={field.onChange}
              entries={["Tech", "Health", "Education", "Art", "Business"]}
            />
          )}
        />
      </div>
      <div className="w-full text-right">
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          styles="bg-secondary cursor-pointer hover:bg-secondary/90 disabled:opacity-50 disabled:hover:bg-secondary"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default FlashcardData;
