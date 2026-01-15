"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "new-launches", label: "New Launches" },
  { key: "commercial", label: "Commercial" },
  { key: "plots", label: "Plots/Land" },
  { key: "projects", label: "Projects" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [type, setType] = useState("buy");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (pathname?.startsWith("/rent")) setType("rent");
  }, [pathname]);

  function onSearch() {
    router.push(`/search?type=${encodeURIComponent(type)}&q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="sticky top-0 z-50 border-b border-[#E6EEFF] bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-extrabold tracking-tight">
            <span className="text-[#0B1220]">Map</span>
            <span className="text-[#225BA0]">Acres</span>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 items-center rounded-2xl border border-[#E6EEFF] bg-white px-2 shadow-sm">
          <select
            className="rounded-xl bg-transparent px-3 py-2 text-sm text-[#0B1220] outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {tabs.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>

          <div className="h-6 w-px bg-[#E6EEFF]" />

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter Locality / Project / Society / Landmark"
            className="flex-1 bg-transparent px-3 py-2 text-sm text-[#0B1220] outline-none placeholder:text-[#0B1220]/40"
          />

          <button
            onClick={onSearch}
            className="rounded-xl bg-[#225BA0] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Search
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/post-property"
            className="hidden sm:inline-flex rounded-xl border border-[#E6EEFF] bg-white px-4 py-2 text-sm font-semibold text-[#0B1220] hover:bg-[#F3F7FF]"
          >
            Post Property
          </Link>

          <Link href="/login" className="rounded-xl px-3 py-2 text-sm text-[#0B1220]/70 hover:text-[#0B1220]">
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-[#225BA0] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="mx-auto max-w-7xl px-4 pb-3 md:hidden">
        <div className="rounded-2xl border border-[#E6EEFF] bg-white p-2 shadow-sm">
          <div className="flex gap-2">
            <select
              className="w-44 rounded-xl bg-transparent px-3 py-2 text-sm text-[#0B1220] outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {tabs.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>

            <button
              onClick={onSearch}
              className="ml-auto rounded-xl bg-[#225BA0] px-4 py-2 text-sm font-semibold text-white"
            >
              Search
            </button>
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Locality / Project / Landmark"
            className="mt-2 w-full rounded-xl border border-[#E6EEFF] bg-white px-3 py-2 text-sm text-[#0B1220] outline-none placeholder:text-[#0B1220]/40"
          />
        </div>
      </div>
    </div>
  );
}
	
