import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Enquiry from "@/models/Enquiry";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json().catch(() => ({}));

  if (!body.propertyId) {
    return NextResponse.json({ ok: false, error: "propertyId required" }, { status: 400 });
  }

  const doc = await Enquiry.create({
    propertyId: body.propertyId,
    name: String(body.name || ""),
    phone: String(body.phone || ""),
    date: String(body.date || ""),
    time: String(body.time || ""),
    note: String(body.note || ""),
    mode: body.mode === "virtual" ? "virtual" : "site",
  });

  return NextResponse.json({ ok: true, item: doc });
}

