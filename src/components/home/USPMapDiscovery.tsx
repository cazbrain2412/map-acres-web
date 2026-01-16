import Link from "next/link";

const PHONE = "+919636306310";
const WHATSAPP = "https://wa.me/919636306310?text=" + encodeURIComponent("Hi MapAcres, I want to know more about Map Plotting + Verified Properties.");

export default function USPMapDiscovery() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left: content */}
          <div>
            <div className="inline-flex items-center rounded-full border border-[#E6EEFF] bg-[#F6F9FF] px-3 py-1 text-xs font-semibold text-[#225BA0]">
              Core USP • Map-Based Plotting + Verification
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-[#0B1220] md:text-4xl">
              Live Property on Map — See Exact Location, Boundaries & Neighborhood
            </h2>

            <p className="mt-3 text-base text-[#0B1220]/70">
              MapAcres is not a generic aggregator. We let buyers and developers visualize plots and boundaries on a satellite map,
              share a link, and help customers understand everything before visiting.
            </p>

            <div className="mt-6 grid gap-3">
              <Feature title="Map Plotting (CAD-style on satellite)" desc="Plot boundaries, roads, nearby development — all on-map." />
              <Feature title="360° View + Floor Plans" desc="Walk inside the property online and compare layouts easily." />
              <Feature title="3D Try-On (Interiors / Rooms)" desc="Preview rooms, finishes, colors, and layouts in 3D." />
              <Feature title="Trusted & Verified Listings" desc="RERA / government docs, verified developer/agent, market value & more." />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={process.env.NEXT_PUBLIC_MAP_URL || "https://map.mapacres.com"}
                className="rounded-2xl bg-[#225BA0] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Open Map Plotting
              </a>
              <a
                href={WHATSAPP}
                className="rounded-2xl border border-[#E6EEFF] bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] hover:bg-[#F6F9FF]"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${PHONE}`}
                className="rounded-2xl border border-[#E6EEFF] bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] hover:bg-[#F6F9FF]"
              >
                Call Now
              </a>
              <Link
                href="/how-it-works"
                className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Right: image */}
          <div className="rounded-3xl border border-[#E6EEFF] bg-[#F6F9FF] p-3 shadow-sm">
            {/* Put your screenshot here: public/images/usp-map.jpg (or .png) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/usp-map.jpg"
              alt="Map-based plotting preview"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="mt-3 rounded-2xl bg-white p-4 text-sm text-[#0B1220]/70">
              Tip: Save your screenshot as <b>public/images/usp-map.jpg</b> so this section shows your real USP visually.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-[#E6EEFF] bg-white p-5 shadow-sm">
      <div className="text-sm font-bold text-[#0B1220]">{title}</div>
      <div className="mt-1 text-sm text-[#0B1220]/65">{desc}</div>
    </div>
  );
}

