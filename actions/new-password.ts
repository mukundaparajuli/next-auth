"use server";

import * as z from "zod";
import { newPassword } from "../schemas";
import { getPasswordResetTokenByToken } from "../data/password-reset-token";
import { getUserByEmail } from "../data/user";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const resetPassword = async (
  values: z.infer<typeof newPassword>,
  token?: string | null
) => {
  if (!token) {
    return { error: "No token found" };
  }
  const validatedFields = newPassword.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Input" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExipired = new Date(existingToken.expires) < new Date();

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email doesnot exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password Updated" };
};
