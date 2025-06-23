"use server";

import { db } from "@/db";
import { favorites, flashcardSetsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getCurrentSession } from "./cookies";

export const toggleFlashcardSetFavorite = async (
  userId: string,
  setId: string
) => {
  const isFavorite = await db
    .select()
    .from(favorites)
    .where(
      and(eq(favorites.userId, userId), eq(favorites.flashcardSetId, setId))
    )
    .limit(1);

  if (isFavorite.length > 0) {
    await db
      .delete(favorites)
      .where(
        and(eq(favorites.userId, userId), eq(favorites.flashcardSetId, setId))
      );
    return true;
  } else {
    await db.insert(favorites).values({ userId, flashcardSetId: setId });
    return true;
  }
};

export const deleteFlashcardSetById = async (setId: string) => {
  const [set] = await db
    .select()
    .from(flashcardSetsTable)
    .where(eq(flashcardSetsTable.id, setId));

  const { user } = await getCurrentSession();

  if (!set || set.userId !== user?.id) {
    throw new Error("Unauthorized");
  }

  await db.delete(flashcardSetsTable).where(eq(flashcardSetsTable.id, setId));
};
