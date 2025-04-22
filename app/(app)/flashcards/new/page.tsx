import React from "react";

import { getCurrentSession } from "@/actions/cookies";
import { redirect } from "next/navigation";
import AddFlashcardForm from "@/components/add-flashcard/add-flashcard-form";

const NewFlashcardsPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-sm:px-5 max-xl:px-16 my-36 lg:max-w-[1200px]">
      <AddFlashcardForm />
    </main>
  );
};

export default NewFlashcardsPage;
