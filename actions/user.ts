"use server";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { UserResetPasswordType, UserUpdateType } from "@/types";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

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

export const resetPassword = async ({
  id,
  currentPassword,
  newPassword,
  confirmNewPassword,
}: UserResetPasswordType & { id: string }) => {
  try {
    if (newPassword !== confirmNewPassword) {
      return { success: false, message: "Passwords do not match!" };
    }

    const user = await db.query.userTable.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    if (!user) {
      return { success: false, message: "User not found!" };
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return { success: false, message: "Current password is incorrect!" };
    }

    const arePasswordsEqual = await bcrypt.compare(newPassword, user.password);

    if (arePasswordsEqual) {
      return { success: false, message: "New password cannot be the same!" };
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db
      .update(userTable)
      .set({ password: hashedNewPassword })
      .where(eq(userTable.id, id));

    return { success: true, message: "Password updated!" };
  } catch (error) {
    return {
      success: false,
      message:
        "Something went wrong during resetting password. Sorry for problems!",
    };
  }
};
