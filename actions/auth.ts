"use server";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { RegisterForm } from "@/types";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession, generateSessionToken } from "@/lib/server/utils";
import { setSessionTokenCookie } from "./cookies";

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

  const userExist = await db
    .select()
    .from(userTable)
    .where(or(eq(userTable.email, email), eq(userTable.username, username)));
  if (userExist.length > 0) {
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
