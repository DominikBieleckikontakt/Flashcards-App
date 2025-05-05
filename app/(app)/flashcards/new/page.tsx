import React from "react";

import { getCurrentSession } from "@/actions/cookies";
import { redirect } from "next/navigation";
import Steps from "@/components/add-flashcard/steps";

const NewFlashcardsPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-sm:px-5 max-xl:px-16 my-36 lg:max-w-[1200px]">
      <div className="rounded-lg border border-dark/10 p-8">
        <h2 className="text-2xl font-light md:w-4/6 md:mx-auto">
          Add new flashcards set
        </h2>
        <Steps />
      </div>
    </main>
  );
};

export default NewFlashcardsPage;
