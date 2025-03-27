"use server";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { LoginForm, RegisterForm } from "@/types";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession, generateSessionToken } from "@/lib/server/utils";
import { setSessionTokenCookie } from "./cookies";

export const loginUser = async ({ email, password }: LoginForm) => {
  if (!email || !password) {
    return { error: "All fields are required!" };
  }

  const user = await db.query.userTable.findFirst({
    where: (users, { eq, or }) =>
      or(eq(users.email, email), eq(users.username, email)),
  });

  if (!user) {
    return { error: "User not found!" };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return { error: "Invalid password! Try again." };
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return { user, message: "Login successful!" };
};

export const createUser = async ({
  firstname,
  lastname,
  email,
  username,
  password,
}: RegisterForm) => {
  if (!firstname || !lastname || !email || !username || !password) {
    return { error: "All fields are required" };
  }

  if (!email.includes("@")) {
    return { error: "Invalid email" };
  }

  const userExist = await db.query.userTable.findFirst({
    where: (users, { eq, or }) =>
      or(eq(users.email, email), eq(users.username, username)),
  });

  if (userExist) {
    return { error: "This user already exists!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(userTable)
    .values({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    })
    .returning();

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return { user, message: "User created successfully" };
};
