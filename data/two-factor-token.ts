import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorConfirmationToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorConfirmationToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (err) {
    console.log(err);
    return null;
  }
};
