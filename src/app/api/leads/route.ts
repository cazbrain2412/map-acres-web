import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Lead from "@/models/Lead";
import { getSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const type = body.type === "contact" ? "contact" : "enquiry";
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const propertyId = body.propertyId || null;

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Name and phone are required" }, { status: 400 });
  }

  await Lead.create({
    type,
    name,
    phone,
    email,
    message,
    propertyId,
  });

  return NextResponse.json({ ok: true });
}

// Admin only: view leads
export async function GET() {
  await dbConnect();
  const session = await getSession();
if (!session || session.role !== "admin") {

    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const items = await Lead.find({}).sort({ createdAt: -1 }).limit(200).lean();
  return NextResponse.json({ ok: true, items });
}

