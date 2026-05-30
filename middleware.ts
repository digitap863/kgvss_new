import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Create a new Headers object to pass path information to Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const secret = process.env.ADMIN_SESSION_SECRET || "replace-with-a-long-random-secret";
  const token = request.cookies.get("admin_session")?.value;

  // 1. Handle login path bypasses
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    if (pathname === "/admin/login" && token) {
      const payload = await verifyJWT(token, secret);
      if (payload) {
        // If already logged in, redirect away from login page to dashboard
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 2. Protect admin and api/admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    let isAuthenticated = false;

    if (token) {
      const payload = await verifyJWT(token, secret);
      if (payload) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      if (pathname.startsWith("/api/")) {
        return new NextResponse(
          JSON.stringify({ success: false, message: "Unauthorized access." }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // Continue to the requested page/route with custom headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, public folder assets
     */
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
