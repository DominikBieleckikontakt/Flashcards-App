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
        <Steps />
      </div>
    </main>
  );
};

export default NewFlashcardsPage;
