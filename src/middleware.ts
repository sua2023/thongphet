import { NextRequest, NextResponse } from "next/server";

const protectedPrivate = ["/admin"];
const protectedPublic = ["/auth/admin/login"];
const protectedDefault = ["/"];
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const checkedToken = req.cookies.get("auth_token");

  const pathDefault = protectedDefault.some(
    (defaultPath) => pathname === defaultPath
  );
  const pathPublic = protectedPublic.some((publicPath) =>
    pathname.startsWith(publicPath)
  );
  const pathPrivate = protectedPrivate.some((privatePath) =>
    pathname.startsWith(privatePath)
  );

  if (pathPrivate) {
    if (!checkedToken) {
      return NextResponse.redirect(new URL("/auth/admin/login", req.url));
    }
  }
  if (pathPublic && checkedToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (pathDefault) {
    if (checkedToken) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/auth/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/auth/admin/:path*"],
};
