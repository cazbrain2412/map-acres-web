"use client";

import { useEffect, useMemo, useState } from "react";
import HomeSearch from "./HomeSearch";

type Slide = {
  title: string;
  subtitle: string;
  video: string; // /videos/hero-1.mp4
  poster?: string; // /images/hero-1.jpg
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
};

export default function HeroSlider() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Discover Property Across India.",
        subtitle: "Premium listings, projects, new launches & plotted land — with Map plotting + 360° viewing.",
        video: "/videos/hero-1.mp4",
        poster: "/images/hero-1.jpg",
        cta1Label: "Open Map Plotting",
        cta1Href: process.env.NEXT_PUBLIC_MAP_URL || "https://map.mapacres.com",
        cta2Label: "Browse Properties",
        cta2Href: "/search",
      },
      {
        title: "Plots / Land on Satellite Map.",
        subtitle: "CAD-style plotting directly on satellite — analyze boundaries, roads & development around.",
        video: "/videos/hero-2.mp4",
        poster: "/images/hero-2.jpg",
        cta1Label: "Explore Plots/Land",
        cta1Href: "/search?category=plot",
        cta2Label: "Post Property",
        cta2Href: "/post-property",
      },
      {
        title: "Projects & New Launches.",
        subtitle: "Launch inventory, compare amenities, pricing, floor plans — faster decisions with verified info.",
        video: "/videos/hero-3.mp4",
        poster: "/images/hero-3.jpg",
        cta1Label: "New Launches",
        cta1Href: "/search?type=new-launches",
        cta2Label: "Projects",
        cta2Href: "/search?type=projects",
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
    <section className="relative overflow-hidden">
      {/* Video layer */}
      <div className="relative h-[560px] w-full md:h-[620px]">
        <video
          key={s.video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={s.poster}
          onLoadedData={(e) => {
            e.currentTarget.play().catch(() => {});
          }}
        >
          <source src={s.video} type="video/mp4" />
        </video>

        {/* Premium blue overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,90,168,0.33),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061023]/55 via-[#061023]/40 to-[#061023]/70" />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 pt-20 md:pt-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
              MapAcres • All India • Owner + Agent
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-6xl">{s.title}</h1>
            <p className="mt-4 text-base text-white/75 md:text-lg">{s.subtitle}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={s.cta1Href}
                className="rounded-2xl bg-[#225BA0] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                {s.cta1Label}
              </a>
              <a
                href={s.cta2Href}
                className="rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                {s.cta2Label}
              </a>
            </div>
          </div>

          {/* Search box like 99acres (inside banner) */}
          <div className="mt-10">
            <HomeSearch />
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={["h-2 rounded-full transition-all", idx === i ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"].join(" ")}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur hover:bg-white/15 md:inline-flex"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => setI((v) => (v + 1) % slides.length)}
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur hover:bg-white/15 md:inline-flex"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
