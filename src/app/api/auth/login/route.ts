import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db/mongoose";
import User from "@/models/User";
import { signAdminToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  await dbConnect();

  const { email, password } = await req.json().catch(() => ({}));
  const e = (email || "").toLowerCase().trim();
  const p = (password || "").toString();

  if (!e || !p) {
    return NextResponse.json({ ok: false, error: "Email and password required" }, { status: 400 });
  }

  const user = await User.findOne({ email: e }).lean();
  if (!user) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

  // Only admin can login to /admin
  if (user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Admin access only" }, { status: 403 });
  }

  const ok = await bcrypt.compare(p, user.passwordHash);
  if (!ok) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

  const token = signAdminToken({ uid: String(user._id), role: "admin", email: user.email });

  const res = NextResponse.json({ ok: true });

  res.cookies.set("ma_admin_token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  domain: process.env.NODE_ENV === "production" ? ".mapacres.com" : undefined,
});


  return res;
}
