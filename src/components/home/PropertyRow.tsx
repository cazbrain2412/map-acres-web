"use client";

import { useRef } from "react";
import PropertyCard from "@/components/listings/PropertyCard";

export default function PropertyRow({
  title,
  subtitle,
  items,
  viewAllHref,
}: {
  title: string;
  subtitle?: string;
  items: any[];
  viewAllHref?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // ✅ Empty state (show section even when no properties)
  if (!items || items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#225BA0]">
              {subtitle || "SHOWCASE"}
            </div>
            <h2 className="mt-2 text-3xl font-extrabold text-[#0B1220]">{title}</h2>
            <p className="mt-2 text-sm text-[#0B1220]/60">
              Add properties from Admin panel to show listings here.
            </p>
          </div>

          {viewAllHref ? (
            <a href={viewAllHref} className="text-sm font-semibold text-[#225BA0] hover:opacity-80">
              View all →
            </a>
          ) : null}
        </div>

        {/* Skeleton cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((k) => (
            <div
              key={k}
              className="h-[240px] rounded-3xl border border-[#E6EEFF] bg-[#F6F9FF] p-5"
            >
              <div className="h-28 w-full rounded-2xl bg-[#E6EEFF]" />
              <div className="mt-4 h-4 w-2/3 rounded bg-[#E6EEFF]" />
              <div className="mt-2 h-3 w-1/2 rounded bg-[#E6EEFF]" />
              <div className="mt-6 h-10 w-40 rounded-2xl bg-[#225BA0]" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ✅ Normal slider state
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-widest text-[#225BA0]">
            {subtitle || "SHOWCASE"}
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-[#0B1220]">{title}</h2>
        </div>

        <div className="flex items-center gap-2">
          {viewAllHref ? (
            <a href={viewAllHref} className="mr-2 text-sm font-semibold text-[#225BA0] hover:opacity-80">
              View all →
            </a>
          ) : null}

          <button
            onClick={() => scrollBy(-1)}
            className="rounded-full border border-[#E6EEFF] bg-white p-2 shadow-sm hover:bg-[#F3F7FF]"
            aria-label="Previous"
            type="button"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="rounded-full border border-[#E6EEFF] bg-white p-2 shadow-sm hover:bg-[#F3F7FF]"
            aria-label="Next"
            type="button"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-6 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p: any) => (
          <div
            key={String(p._id)}
            className="min-w-[320px] max-w-[320px] sm:min-w-[360px] sm:max-w-[360px]"
          >
            <PropertyCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

