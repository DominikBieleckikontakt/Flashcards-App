import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq, or, and } from "drizzle-orm";

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

  const { title, description, privacy, category, flashcards }: FlashcardSet =
    await req.json();

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

  // Collect existing flashcards from the database
  const existingFlashcards = await db.query.flashcardsTable.findMany({
    where: or(
      ...flashcards.map((flashcard) =>
        and(
          eq(flashcardsTable.question, flashcard.question),
          eq(flashcardsTable.answer, flashcard.answer)
        )
      )
    ),
    columns: {
      id: true,
      question: true,
      answer: true,
    },
  });

  let finalFlashcards: any[] = [];

  for (const flashcard of flashcards) {
    // Check if the flashcard already exists in the database
    const existing = existingFlashcards.find(
      (existingFlashcard) =>
        existingFlashcard.question === flashcard.question &&
        existingFlashcard.answer === flashcard.answer
    );

    if (existing) {
      finalFlashcards.push(existing); // If it exists, add it to the final list
    } else {
      // If it doesn't exist, create a new flashcard
      const newFlashcard = await db
        .insert(flashcardsTable)
        .values({
          question: flashcard.question,
          answer: flashcard.answer,
        })
        .returning();

      finalFlashcards.push(newFlashcard[0]); // And add it to the final list
    }
  }

  // Create new flashcard set
  const flashcardSet = await db
    .insert(flashcardSetsTable)
    .values({
      title,
      description,
      privacy,
      category,
      userId: user.id,
    })
    .returning();

  // Add all of the flashcards to the flashcard set
  for (const flashcard of finalFlashcards) {
    await db.insert(flashcardSetToFlashcardsTable).values({
      setId: flashcardSet[0].id,
      flashcardId: flashcard.id,
    });
  }

  return NextResponse.json(
    { message: "Flashcard set created successfully" },
    { status: 200 }
  );
}
