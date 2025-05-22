import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabaseClient";

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
