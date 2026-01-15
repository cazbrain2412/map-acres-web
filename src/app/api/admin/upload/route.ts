import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth/jwt";

export const runtime = "nodejs";

function safeExt(filename: string) {
  const ext = path.extname(filename || "").toLowerCase();
  if (!ext) return "";
  return ext.replace(/[^a-z0-9.]/g, "");
}

export async function POST(req: Request) {
  // ✅ admin only
  const cookieStore = await cookies();
const token = cookieStore.get("ma_admin_token")?.value || "";

  const payload = token ? verifyAdminToken(token) : null;
  if (!payload) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file uploaded" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = safeExt(file.name) || "";
  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, name), bytes);

  return NextResponse.json({ ok: true, url: `/uploads/${name}` });
}

