import { NextResponse } from "next/server";
import { auth } from "./auth";
import {
  publicRoutes,
  authPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

export default function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("Request", req);

  const isApiAuthRoute = nextUrl.pathname.startsWith(authPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log(isLoggedIn);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("should be redirected to the login");
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
