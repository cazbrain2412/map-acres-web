import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db/mongoose";
import User from "@/models/User";

export async function POST() {
  await dbConnect();

  const email = (process.env.ADMIN_EMAIL || "admin@mapacres.com").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "password";

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return NextResponse.json({ ok: true, message: "Admin already exists", email });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    role: "admin",
    name: "MapAcres Admin",
    email,
    phone: "",
    passwordHash,
    verified: true,
  });

  return NextResponse.json({ ok: true, message: "Admin created", email });
}

