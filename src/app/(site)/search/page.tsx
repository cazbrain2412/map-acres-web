import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dbConnect from "@/lib/db/mongoose";
import Property from "@/models/Property";
import PropertyCard from "@/components/listings/PropertyCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  await dbConnect();

  const type = String(searchParams.type || "");
  const q = String(searchParams.q || "").trim();
  const city = String(searchParams.city || "").trim();
  const category = String(searchParams.category || "").trim();
  const transaction = type === "rent" ? "rent" : type === "buy" ? "buy" : undefined;

  const filter: any = { status: "approved" };
  if (transaction) filter.transaction = transaction;
  if (category && ["residential", "commercial", "plot"].includes(category)) filter.category = category;
  if (city) filter.city = new RegExp(`^${city}$`, "i");

  if (q) {
    filter.$or = [
      { title: new RegExp(q, "i") },
      { locality: new RegExp(q, "i") },
      { city: new RegExp(q, "i") },
      { type: new RegExp(q, "i") },
    ];
  }

  const items = await Property.find(filter).sort({ featured: -1, createdAt: -1 }).limit(48).lean();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs text-white/50">SEARCH RESULTS</div>
            <h1 className="mt-2 text-3xl font-bold">Properties</h1>
            <div className="mt-2 text-sm text-white/60">
              {items.length} results {q ? `for “${q}”` : ""}
            </div>
          </div>

          <div className="text-sm text-white/60">
            Tip: Use the header search to refine results.
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p: any) => (
            <PropertyCard key={String(p._id)} p={p} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
            No properties found. Try a different locality/city or category.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

