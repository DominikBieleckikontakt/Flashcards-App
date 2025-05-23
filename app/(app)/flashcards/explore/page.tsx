import React from "react";
import { getCurrentSession } from "@/actions/cookies";
import { notFound, redirect } from "next/navigation";
import FlashcardsList from "@/components/flashcards-explore/flashcards-list";
import { getFlashcards, getFlashcardsSetsNumber } from "@/lib/server/utils";

const ExploreFlashcardsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  const pageSize = 9;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  if (currentPage < 1) return notFound();

  const flashcardsSets = await getFlashcards(currentPage, pageSize, user.id);
  const totalFlashcards = await getFlashcardsSetsNumber();

  const totalPages = Math.ceil(totalFlashcards / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  console.log(totalPages);

  return (
    <main className="flex justify-center items-center">
      <FlashcardsList
        flashcardsSets={flashcardsSets}
        hasNextPage={hasNextPage}
        hasPreviosPage={hasPreviousPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </main>
  );
};

export default ExploreFlashcardsPage;
