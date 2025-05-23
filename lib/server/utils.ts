import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { and, desc, eq, inArray, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  type User,
  type Session,
  sessionTable,
  userTable,
  flashcardSetsTable,
  flashcardSetToFlashcardsTable,
  favorites,
} from "@/db/schema";

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);

  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

export const createSession = async (
  token: string,
  userId: string
): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await db.insert(sessionTable).values(session);
  return session;
};

export const validateSessionToken = async (
  token: string
): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const result = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    await db
      .update(sessionTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionTable.id, session.id));
  }

  return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
};

export const invalidateAllSessions = async (userId: string): Promise<void> => {
  await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
};

export const getFlashcards = async (
  page: number,
  pageSize: number,
  userId?: string
) => {
  const offset = (page - 1) * pageSize;

  const flashcardsSets = await db
    .select({
      set: flashcardSetsTable,
      author: {
        id: userTable.id,
        name: userTable.firstname,
        lastName: userTable.lastname,
        username: userTable.username,
        email: userTable.email,
        profilePicture: userTable.profilePicture,
      },
    })
    .from(flashcardSetsTable)
    .innerJoin(userTable, eq(flashcardSetsTable.userId, userTable.id))
    .orderBy(desc(flashcardSetsTable.createdAt))
    .limit(pageSize)
    .offset(offset);

  const setIds = flashcardsSets.map((s) => s.set.id);

  const flashcardCounts = await db
    .select({
      setId: flashcardSetToFlashcardsTable.setId,
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(flashcardSetToFlashcardsTable)
    .where(inArray(flashcardSetToFlashcardsTable.setId, setIds))
    .groupBy(flashcardSetToFlashcardsTable.setId);

  const countsMap = new Map(flashcardCounts.map((fc) => [fc.setId, fc.count]));

  const favoriteIds = userId
    ? await db
        .select({ flashcardSetId: favorites.flashcardSetId })
        .from(favorites)
        .where(
          and(
            inArray(favorites.flashcardSetId, setIds),
            eq(favorites.userId, userId)
          )
        )
    : [];

  const favoriteSet = new Set(favoriteIds.map((f) => f.flashcardSetId));

  return flashcardsSets.map((s) => ({
    ...s,
    isFavorite: favoriteSet.has(s.set.id),
    numberOfFlashcards: countsMap.get(s.set.id) || 0,
  }));
};

export const getFlashcardsSetsNumber = async () => {
  const count = await db
    .select({
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(flashcardSetsTable);

  return count[0].count;
};
