import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Call the better-auth endpoint to check if the session is valid
  const url = new URL("/api/auth/get-session", request.nextUrl.origin);
  const response = await fetch(url.toString(), {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const session = await response.json().catch(() => null);

  if (!session || !session.session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/items/:path*"],
};
