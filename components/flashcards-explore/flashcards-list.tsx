import React from "react";

import FlashcardsListItem from "./flashcards-list-item";

import { FlashcardsListProps } from "@/types";

const FlashcardsList = (flashcardsSets: FlashcardsListProps) => {
  const flashcardsSetsArray = flashcardsSets.flashcardsSets;

  return (
    <div className="grid md:grid-cols-2 2xl:grid-cols-3 items-start gap-4 mx-5 my-12">
      {flashcardsSetsArray.map(
        (
          {
            set: { id: setId, title, description, createdAt, category },
            author: { id: userId, name, lastName, profilePicture },
            isFavorite,
            numberOfFlashcards,
          },
          index
        ) => {
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
  );
};

export default FlashcardsList;
