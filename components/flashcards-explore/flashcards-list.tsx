import React from "react";

import FlashcardsListItem from "./flashcards-list-item";

import { FlashcardsList as FlashcardsListType } from "@/types";

import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

type FlashcardsListProps = {
  flashcardsSets: FlashcardsListType[];
  hasPreviosPage?: boolean;
  hasNextPage?: boolean;
  totalPages?: number;
  currentPage?: number;
};

const FlashcardsList = ({
  flashcardsSets,
  hasPreviosPage,
  hasNextPage,
  totalPages,
  currentPage,
}: FlashcardsListProps) => {
  return (
    <div className="w-full mx-5 2xl:mx-32">
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 items-start gap-4 my-12 w-full max-w-full">
        {flashcardsSets.map(
          ({
            set: { id: setId, title, description, createdAt, category },
            author: { id: userId, name, lastName, profilePicture },
            isFavorite,
            numberOfFlashcards,
          }) => {
            const author = `${name} ${lastName}`;
            return (
              <FlashcardsListItem
                key={setId}
                setId={setId}
                authorId={userId}
                title={title}
                description={description || ""}
                author={author}
                profilePicture={profilePicture}
                date={
                  createdAt?.toLocaleDateString("pl-PL", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }) || ""
                }
                categories={category || []}
                numberOfFlashcards={numberOfFlashcards || 0}
                isFavorite={isFavorite}
              />
            );
          }
        )}
      </div>
      <div className="mx-5 flex justify-between">
        <div className="space-x-5 flex">
          {currentPage !== 1 && currentPage !== 2 && (
            <Link
              href={`/flashcards/explore?page=1`}
              className="bg-secondary hover:bg-secondary/90 p-2 text-white rounded-md"
            >
              <ArrowBigLeftDash />
            </Link>
          )}
          {hasPreviosPage && (
            <Link
              href={`/flashcards/explore/?page=${
                currentPage ? currentPage - 1 : 1
              }`}
              className="bg-secondary hover:bg-secondary/90 p-2 text-white rounded-md"
            >
              <ArrowLeft />
            </Link>
          )}
        </div>
        <div className="space-x-5 flex">
          {currentPage !== totalPages && hasNextPage && (
            <Link
              href={`/flashcards/explore/?page=${
                currentPage ? currentPage + 1 : 2
              }`}
              className="bg-secondary hover:bg-secondary/90 p-2 text-white rounded-md"
            >
              <ArrowRight />
            </Link>
          )}
          {totalPages &&
            currentPage !== totalPages - 1 &&
            currentPage !== totalPages &&
            hasNextPage && (
              <Link
                href={`/flashcards/explore/?page=${totalPages}`}
                className="bg-secondary hover:bg-secondary/90 p-2 text-white rounded-md"
              >
                <ArrowBigRightDash />
              </Link>
            )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsList;
