import Link from "next/link";

export default function PropertyCard({ p }: { p: any }) {
  const img = p.coverImage || p.gallery?.[0] || "";

  const price =
    typeof p.price === "number" ? p.price.toLocaleString("en-IN") : p.price;

  return (
    <Link
      href={`/property/${p.slug}`}
      className="group overflow-hidden rounded-3xl border border-[#E6EEFF] bg-white shadow-sm hover:shadow-md transition"
    >
      <div className="relative aspect-[16/10] bg-[#F6F9FF]">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={p.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#0B1220]/50">
            No image uploaded
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#0B1220] shadow-sm">
            {String(p.transaction || "buy").toUpperCase()}
          </span>

          <span className="rounded-full bg-[#225BA0] px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {String(p.category || "residential").toUpperCase()}
          </span>

          {p.featured ? (
            <span className="rounded-full bg-[#0B1220]/85 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              PREMIUM
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <div className="text-lg font-extrabold text-[#0B1220] line-clamp-1">
          {p.title}
        </div>

        <div className="mt-1 text-sm text-[#0B1220]/60 line-clamp-1">
          {p.locality ? `${p.locality}, ` : ""}
          {p.city}
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-xs text-[#0B1220]/55">Price</div>
            <div className="text-lg font-extrabold text-[#0B1220]">
              ₹ {price}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-[#0B1220]/55">Area</div>
            <div className="text-sm font-bold text-[#0B1220]">{p.area} sqft</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

