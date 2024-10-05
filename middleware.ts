import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

// Custom Clerk middleware
export default function middleware(req: NextRequest, event: NextFetchEvent) {
  // Handle your custom logic first
  if (req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // If the request passes your custom logic, delegate to Clerk's middleware
  return clerkMiddleware()(req, event);
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next|_static|favicon.ico).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
