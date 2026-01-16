import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Redirect back to login (works both on localhost and production)
  const res = NextResponse.redirect(new URL("/admin/login", req.url));

  // Clear BOTH cookies (new + old) to avoid mismatch
  res.cookies.set("ma_admin_token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    domain: process.env.NODE_ENV === "production" ? ".mapacres.com" : undefined,
  });

  res.cookies.set("mapacres_token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    domain: process.env.NODE_ENV === "production" ? ".mapacres.com" : undefined,
  });

  return res;
}
