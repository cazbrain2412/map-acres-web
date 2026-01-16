"use client";

import { useEffect, useMemo, useState } from "react";

type T = { name: string; role: string; text: string; rating: string };

export default function TestimonialsSlider() {
  const items: T[] = useMemo(
    () => [
      {
        name: "Rajesh Sharma",
        role: "Home Buyer, Jaipur",
        text: "The map feature helped me understand the exact location and neighborhood. I could see schools and hospitals nearby before visiting. Saved so much time!",
        rating: "5/5 ⭐",
      },
      {
        name: "Priya Developers",
        role: "Developer, Pune",
        text: "Listing our project with plot boundaries and 360° tours increased our lead quality by 3x. Buyers come more prepared and serious.",
        rating: "5/5 ⭐",
      },
      {
        name: "Amit Gupta",
        role: "Real Estate Broker",
        text: "My clients love the visual property links I share. They can explore properties from home and only visit when they're genuinely interested.",
        rating: "5/5 ⭐",
      },
      {
        name: "Sunita Reddy",
        role: "Land Investor, Hyderabad",
        text: "For land investment, seeing exact boundaries on satellite map is crucial. MapAcres made my purchase decision much more confident.",
        rating: "5/5 ⭐",
      },
    ],
    []
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section className="border-t border-[#E6EEFF] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0B1220]">What Users Say</h2>
            <p className="mt-2 text-sm text-[#0B1220]/65">
              Better leads. Faster decisions. Real visibility before site visit.
            </p>
          </div>

          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
              className="rounded-2xl border border-[#E6EEFF] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#F6F9FF]"
              type="button"
            >
              ← Prev
            </button>
            <button
              onClick={() => setI((v) => (v + 1) % items.length)}
              className="rounded-2xl border border-[#E6EEFF] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#F6F9FF]"
              type="button"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[items[i], items[(i + 1) % items.length]].map((t, idx) => (
            <div key={idx} className="rounded-3xl border border-[#E6EEFF] bg-white p-7 shadow-sm">
              <div className="text-sm font-bold text-[#0B1220]">{t.name}</div>
              <div className="mt-1 text-xs text-[#225BA0] font-semibold">{t.role}</div>
              <p className="mt-4 text-sm leading-6 text-[#0B1220]/70">“{t.text}”</p>
              <div className="mt-5 text-sm font-semibold text-[#0B1220]">{t.rating}</div>
            </div>
          ))}
        </div>

        {/* Video testimonials placeholder (you said later we will add sliding video) */}
        <div className="mt-6 rounded-3xl border border-[#E6EEFF] bg-[#F6F9FF] p-6 text-sm text-[#0B1220]/70">
          Video testimonials slider: we will plug this in next (mp4 or YouTube shorts).
        </div>
      </div>
    </section>
  );
}

