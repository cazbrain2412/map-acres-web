"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Button } from "./ui";
import { MapPin, Search } from "lucide-react";

type Tab = { key: string; label: string };
type QuickFilter = { label: string; value: string };

export default function HeroSearch({
  headline,
  subheadline,
  tabs,
  quickFilters,
}: {
  headline: string;
  subheadline: string;
  tabs: Tab[];
  quickFilters: QuickFilter[];
}) {
  const router = useRouter();
  const [active, setActive] = useState<string>(tabs[0]?.key ?? "buy");
  const [q, setQ] = useState("");
  const [propertyType, setPropertyType] = useState<string>("");

  const placeholder = useMemo(() => {
    if (active === "rent") return "Search locality, landmark, society…";
    if (active === "commercial") return "Search office, shop, warehouse…";
    if (active === "new") return "Search projects, builders, areas…";
    return "Search city, locality, pin code…";
  }, [active]);

  function submit() {
    const params = new URLSearchParams();
    params.set("type", active);
    if (q.trim()) params.set("q", q.trim());
    if (propertyType) params.set("pt", propertyType);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/5 via-white to-white" />
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{headline}</h1>
            <p className="mt-3 max-w-xl text-base text-black/70 sm:text-lg">{subheadline}</p>

            <div className="mt-7 rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActive(t.key)}
                    className={[
                      "rounded-xl px-4 py-2 text-sm font-semibold transition",
                      active === t.key ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10",
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-3">
                  <MapPin className="h-5 w-5 text-black/50" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={(e) => (e.key === "Enter" ? submit() : null)}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm"
                >
                  <option value="">Property type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">House/Villa</option>
                  <option value="plot">Plot/Land</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                </select>

                <Button onClick={submit} className="h-12 gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {quickFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setPropertyType(f.value)}
                    className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-semibold text-black/70 hover:bg-black/10"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 text-xs text-black/50">
              Tip: this UI is CMS-ready — later you’ll load tabs/filters/cities/listings from your admin panel.
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent" />
              <div className="p-6 sm:p-8">
                <div className="text-sm font-semibold text-black/70">Discover by intent</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "Buy verified listings", d: "Compare prices, amenities, locality insights" },
                    { t: "Rent without hassle", d: "Shortlist rentals, schedule visits" },
                    { t: "New projects", d: "Launches, offers, builder reputation" },
                    { t: "Commercial", d: "Office, shops, showrooms in prime areas" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-black/10 bg-white p-4">
                      <div className="text-sm font-bold">{x.t}</div>
                      <div className="mt-1 text-xs text-black/60">{x.d}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-black p-4 text-white">
                  <div className="text-sm font-bold">Post your property for free</div>
                  <div className="mt-1 text-xs text-white/80">
                    Get leads faster with featured boosts & verified badge (CMS will control this later).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

