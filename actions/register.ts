"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { registerSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const Register = async (values: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Credentials!" };
  }
  const { email, name, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const verficationToken = generateVerificationToken(email);
  // TODO: Send verification email
  // await sendVerificationEmail(
  //   (
  //     await verficationToken
  //   ).email,
  //   (
  //     await verficationToken
  //   ).token
  // );
  await sendVerificationEmail(
    (
      await verficationToken
    ).email,
    (
      await verficationToken
    ).token
  );
  return { success: "Verification Email was sent" };
};
