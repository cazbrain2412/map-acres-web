import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const res = NextResponse.redirect(new URL("/admin/login", url.origin));

  res.cookies.set("mapacres_token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    domain: process.env.NODE_ENV === "production" ? ".mapacres.com" : undefined,
    maxAge: 0,
  });

  return res;
}

