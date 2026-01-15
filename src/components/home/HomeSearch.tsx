"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const tabs = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "new-launches", label: "New Launches" },
  { key: "commercial", label: "Commercial" },
  { key: "plots", label: "Plots/Land" },
  { key: "projects", label: "Projects" },
];

export default function HomeSearch() {
  const router = useRouter();
  const [tab, setTab] = useState("buy");
  const [q, setQ] = useState("");

  const voiceSupported = useMemo(() => {
    // @ts-ignore
    return typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  function doSearch() {
    const url = `/search?type=${encodeURIComponent(tab)}&q=${encodeURIComponent(q)}`;
    router.push(url);
  }

  function startVoice() {
    // @ts-ignore
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e: any) => {
      const text = e.results?.[0]?.[0]?.transcript || "";
      setQ(text);
      setTimeout(doSearch, 200);
    };

    rec.start();
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={[
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              tab === t.key
                ? "bg-white text-[#0B1220]"
                : "bg-white/10 text-white hover:bg-white/15",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search Row */}
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <div className="flex items-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
          <span className="mr-2 text-white/60">📍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter Locality / Project / Society / Landmark"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
          />
          {voiceSupported ? (
            <button
              onClick={startVoice}
              className="ml-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
              title="Voice search"
            >
              🎤
            </button>
          ) : null}
        </div>

        <button
          onClick={doSearch}
          className="rounded-2xl bg-[#225BA0] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Search
        </button>

        <a
          href={process.env.NEXT_PUBLIC_MAP_URL || "https://map.mapacres.com"}
          className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
        >
          Open Map
        </a>
      </div>

      {/* Nearby cities quick chips */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {["Jaipur", "Delhi", "Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai"].map((c) => (
          <button
            key={c}
            onClick={() => router.push(`/search?q=${encodeURIComponent(c)}`)}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white/85 hover:bg-white/15"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

