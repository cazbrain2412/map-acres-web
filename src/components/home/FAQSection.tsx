"use client";

import { useState } from "react";

const FAQ = [
  {
    q: "How is MapAcres different from other property websites?",
    a: "MapAcres is map-first. You can see exact location, plot boundaries, nearby places, and explore 360°/floor plans before visiting.",
  },
  {
    q: "What does Verified / Trusted listing mean?",
    a: "Verified listings can include RERA/government documents, verified developer/agent identity, and quality checks like market value guidance.",
  },
  {
    q: "Can developers plot projects without CAD tools?",
    a: "Yes. The goal is CAD-style plotting directly on satellite map. Developers can mark boundaries and share a link to customers.",
  },
  {
    q: "Do you support 360° tours and floor plans?",
    a: "Yes. Properties can include 360° tour links, videos, floor plans, and later a 3D floor plan/try-on experience.",
  },
  {
    q: "How do I contact MapAcres quickly?",
    a: "Use Call or WhatsApp CTA from homepage sections, or enquire directly on property detail page.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-[#E6EEFF] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-3xl font-extrabold text-[#0B1220]">FAQs</h2>
        <p className="mt-2 text-sm text-[#0B1220]/65">Quick answers about MapAcres features and verification.</p>

        <div className="mt-6 grid gap-3">
          {FAQ.map((x, idx) => (
            <div key={x.q} className="rounded-3xl border border-[#E6EEFF] bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setOpen(open === idx ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <h3 className="text-base font-bold text-[#0B1220]">{x.q}</h3>
                <span className="text-[#225BA0] text-xl font-black">{open === idx ? "–" : "+"}</span>
              </button>
              {open === idx && (
                <div className="px-6 pb-6 text-sm leading-6 text-[#0B1220]/70">{x.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

