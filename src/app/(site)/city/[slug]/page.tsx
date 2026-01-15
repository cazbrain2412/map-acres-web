export const dynamic = "force-dynamic";
export const revalidate = 0;

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dbConnect from "@/lib/db/mongoose";
import Property from "@/models/Property";
import City from "@/models/City";
import PropertyCard from "@/components/listings/PropertyCard";

function slugToCityName(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  await dbConnect();

  const cityDoc = await City.findOne({ slug: params.slug }).lean();
  const cityName = cityDoc?.name || slugToCityName(params.slug);

  const items = await Property.find({
    status: "approved",
    city: new RegExp(`^${cityName}$`, "i"),
  })
    .sort({ featured: -1, createdAt: -1 })
    .limit(48)
    .lean();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="text-xs text-white/50">CITY</div>
          <h1 className="mt-2 text-3xl font-bold">{cityName}</h1>
          <p className="mt-2 text-white/60">
            Browse verified listings, plots, commercial and projects in {cityName}.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p: any) => (
            <PropertyCard key={String(p._id)} p={p} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
            No approved listings found in {cityName} yet.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

