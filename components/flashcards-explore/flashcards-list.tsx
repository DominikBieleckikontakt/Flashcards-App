"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

import FlashcardsListItem from "./flashcards-list-item";

import { FlashcardsList as FlashcardsListType } from "@/types";

import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import FlashcardsControls from "./flashcards-controls";
import { PAGE_SIZE } from "@/constants";
import Loader from "../loader";
import FlashcardsSearchbar from "./flashcards-searchbar";

type FlashcardsListProps = {
  initialFlashcards: FlashcardsListType[];
  favoritesOnly?: boolean;
  privateOnly?: boolean;
  totalCount: number;
};

const FlashcardsList = ({
  initialFlashcards,
  favoritesOnly,
  privateOnly,
  totalCount,
}: FlashcardsListProps) => {
  const searchParams = useSearchParams();

  const [flashcardsSets, setFlashcardsSets] =
    useState<FlashcardsListType[]>(initialFlashcards);
  const [count, setCount] = useState<number>(totalCount);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(totalCount / PAGE_SIZE)
  );
  const [hasNextPage, setHasNextPage] = useState<boolean>(
    parseInt(searchParams.get("page") || "1", 10) <
      Math.ceil(totalCount / PAGE_SIZE)
  );
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(
    currentPage > 1
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("search") || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);

    // Fetch flashcards based on the current search params
    const fetchFlashcards = async () => {
      setIsLoading(true);
      setFlashcardsSets([]);
      const currentParams = new URLSearchParams(searchParams.toString());

      const response = await fetch(
        `/api/flashcards/get?visibility=${
          favoritesOnly
            ? "favorites"
            : privateOnly
            ? "my-flashcards"
            : "explore"
        }&${currentParams.toString()}`,
        {
          next: {
            revalidate: currentParams ? 0 : 60,
          },
        }
      );

      const data = await response.json();
      setFlashcardsSets(data.flashcards);
      setCount(data.totalCount);
      setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
      setHasNextPage(page < Math.ceil(data.totalCount / PAGE_SIZE));
      setHasPreviousPage(page > 1);
      setIsLoading(false);
    };

    setTimeout(() => {
      fetchFlashcards();
    }, 100);
  }, [searchParams, searchQuery]);

  const onDeleteSetHandler = (setId: string) => {
    const newFlashcardsSets = flashcardsSets.filter(
      (set) => set.set.id !== setId
    );
    setFlashcardsSets(newFlashcardsSets);
  };

  return (
    <div className="w-full mx-5 2xl:mx-32 my-12 grid gap-4">
      <div className="w-full max-w-full flex items-center justify-between flex-wrap gap-5">
        <FlashcardsControls toggleLoading={setIsLoading} />
        <FlashcardsSearchbar
          changeQuery={setSearchQuery}
          toggleLoading={setIsLoading}
        />
      </div>
      {isLoading && (
        <div className="flex justify-center items-center w-full h-96">
          <Loader styles="size-12 border-4" />
        </div>
      )}
      {!isLoading && flashcardsSets.length === 0 && (
        <p>No flashcards found matching your filters.</p>
      )}
      {!isLoading && flashcardsSets.length > 0 && (
        <>
          <div className="grid lg:grid-cols-2 2xl:grid-cols-3 items-start gap-4 w-full max-w-full">
            {flashcardsSets.map(
              (
                {
                  set: { id: setId, title, description, createdAt, category },
                  author: { id: userId, name, lastName, profilePicture },
                  favorites,
                  isFavorite,
                  numberOfFlashcards,
                },
                index
              ) => {
                const author = `${name} ${lastName}`;
                return (
                  <FlashcardsListItem
                    key={setId}
                    index={index}
                    setId={setId}
                    authorId={userId}
                    title={title}
                    description={description || ""}
                    author={author}
                    profilePicture={profilePicture}
                    date={
                      createdAt
                        ? new Date(createdAt).toLocaleDateString("pl-PL", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                        : ""
                    }
                    categories={category || []}
                    numberOfFlashcards={numberOfFlashcards || 0}
                    isFavorite={isFavorite}
                    numberOfFavorites={favorites || 0}
                    onDelete={onDeleteSetHandler}
                  />
                );
              }
            )}
          </div>
          <div className="mx-5 flex justify-between">
            <div className="space-x-5 flex">
              {currentPage !== 1 && currentPage !== 2 && (
                <Link
                  href={{
                    pathname,
                    query: {
                      ...Object.fromEntries(searchParams.entries()),
                      page: 1,
                    },
                  }}
                  className="bg-secondary hover:bg-secondary/90 p-2 text-white rounded-md"
                >
                  <ArrowBigLeftDash />
                </Link>
              )}
              {hasPreviousPage && (
                <Link
                  href={{
                    pathname,
                    query: {
                      ...Object.fromEntries(searchParams.entries()),
                      page: currentPage - 1,
                    },
                  }}
                  className="bg-secondary hover:bg-secondary/90 p-2 text-white rounded-md"
                >
                  <ArrowLeft />
                </Link>
              )}
            </div>
            <div className="space-x-5 flex">
              {currentPage !== totalPages && hasNextPage && (
                <Link
                  href={{
                    pathname,
                    query: {
                      ...Object.fromEntries(searchParams.entries()),
                      page: currentPage + 1,
                    },
                  }}
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
                    href={{
                      pathname,
                      query: {
                        ...Object.fromEntries(searchParams.entries()),
                        page: totalPages,
                      },
                    }}
                    className="bg-secondary hover:bg-secondary/90 p-2 text-white rounded-md"
                  >
                    <ArrowBigRightDash />
                  </Link>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FlashcardsList;
