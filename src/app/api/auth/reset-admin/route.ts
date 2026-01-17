import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth/password";

export async function POST(req: Request) {
  await dbConnect();

  const secret = req.headers.get("x-reset-secret") || "";
  if (!process.env.RESET_ADMIN_SECRET || secret !== process.env.RESET_ADMIN_SECRET) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const email = (process.env.ADMIN_EMAIL || "admin@mapacres.com").toLowerCase().trim();
  const newPassword = process.env.ADMIN_PASSWORD || "password";

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ ok: false, error: "Admin not found" }, { status: 404 });

  user.passwordHash = await hashPassword(newPassword);
  user.role = "admin";
  await user.save();

  return NextResponse.json({ ok: true, email, newPassword });
}

