"use server";

import { db } from "@/db";
import { favorites } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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
