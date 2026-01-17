import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url), 303);

  // clear both (safe)
  res.cookies.set("ma_admin_token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.cookies.set("mapacres_token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
