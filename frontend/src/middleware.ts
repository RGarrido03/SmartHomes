import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "./app/login/user";

export const protectedRoutes = ["/home", "/insight"];
export const authRoutes = ["/login", "/register"];

const isProtected = (path: string): boolean => {
  let route: string;
  for (route of protectedRoutes) {
    if (route === path || path.includes(route)) {
      return true;
    }
  }
  return false;
};

const isAuth = (path: string): boolean => {
  let route: string;
  for (route of authRoutes) {
    if (route === path || path.includes(route)) {
      return true;
    }
  }
  return false;
};

export function middleware(request: NextRequest) {
  const currentUserStr = request.cookies.get("currentUser")?.value;
  let currentUser: User | null = null;

  if (currentUserStr !== undefined) {
    currentUser = JSON.parse(currentUserStr);
  }

  if (
    isProtected(request.nextUrl.pathname) &&
    (!currentUserStr || Date.now() > (currentUser?.expires ?? 0))
  ) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  if (isAuth(request.nextUrl.pathname) && currentUserStr) {
    return NextResponse.redirect(new URL("/insight", request.url));
  }
}
