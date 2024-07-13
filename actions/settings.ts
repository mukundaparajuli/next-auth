"use server";

import * as z from "zod";
import { settingSchma } from "../schemas";
import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "../data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcrypt";

export const settings = async (values: z.infer<typeof settingSchma>) => {
  console.log(values);
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  console.log("OAuth user:", user.isOAuth);
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorAuthenticated = true;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already exists!" };
    }

    // Generate and send verification email
    // const verificationToken = await generateVerificationToken(values.email);
    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token
    // );

    // return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) {
      return { error: "Incorrect Password" };
    }

    values.password = await bcrypt.hash(values.newPassword, 10);
    values.newPassword = undefined;
  }

  try {
    const updatedUser = await db.user.update({
      where: { id: dbUser.id },
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        isTwoFactorEnabled: values.isTwoFactorAuthenticated,
      },
    });

    console.log("Updated User Data:", updatedUser);
    return { success: "Settings Updated" };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { error: "Failed to update settings" };
  }
};
