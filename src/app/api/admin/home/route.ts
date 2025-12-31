export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { readHome, writeHome } from "@/lib/homeStore";

export async function GET() {
  const data = await readHome();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  // basic validation
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  await writeHome(body);
  return NextResponse.json({ ok: true });
}

