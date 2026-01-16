import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Property from "@/models/Property";
import slugify from "slugify";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth/jwt";

function asNumber(v: any, fallback = 0) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function toPlain<T>(v: T) {
  return JSON.parse(JSON.stringify(v));
}


export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json().catch(() => ({}));

  // ✅ auth
    const cookieStore = await cookies();
  const token = cookieStore.get("mapacres_token")?.value || "";
  const payload = token ? verifyAdminToken(token) : null;
  const createdBy = payload?.uid;

  if (!createdBy) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  // ✅ required fields (with safe defaults)
  const title = String(body.title || "").trim();
  if (!title) return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });

  const slug = String(body.slug || slugify(title, { lower: true, strict: true })).trim();

  const transaction = body.transaction === "rent" ? "rent" : "buy"; // default buy
  const category =
    body.category === "commercial" ? "commercial" : body.category === "plot" ? "plot" : "residential"; // default residential

  const type = String(body.type || "").trim() || "Apartment";

  const price = asNumber(body.price, 0);
  if (price <= 0) return NextResponse.json({ ok: false, error: "Price is required" }, { status: 400 });

  const area = asNumber(body.area, 0);
  if (area <= 0) return NextResponse.json({ ok: false, error: "Area is required" }, { status: 400 });

  const city = String(body.city || "").trim();
  if (!city) return NextResponse.json({ ok: false, error: "City is required" }, { status: 400 });

  const status = body.status || "draft";

  // ✅ create
  try {
    const doc = await Property.create({
      ...body,
      title,
      slug,
      transaction,
      category,
      type,
      price,
      area,
      city,
      createdBy,
      status,
    });

    return NextResponse.json({ ok: true, item: toPlain(doc) });

  } catch (e: any) {
    // duplicate slug error etc
    const msg =
      e?.code === 11000 ? "Slug already exists. Please change slug." : e?.message || "Failed to create property";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();

  // ✅ auth (admin only)
  const cookieStore = await cookies();
  const token = cookieStore.get("mapacres_token")?.value || "";
  const payload = token ? verifyAdminToken(token) : null;
  const adminId = payload?.uid;
  if (!adminId) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const items = await Property.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ ok: true, items: toPlain(items) });
}

