import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token.user.role;
    if (req.nextUrl.pathname.startsWith("/controller") && role !== "admin") {
      return NextResponse.rewrite(
        new URL("/filter/?messae=You Are Not Authorized", req.url)
      );
    }

    if (req.nextUrl.pathname.startsWith("/archives") && role !== "user") {
      return NextResponse.rewrite(
        new URL("/login?messae=You Are Not Authorized", req.url)
      );
    }

    if (req.nextUrl.pathname.startsWith("/head") && role !== "head") {
      return NextResponse.rewrite(
        new URL("/login?messae=You Are Not Authorized", req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/controller/:path*", "/archives/:path*", "/head/:path*"],
};
