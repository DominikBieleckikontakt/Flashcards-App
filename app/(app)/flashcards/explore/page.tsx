import React from "react";
import { getCurrentSession } from "@/actions/cookies";
import { notFound, redirect } from "next/navigation";
import FlashcardsList from "@/components/flashcards-explore/flashcards-list";
import { GetServerSideProps } from "next";
import { FlashcardSet } from "@/types";
import { getFlashcards } from "@/lib/server/utils";

const ExploreFlashcardsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  const pageSize = 10;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  if (currentPage < 1) return notFound();

  const flashcardsSets = await getFlashcards(currentPage, pageSize, user.id);

  return (
    <main className="flex justify-center ">
      <FlashcardsList flashcardsSets={flashcardsSets} />
    </main>
  );
};

export default ExploreFlashcardsPage;
