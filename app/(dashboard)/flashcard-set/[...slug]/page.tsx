import React from "react";

import { getCurrentSession } from "@/actions/cookies";
import { notFound, redirect } from "next/navigation";
import { getFlashcardSetById, trackSetView } from "@/lib/server/utils";
import FlashcardModesList from "@/components/flashcard-set/flashcard-modes-list";
import FlashcardsModes from "@/components/flashcard-set/flashcards-modes";

const MyFlashcardsPage = async ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  const { slug } = await params;

  const setId = slug[0];
  const { flashcards, setData } = await getFlashcardSetById(setId);

  if (flashcards.length === 0) {
    return notFound();
  }

  await trackSetView(user.id, setId);

  return (
    <main className="flex justify-center items-center flex-col mx-5 2xl:mx-32 my-12 gap-10">
      <div className="w-full">
        <span className="text-[12px] my-0 text-dark/40 font-extralight">
          {setData.createdAt?.toLocaleDateString()}
        </span>
        <h2 className="text-4xl -mt-1">{setData.title}</h2>
        <p className="font-light mt-5">{setData.description}</p>
      </div>
      <div className="w-full space-y-3">
        <FlashcardModesList />
        <FlashcardsModes flashcards={flashcards} />
      </div>
      <div className="w-full">
        <h3 className="text-xl font-light">
          Number of flashcards (
          <span className="font-normal">{flashcards.length}</span>)
        </h3>
        <div className="space-y-5 my-5">
          {flashcards.map((item, index) => (
            <div key={index} className="space-y-5">
              <div className="flex w-full sm:flex-row sm:gap-10 flex-col gap-3">
                <div className="border border-border rounded-lg p-3 px-5 w-full text-sm">
                  {item.question}
                </div>
                <div className="border border-border rounded-lg p-3 px-5 w-full text-sm">
                  {item.answer}
                </div>
              </div>
              {index !== flashcards.length - 1 && (
                <hr className="bg-dark/5 border-none h-[0.1px]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyFlashcardsPage;
