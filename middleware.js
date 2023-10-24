import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/controller") && req.nextauth.token?.name?.role !== "admin") {
      return NextResponse.rewrite(new URL("/filter/?messae=You Are Not Authorized", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/archives") && req.nextauth.token?.name?.role !== "user") {
      return NextResponse.rewrite(new URL("/login?messae=You Are Not Authorized", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/head") && req.nextauth.token?.name?.role !== "head") {
      return NextResponse.rewrite(new URL("/login?messae=You Are Not Authorized", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/controller/:path*", "/archives/:path*", "/head/:path*"] };
