"use server";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { UserUpdateType } from "@/types";
import { eq } from "drizzle-orm";

export const updateUser = async (data: UserUpdateType & { id: string }) => {
  try {
    const { id, ...updateFields } = data;

    if (Object.keys(updateFields).length === 0) {
      return { success: false, message: "No fields to update!" };
    }

    await db.update(userTable).set(updateFields).where(eq(userTable.id, id));
    return { success: true, message: "Profile updated!" };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong during saving data. Sorry for problems!",
    };
  }
};
