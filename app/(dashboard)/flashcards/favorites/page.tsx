import React from "react";
import { notFound, redirect } from "next/navigation";

import { getCurrentSession } from "@/actions/cookies";
import {
  cachedFlashcards,
  getFlashcards,
  hasActiveFilters,
} from "@/lib/server/utils";
import { PAGE_SIZE } from "@/constants";

import FlashcardsList from "@/components/flashcards-explore/flashcards-list";

const FavoritesPage = async ({
  searchParams,
}: {
  searchParams: {
    page?: string;
    categories?: string[];
    sort?: string;
    search?: string;
  };
}) => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  const { categories, page, sort, search } = await searchParams;

  const selectedCategories = Array.isArray(categories)
    ? categories
    : categories
    ? [categories]
    : [];

  const selectedSort = sort || "Most Popular";

  const currentPage = parseInt(page || "1", 10);

  if (currentPage < 1) return notFound();

  // const flashcardsSets = await getFlashcards(
  //   currentPage,
  //   PAGE_SIZE,
  //   user.id,
  //   false,
  //   selectedCategories,
  //   selectedSort,
  //   search || "",
  //   true
  // );

  const hasFilters = hasActiveFilters({
    categories: selectedCategories,
    sort: selectedSort,
    search: search || "",
  });

  const { flashcards, totalCount } = await cachedFlashcards(
    "favorites",
    currentPage,
    PAGE_SIZE,
    user.id,
    {
      categories: selectedCategories,
      sort: selectedSort,
      search: search,
    },
    {
      revalidate: hasFilters ? 0 : 3600,
      tags: hasFilters ? [] : ["flashcards"],
    }
  );

  return (
    <main className="flex justify-center items-center">
      <FlashcardsList
        initialFlashcards={flashcards}
        totalCount={totalCount}
        favoritesOnly={true}
      />
    </main>
  );
};

export default FavoritesPage;
