import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth/password";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const role = body.role === "agent" ? "agent" : "owner";
  const name = String(body.name || "").trim();
  const email = String(body.email || "").toLowerCase().trim();
  const phone = String(body.phone || "").trim();
  const password = String(body.password || "");

  if (!name || !email || password.length < 6) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  const exists = await User.findOne({ email });
  if (exists) return NextResponse.json({ ok: false, error: "Email already exists" }, { status: 409 });

  const passwordHash = await hashPassword(password);
  await User.create({ role, name, email, phone, passwordHash, verified: true });

  return NextResponse.json({ ok: true });
}

