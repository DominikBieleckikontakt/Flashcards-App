"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Star, User } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { FlashcardsListItemProps } from "@/types";
import { toggleFlashcardSetFavorite } from "@/actions/flashcards";
import { useUserStore } from "@/stores/user";
// import { getProfilePicture } from "@/lib/utils";

const FlashcardsListItem = ({
  index,
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
  numberOfFavorites,
}: FlashcardsListItemProps) => {
  const [isUserFavorite, setIsUserFavorite] = useState(isFavorite);
  const [numberOfFavoritesState, setNumberOfFavoritesState] = useState(
    numberOfFavorites || 0
  );

  const user = useUserStore((state) => state.user)!;

  const toggleFavorites = async () => {
    setIsUserFavorite((prev) => !prev);

    numberOfFavoritesState < 1
      ? setNumberOfFavoritesState(1)
      : setNumberOfFavoritesState((prev) =>
          isUserFavorite ? prev - 1 : prev + 1
        );

    await toggleFlashcardSetFavorite(user.id, setId);
  };

  return (
    <motion.div
      className="border border-border rounded-lg  w-full h-full  hover:shadow-sm cursor-pointer duration-300 hover:border-secondary"
      initial={{ opacity: 0, transform: "translateY(20px)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 0.3, delay: index ? index * 0.1 : 0 }}
    >
      <Link
        href={`/flashcard-set/${setId}/${title
          .replaceAll(" ", "-")
          .toLocaleLowerCase()}`}
        className="w-full p-4 h-full space-y-3 flex flex-col justify-between"
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
              <span className="italic text-secondary">
                {numberOfFlashcards}
              </span>
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
          <div className="flex items-center gap-1">
            <AnimatePresence mode="wait">
              {numberOfFavoritesState > 0 && (
                <motion.p
                  key={numberOfFavoritesState} // ważne, żeby triggerować zmianę
                  className="font-light text-dark/70"
                  initial={{ opacity: 0, x: 4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {numberOfFavoritesState}
                </motion.p>
              )}
            </AnimatePresence>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorites();
              }}
              aria-label="Toggle favorite"
            >
              <Star
                className={`text-dark/50 hover:text-secondary cursor-pointer ${
                  isUserFavorite ? "text-secondary fill-secondary" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FlashcardsListItem;
