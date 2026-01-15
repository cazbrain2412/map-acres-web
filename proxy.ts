import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/auth/jwt";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  // allow login page + login api + seed-admin
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/dev/seed-admin")
  ) {
    return NextResponse.next();
  }

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  const token = req.cookies.get("ma_admin_token")?.value;
  const payload = token ? verifyAdminToken(token) : null;

  if (!payload || payload.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// protect only admin paths
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

