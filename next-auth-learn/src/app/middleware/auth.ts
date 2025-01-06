import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(req: NextRequest): NextResponse | null {
  // Get the session token from the cookies
  const token = req.cookies.get("next-auth.session-token");

  // If the user is not authenticated and trying to access a protected page
  if (!token) {
    // Allow access to the login page
    if (req.nextUrl.pathname === "/auth") {
      return null; // Continue to the login page
    }

    // Redirect to login page if user is not authenticated
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // If the user is already authenticated and tries to access the login page
  if (req.nextUrl.pathname === "/auth") {
    // Redirect the authenticated user away from the login page
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect to the dashboard or a desired page
  }

  return null; // Allow the request to proceed for all other cases
}
