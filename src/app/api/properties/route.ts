import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSession } from "@/lib/auth/session";
import slugify from "slugify";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status") || "approved";
  const transaction = searchParams.get("transaction");
  const category = searchParams.get("category");
  const city = searchParams.get("city");
  const featured = searchParams.get("featured");

  const filter: any = { status };
  if (transaction) filter.transaction = transaction;
  if (category) filter.category = category;
  if (city) filter.city = new RegExp(`^${city}$`, "i");
  if (featured === "true") filter.featured = true;

  const items = await Property.find(filter).sort({ featured: -1, createdAt: -1 }).limit(48).lean();
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  await dbConnect();
const session = await getSession();
  
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const user = await User.findById(session.uid);

  if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const title = String(body.title || "").trim();
  const transaction = body.transaction === "rent" ? "rent" : "buy";
  const category = ["residential", "commercial", "plot"].includes(body.category) ? body.category : "residential";
  const type = String(body.type || "").trim();
  const city = String(body.city || "").trim();
  const locality = String(body.locality || "").trim();

  const price = Number(body.price || 0);
  const area = Number(body.area || 0);

  if (!title || !type || !city || price <= 0 || area <= 0) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const baseSlug = slugify(`${title}-${city}-${Date.now()}`, { lower: true, strict: true });
  const created = await Property.create({
    status: "pending",
    transaction,
    category,
    type,
    title,
    slug: baseSlug,
    description: String(body.description || ""),
    price,
    area,
    beds: body.beds ?? null,
    baths: body.baths ?? null,
    city,
    locality,
    address: String(body.address || ""),
    lat: body.lat ?? null,
    lng: body.lng ?? null,
    amenities: Array.isArray(body.amenities) ? body.amenities : [],
    images: Array.isArray(body.images) ? body.images : [],
    videoUrl: String(body.videoUrl || ""),
    tour360Url: String(body.tour360Url || ""),
    floorPlans: Array.isArray(body.floorPlans) ? body.floorPlans : [],
    featured: false,
    createdBy: user._id,
  });

  return NextResponse.json({ ok: true, id: created._id, slug: created.slug });
}

