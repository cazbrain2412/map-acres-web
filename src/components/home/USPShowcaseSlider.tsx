"use client";

import { useEffect, useMemo, useState } from "react";

type Slide = {
  kicker: string;
  title: string;
  points: string[];
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
};

export default function USPShowcaseSlider() {
  const slides: Slide[] = useMemo(
    () => [
      {
        kicker: "MapAcres USP",
        title: "Live Property on Map — Plot Boundaries like CAD on Satellite",
        points: [
          "Plot boundaries, roads, nearby development — all on-map",
          "Share a visual map-link with buyers instantly",
          "No CAD files needed for presentations",
        ],
        cta1: { label: "Open Map Plotting", href: process.env.NEXT_PUBLIC_MAP_URL || "https://map.mapacres.com" },
        cta2: { label: "How It Works", href: "#how-it-works" },
      },
      {
        kicker: "Immersive Viewing",
        title: "360° Tours + Floor Plans — Walk Inside Before You Visit",
        points: [
          "360° viewing for projects & homes",
          "Floor plans + upcoming 3D floor plan experience",
          "Better decisions, fewer wasted site visits",
        ],
        cta1: { label: "WhatsApp Us", href: "https://wa.me/919636306310" },
        cta2: { label: "Call Now", href: "tel:+919636306310" },
      },
      {
        kicker: "Verified & Trusted",
        title: "RERA / Documents / Developer Verified — Trust First",
        points: [
          "Verified builder/developer/agent listings",
          "Market value guidance + document checks",
          "Trusted transactions and transparency",
        ],
        cta1: { label: "Browse Verified", href: "/search" },
        cta2: { label: "Contact Us", href: "/contact" },
      },
    ],
    []
  );

  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[i];

  return (
    <section className="relative mx-auto mt-10 max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-3xl border border-[#0B1220]/10 bg-gradient-to-b from-white to-[#F6F9FF] p-6 md:p-10">
        <div className="inline-flex items-center rounded-full bg-[#0B1220]/5 px-3 py-1 text-xs font-semibold text-[#0B1220]/70">
          {s.kicker}
        </div>

        <div className="mt-4 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0B1220] md:text-3xl">{s.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#0B1220]/70">
              {s.points.map((p, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-[2px] inline-block h-5 w-5 rounded-full bg-[#225BA0]/10 text-center text-xs leading-5 text-[#225BA0]">
                    ✓
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={s.cta1.href}
                className="rounded-2xl bg-[#225BA0] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                {s.cta1.label}
              </a>
              <a
                href={s.cta2.href}
                className="rounded-2xl border border-[#0B1220]/15 bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] hover:bg-[#0B1220]/5"
              >
                {s.cta2.label}
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl bg-[radial-gradient(circle_at_top,#1E5AA822,transparent_55%)] p-6">
            <div className="rounded-2xl border border-[#0B1220]/10 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-[#0B1220]">Preview</div>
              <div className="mt-2 text-xs text-[#0B1220]/70">
                (We will place your CAD-map screenshot / 360 screenshot here later as an image.)
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={[
                    "h-2 rounded-full transition-all",
                    idx === i ? "w-8 bg-[#225BA0]" : "w-2 bg-[#0B1220]/20 hover:bg-[#0B1220]/35",
                  ].join(" ")}
                  aria-label={`Showcase ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

