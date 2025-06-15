import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabaseClient";
import { Flashcard } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateWithoutTimezoneOffset(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export const uploadProfilePicture = async (file: File) => {
  const filePath = `profile.pictures/${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("profile.pictures")
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicData } = supabase.storage
    .from("profile.pictures")
    .getPublicUrl(filePath);

  const publicUrl = publicData.publicUrl;

  if (!publicUrl) {
    throw new Error("Failed to get public url");
  }

  return publicUrl;
};

export const getProfilePicture = async (userId: string) => {
  const { data } = supabase.storage
    .from("profile.pictures")
    .getPublicUrl(userId);

  return data.publicUrl;
};

export const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export const generateAnswers = (
  flashcardsSet: Flashcard[],
  currentFlashcardIndex: number
) => {
  if (typeof window === "undefined") return [];
  const correctAnswer = flashcardsSet[currentFlashcardIndex].answer;

  const incorrectAnswers = shuffleArray(
    flashcardsSet
      .filter((flashcard) => flashcard.answer !== correctAnswer)
      .map((flashcard) => flashcard.answer)
  ).slice(0, 3);

  const answers: string[] = shuffleArray([correctAnswer, ...incorrectAnswers]);

  return answers;
};
