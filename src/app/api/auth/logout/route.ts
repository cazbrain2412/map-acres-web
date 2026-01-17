import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.json({ ok: true });

  // clear BOTH cookies (some places read ma_admin_token, some read mapacres_token)
  res.cookies.set("ma_admin_token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? ".mapacres.com" : undefined,
  });

  res.cookies.set("mapacres_token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? ".mapacres.com" : undefined,
  });

  return res;
}

