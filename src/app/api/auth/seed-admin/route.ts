import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth/password";

export async function POST() {
  await dbConnect();

  const email = process.env.ADMIN_EMAIL || "admin@mapacres.com";
  const password = process.env.ADMIN_PASSWORD || "password";

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ ok: true, seeded: false });

  const passwordHash = await hashPassword(password);

  await User.create({
    role: "admin",
    name: "MapAcres Admin",
    email,
    phone: "",
    passwordHash,
    verified: true,
  });

  return NextResponse.json({ ok: true, seeded: true });
}

