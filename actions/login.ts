"use server";

import { z } from "zod";
import { loginSchema } from "../schemas";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { getUserByEmail } from "../data/user";
import { sendVerificationEmail, twoFactorConfirmationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "../data/two-factor-token";
import { db } from "@/lib/db";
import { twoFactorConfirmationByUserId } from "../data/two-factor-confirmation";
import { TwoFactorConfirmation } from "@prisma/client";
export const Login = async (values: z.infer<typeof loginSchema>) => {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Credentials!" };
  }
  const { email, password, code } = validateFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }
  if (!existingUser.emailVerified) {
    const verficationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verficationToken.email, verficationToken.token);
    return { success: "New Verification Email had been sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // TODO: Verify the code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: "Invalid Code" };
      if (twoFactorToken.token !== code) return { error: "Invalid Code" };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code Expired" };
      }

      await db.twoFactorConfirmationToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await twoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          } as TwoFactorConfirmation,
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        } as TwoFactorConfirmation,
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(email);
      await twoFactorConfirmationEmail(
        twoFactorToken.email,
        twoFactorToken.token
      );

      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    console.log("Redirecting to settings page");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
