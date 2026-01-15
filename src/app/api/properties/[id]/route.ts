import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Property from "@/models/Property";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;

  const item = await Property.findById(id).lean();
  if (!item) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, item });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;

  const update = await req.json().catch(() => ({}));
  const item = await Property.findByIdAndUpdate(id, { $set: update }, { new: true }).lean();

  if (!item) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, item });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;

  await Property.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}

