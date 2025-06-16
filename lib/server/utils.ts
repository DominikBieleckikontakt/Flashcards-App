import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { and, asc, desc, eq, inArray, ne, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  type User,
  type Session,
  sessionTable,
  userTable,
  flashcardSetsTable,
  flashcardSetToFlashcardsTable,
  favorites,
  flashcardsTable,
  flashcardViewsTable,
} from "@/db/schema";
import { getCurrentSession } from "@/actions/cookies";

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
  userId?: string,
  isPrivate?: boolean,
  categories?: string[] | string[][],
  sort?: string,
  search?: string,
  favoritesOnly?: boolean,
  privateOnly?: boolean
) => {
  const offset = (page - 1) * pageSize;
  const { user } = await getCurrentSession();

  const baseSelect = db.select({
    set: flashcardSetsTable,
    author: {
      id: userTable.id,
      name: userTable.firstname,
      lastName: userTable.lastname,
      username: userTable.username,
      email: userTable.email,
      profilePicture: userTable.profilePicture,
    },
    favorites: sql<number>`COUNT(${favorites.flashcardSetId})`.as("favorites"),
    viewsCount: sql<number>`(
        SELECT COUNT(*)
        FROM ${flashcardViewsTable} 
        WHERE ${flashcardViewsTable.setId} = ${flashcardSetsTable.id}
        )`.as("viewsCount"),
  });

  const whereConditions = [
    privateOnly ? eq(flashcardSetsTable.userId, user!.id) : undefined,
    isPrivate !== undefined
      ? eq(flashcardSetsTable.privacy, isPrivate ? "private" : "public")
      : undefined,
    categories && categories.length > 0
      ? sql`${flashcardSetsTable.category} && ARRAY[${sql.join(
          categories.map((cat) => sql`${cat}`),
          sql`, `
        )}]::text[]`
      : undefined,
    search
      ? sql`LOWER(${
          flashcardSetsTable.title
        }) LIKE ${`%${search.toLowerCase()}%`}`
      : undefined,
  ].filter(Boolean);

  // Two versions - based on favoritesOnly
  const query = favoritesOnly
    ? baseSelect
        .from(flashcardSetsTable)
        .innerJoin(userTable, eq(flashcardSetsTable.userId, userTable.id))
        .innerJoin(
          favorites,
          and(
            eq(favorites.flashcardSetId, flashcardSetsTable.id),
            eq(favorites.userId, user!.id)
          )
        )
        .where(and(...whereConditions))
        .groupBy(flashcardSetsTable.id, userTable.id)
        .orderBy(
          sort === "Most Popular"
            ? desc(sql`favorites`)
            : sort === "Least Popular"
            ? asc(sql`favorites`)
            : sort === "A-Z"
            ? asc(flashcardSetsTable.title)
            : sort === "Z-A"
            ? desc(flashcardSetsTable.title)
            : sort === "Newest"
            ? desc(flashcardSetsTable.createdAt)
            : sort === "Oldest"
            ? asc(flashcardSetsTable.createdAt)
            : desc(flashcardSetsTable.title)
        )
        .limit(pageSize)
        .offset(offset)
    : baseSelect
        .from(flashcardSetsTable)
        .innerJoin(userTable, eq(flashcardSetsTable.userId, userTable.id))
        .leftJoin(
          favorites,
          eq(favorites.flashcardSetId, flashcardSetsTable.id)
        )
        .where(and(...whereConditions))
        .groupBy(flashcardSetsTable.id, userTable.id)
        .orderBy(
          sort === "Most Popular"
            ? desc(sql`favorites`)
            : sort === "Least Popular"
            ? asc(sql`favorites`)
            : sort === "A-Z"
            ? asc(flashcardSetsTable.title)
            : desc(flashcardSetsTable.title)
        )
        .limit(pageSize)
        .offset(offset);

  const flashcardsSets = await query;

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

export const getFlashcardSetById = async (id: string) => {
  const flashcards = await db
    .select({
      id: flashcardsTable.id,
      question: flashcardsTable.question,
      answer: flashcardsTable.answer,
    })
    .from(flashcardSetToFlashcardsTable)
    .innerJoin(
      flashcardsTable,
      eq(flashcardSetToFlashcardsTable.flashcardId, flashcardsTable.id)
    )
    .where(eq(flashcardSetToFlashcardsTable.setId, id));

  const setInformation = await db
    .select()
    .from(flashcardSetsTable)
    .where(eq(flashcardSetsTable.id, id));

  const setData = setInformation[0];

  return { flashcards, setData };
};

export const trackSetView = async (userId: string, setId: string) => {
  await db.insert(flashcardViewsTable).values({ userId, setId });
};

export const getAllUserViews = async (userId: string) => {
  const views = await db
    .select({
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(flashcardViewsTable)
    .where(eq(flashcardViewsTable.userId, userId));
  return views[0]?.count || 0;
};

export const getAllUserSetsViews = async (userId: string) => {
  const result = await db
    .select({
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(flashcardViewsTable)
    .innerJoin(
      flashcardSetsTable,
      eq(flashcardViewsTable.setId, flashcardSetsTable.id)
    )
    .where(
      and(
        eq(flashcardSetsTable.userId, userId),
        ne(flashcardViewsTable.userId, userId)
      )
    );

  return result[0]?.count || 0;
};

export const getCountOfUserSets = async (userId: string) => {
  const result = await db
    .select({
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(flashcardSetsTable)
    .where(eq(flashcardSetsTable.userId, userId));

  return result?.[0].count || 0;
};

export const getCountOfAllUserSetsFavorites = async (userId: string) => {
  const result = await db
    .select({
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(favorites)
    .innerJoin(
      flashcardSetsTable,
      eq(flashcardSetsTable.id, favorites.flashcardSetId)
    )
    .where(
      and(eq(flashcardSetsTable.userId, userId), ne(favorites.userId, userId))
    );

  return result[0]?.count || 0;
};

export const getCountOfAllUserFavorites = async (userId: string) => {
  const result = await db
    .select({
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(favorites)
    .where(eq(favorites.userId, userId));

  return result[0]?.count || 0;
};
