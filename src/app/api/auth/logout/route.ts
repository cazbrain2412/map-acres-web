import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url));
  res.cookies.set("ma_admin_token", "", {
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    domain: process.env.NODE_ENV === "production" ? ".mapacres.com" : undefined,
  });
  return res;
}

