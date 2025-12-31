export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { readHome } from "@/lib/homeStore";

export async function GET() {
  const data = await readHome();
  return NextResponse.json(data);
}

