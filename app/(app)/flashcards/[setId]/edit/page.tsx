import React from "react";
import { notFound, redirect } from "next/navigation";

import { getCurrentSession } from "@/actions/cookies";
import { getFlashcardSetById } from "@/lib/server/utils";

import Steps from "@/components/add-flashcard/steps";

const EditFlashcardPage = async ({
  params,
}: {
  params: {
    setId: string;
  };
}) => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  const { setId } = await params;

  const { flashcards, setData } = await getFlashcardSetById(setId);

  if (flashcards.length === 0) {
    return notFound();
  }

  let index = 0;
  flashcards.forEach((flashcard) => {
    flashcard.id = index.toString();
    index++;
  });

  return (
    <main className="my-8 h-full">
      <div className="rounded-lg p-8 h-full">
        <Steps flashcards={flashcards} setData={setData} />
      </div>
    </main>
  );
};

export default EditFlashcardPage;
