import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";

import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";

declare module "@auth/core" {
  interface Session {
    user: {
      role: "ADMIN";
    } & DefaultSession["user"];
  }
}
const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);
      if (!existingUser || !existingUser.emailVerified) return false;
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      console.log({ sessiontoken: token });
      return session;
    },
    async jwt({ token, user }) {
      if (!token) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
