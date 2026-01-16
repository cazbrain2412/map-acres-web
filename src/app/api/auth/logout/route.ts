import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const res = NextResponse.redirect(new URL("/admin/login", url));

  const cookieOpts = {
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    domain: process.env.NODE_ENV === "production" ? ".mapacres.com" : undefined,
  };

  res.cookies.set("ma_admin_token", "", cookieOpts);
  res.cookies.set("mapacres_token", "", cookieOpts); // optional cleanup

  return res;
}

