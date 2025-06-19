import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq, or, and, inArray } from "drizzle-orm";

import { validateSessionToken } from "@/lib/server/utils";
import { db } from "@/db";
import {
  flashcardSetsTable,
  flashcardSetToFlashcardsTable,
  flashcardsTable,
} from "@/db/schema";

import { FlashcardSet } from "@/types";

export async function POST(req: Request) {
  const token = (await cookies()).get("session")?.value ?? null;
  if (token === null) {
    return new Response(null, { status: 401 });
  }

  const { session, user } = await validateSessionToken(token);

  if (session === null) {
    return new Response(null, { status: 401 });
  }

  const {
    id,
    title,
    description,
    privacy,
    category,
    flashcards,
  }: FlashcardSet & { id: string } = await req.json();

  if (!title || !flashcards) {
    return NextResponse.json(
      { message: "Title and flashcards are required" },
      { status: 400 }
    );
  }

  if (flashcards.length === 0) {
    return NextResponse.json(
      { message: "Flashcards cannot be empty" },
      { status: 400 }
    );
  }

  const updatedSet = await db
    .update(flashcardSetsTable)
    .set({
      title,
      description,
      privacy,
      category,
    })
    .where(eq(flashcardSetsTable.id, id))
    .returning();

  if (updatedSet.length === 0) {
    return NextResponse.json(
      { message: "Flashcard set not found" },
      { status: 404 }
    );
  }

  const currentSetFlashcards = await db
    .select({
      flashcardId: flashcardSetToFlashcardsTable.flashcardId,
    })
    .from(flashcardSetToFlashcardsTable)
    .where(eq(flashcardSetToFlashcardsTable.setId, id));

  const currentFlashcardIds = new Set(
    currentSetFlashcards.map((f) => f.flashcardId)
  );

  const newFlashcardIds: string[] = [];
  const questionAnswerPairs = flashcards.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  const existingFlashcards = await db
    .select()
    .from(flashcardsTable)
    .where(
      or(
        ...questionAnswerPairs.map((pair) =>
          and(
            eq(flashcardsTable.question, pair.question),
            eq(flashcardsTable.answer, pair.answer)
          )
        )
      )
    );

  for (const flashcard of flashcards) {
    const existing = existingFlashcards.find(
      (f) => f.question === flashcard.question && f.answer === flashcard.answer
    );

    if (existing) {
      newFlashcardIds.push(existing.id);
    } else {
      const [newFlashcard] = await db
        .insert(flashcardsTable)
        .values({
          question: flashcard.question,
          answer: flashcard.answer,
        })
        .returning();
      newFlashcardIds.push(newFlashcard.id);
    }
  }

  const newFlashcardIdsSet = new Set(newFlashcardIds);

  const flashcardsToRemove = [...currentFlashcardIds].filter(
    (id) => !newFlashcardIdsSet.has(id)
  );

  const flashcardsToAdd = [...newFlashcardIdsSet].filter(
    (id) => !currentFlashcardIds.has(id)
  );

  if (flashcardsToRemove.length > 0) {
    await db
      .delete(flashcardSetToFlashcardsTable)
      .where(
        and(
          eq(flashcardSetToFlashcardsTable.setId, id),
          inArray(flashcardSetToFlashcardsTable.flashcardId, flashcardsToRemove)
        )
      );
  }

  for (const flashcardId of flashcardsToAdd) {
    await db.insert(flashcardSetToFlashcardsTable).values({
      setId: id,
      flashcardId,
    });
  }

  return NextResponse.json(
    { message: "Flashcard set updated successfully" },
    { status: 200 }
  );
}
