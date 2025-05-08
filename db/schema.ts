import { InferSelectModel } from "drizzle-orm";
import { integer } from "drizzle-orm/gel-core";
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  firstname: text("name").notNull(),
  lastname: text("last_name").notNull(),
  username: text("user_name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  profilePicture: text("profile_picture"),
  gender: text("gender"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  birthDate: timestamp("birth_date", { withTimezone: true, mode: "date" }),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const flashcardSetsTable = pgTable("flashcard_sets", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  privacy: text("privacy").notNull(),
  category: text("category").array(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});

export const flashcardsTable = pgTable("flashcards", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});

export const flashcardSetToFlashcardsTable = pgTable(
  "flashcard_set_flashcards",
  {
    setId: uuid("set_id")
      .notNull()
      .references(() => flashcardSetsTable.id, { onDelete: "cascade" }),
    flashcardId: uuid("flashcard_id")
      .notNull()
      .references(() => flashcardsTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.setId, table.flashcardId] }),
  })
);

export const favorites = pgTable(
  "favorites",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    flashcardSetId: uuid("set_id")
      .notNull()
      .references(() => flashcardSetsTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.flashcardSetId] }),
  })
);

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
