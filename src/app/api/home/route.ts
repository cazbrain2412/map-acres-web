import { NextResponse } from "next/server";
import { homeData } from "@/lib/homeData";

export const runtime = "nodejs";

export async function GET() {
  const data = await readHome();
  return NextResponse.json(data);
}

