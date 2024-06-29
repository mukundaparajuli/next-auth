import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);
import {
  publicRoutes,
  authPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";
import { NextRequest } from "next/server";

export default middleware(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(authPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return;
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
    }

    if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return;
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
