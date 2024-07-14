import authConfig from "../auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  authRoutes,
  authPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "../routes";
import { NextResponse } from "next/server";
import { auth } from "../auth";

export async function middleware(req) {
  console.log("middleware is runnning");
  const { nextUrl, cookies } = req;
  console.log("NextUrl=", nextUrl);

  const sessionToken = cookies.get("authjs.session-token");
  const isLoggedIn = !!sessionToken;

  const isApiRoutes = nextUrl.pathname.startsWith(authPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isApiRoutes) {
    return null;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    console.log("EncodedUrl:", encodedCallbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
