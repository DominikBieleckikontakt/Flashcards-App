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
    <main className="my-8">
      <div className="rounded-lg p-8">
        {/* <h2 className="text-2xl font-light md:w-4/6 md:mx-auto">
          Add new flashcards set
        </h2> */}
        <Steps />
      </div>
    </main>
  );
};

export default NewFlashcardsPage;
