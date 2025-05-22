"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Star, User } from "lucide-react";

import { FlashcardsListItemProps } from "@/types";
import { toggleFlashcardSetFavorite } from "@/actions/flashcards";
import { useUserStore } from "@/stores/user";
import Image from "next/image";
// import { getProfilePicture } from "@/lib/utils";

const FlashcardsListItem = ({
  setId,
  title,
  description,
  author,
  authorId,
  date,
  categories,
  numberOfFlashcards,
  profilePicture,
  isFavorite,
}: FlashcardsListItemProps) => {
  const [isUserFavorite, setIsUserFavorite] = useState(isFavorite);

  const user = useUserStore((state) => state.user)!;
  console.log(isFavorite);

  const toggleFavorites = async () => {
    setIsUserFavorite((prev) => !prev);

    await toggleFlashcardSetFavorite(user.id, setId);
  };

  return (
    <Link
      href="#"
      className="border border-border rounded-lg p-4 space-y-3 h-full flex flex-col justify-between hover:shadow-sm cursor-pointer duration-300 hover:border-secondary"
    >
      <div className="space-y-2">
        <div>
          <h3 className="text-lg">{title}</h3>
          <p className="font-light line-clamp-3 ">{description}</p>
        </div>
        <div className="font-light text-sm">
          <p>
            {categories.length < 1
              ? ""
              : categories.length > 1
              ? "Categories"
              : "Category"}
            :{" "}
            <span className="italic text-secondary">
              {categories.join(", ")}
            </span>
          </p>
          <p>
            Number of flashcards:{" "}
            <span className="italic text-secondary">{numberOfFlashcards}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-2 font-extralight">
          {profilePicture ? (
            <Image
              alt="profile picture"
              src={profilePicture}
              className="size-8 bg-dark/10 text-dark/50 rounded-full"
              width={32}
              height={32}
            />
          ) : (
            <User className="size-8 bg-dark/10 text-dark/50 rounded-full" />
          )}

          <div className="flex flex-col ">
            <p className="">{author}</p>
            <p className="text-[12px] text-dark/50 -mt-1">{date}</p>
          </div>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorites();
            }}
            aria-label="Toggle favorite"
          >
            <Star
              className={`text-dark/50 hover:text-secondary cursor-pointer ${
                isUserFavorite ? "text-secondary" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FlashcardsListItem;
