import React, { Suspense } from "react";
import { getCurrentSession } from "@/actions/cookies";
import { notFound, redirect } from "next/navigation";
import FlashcardsList from "@/components/flashcards-explore/flashcards-list";
import { getFlashcards, getFlashcardsSetsNumber } from "@/lib/server/utils";
import { PAGE_SIZE } from "@/constants";

const ExploreFlashcardsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; categories?: string[]; sort?: string };
}) => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  const { categories, page, sort } = await searchParams;

  const selectedCategories = Array.isArray(categories)
    ? categories
    : categories
    ? [categories]
    : [];

  const selectedSort = sort || "Most Popular";

  const currentPage = parseInt(page || "1", 10);

  if (currentPage < 1) return notFound();

  const flashcardsSets = await getFlashcards(
    currentPage,
    PAGE_SIZE,
    user.id,
    false,
    selectedCategories,
    selectedSort
  );
  // const totalFlashcards = await getFlashcardsSetsNumber();

  return (
    <main className="flex justify-center items-center">
      <FlashcardsList
        initialFlashcards={flashcardsSets}
        // hasNextPage={hasNextPage}
        // hasPreviosPage={hasPreviousPage}
        // totalPages={totalPages}
        // currentPage={currentPage}
      />
    </main>
  );
};

export default ExploreFlashcardsPage;
