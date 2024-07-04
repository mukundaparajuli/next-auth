"use server";

import { getUserByEmail } from "../data/user";
import { resetSchema } from "../schemas";
import * as z from "zod";
import { generatePasswordResetEmail } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const Reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetEmail(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email sent" };
};
