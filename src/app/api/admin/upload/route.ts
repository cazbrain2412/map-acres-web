import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth/jwt";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // ✅ admin only
  const cookieStore = await cookies();
  const token =
    cookieStore.get("ma_admin_token")?.value ||
    cookieStore.get("mapacres_token")?.value ||
    "";

  const payload = token ? verifyAdminToken(token) : null;
  if (!payload) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file uploaded" }, { status: 400 });
  }

  // ✅ Vercel Blob token can be either name (you added Blob_READ_WRITE_TOKEN)
  const blobToken =
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.Blob_READ_WRITE_TOKEN ||
    "";

  if (!blobToken) {
    return NextResponse.json(
      { ok: false, error: "Missing Blob token (BLOB_READ_WRITE_TOKEN / Blob_READ_WRITE_TOKEN)" },
      { status: 500 }
    );
  }

  // upload to blob
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const safeExt = ext ? `.${ext.replace(/[^a-z0-9]/g, "")}` : "";
  const filename = `mapacres/${Date.now()}-${Math.random().toString(16).slice(2)}${safeExt}`;

  const blob = await put(filename, file, {
    access: "public",
    token: blobToken,
    addRandomSuffix: false,
  });

  return NextResponse.json({ ok: true, url: blob.url });
}

