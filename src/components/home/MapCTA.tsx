export default function MapCTA() {
  const mapUrl = process.env.NEXT_PUBLIC_MAP_URL || "https://map.mapacres.com";

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl bg-[#225BA0] p-10 text-white shadow-[0_20px_70px_rgba(34,91,160,0.30)]">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-widest text-white/80">UNIQUE</div>
          <h2 className="mt-2 text-4xl font-extrabold">Map Plotting on Satellite View</h2>
          <p className="mt-3 text-white/85">
            Convert CAD-style layouts into interactive map plots. Analyze roads, surroundings, and parcel boundaries.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={mapUrl}
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] hover:opacity-90"
            >
              Open Map
            </a>
            <a
              href="/search?category=plot"
              className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              Explore Plots/Land
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

