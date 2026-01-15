export const dynamic = "force-dynamic";
export const revalidate = 0;

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import dbConnect from "@/lib/db/mongoose";
import Property from "@/models/Property";
import City from "@/models/City";
import PropertyCard from "@/components/listings/PropertyCard";
import Link from "next/link";
import PropertyRow from "@/components/home/PropertyRow";


export default async function HomePage() {
  await dbConnect();

  // Featured properties (approved)
  const featured = await Property.find({ status: "approved" })
    .sort({ featured: -1, createdAt: -1 })
    .limit(9)
    .lean();


  // Home sliders data
  const latest = await Property.find({ status: "approved" })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  const plots = await Property.find({ status: "approved", category: "plot" })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  const commercial = await Property.find({ status: "approved", category: "commercial" })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  // NOTE: these depend on your "type" field values. Adjust if needed.
  const newLaunches = await Property.find({ status: "approved", type: /launch/i })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  const projects = await Property.find({ status: "approved", type: /project/i })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();







  // Cities (if you have City model filled; otherwise fallback)
  const cities = await City.find({})
    .sort({ createdAt: -1 })
    .limit(12)
    .lean()
    .catch(() => []);

  const fallbackCities = [
    { name: "Delhi / NCR", slug: "delhi-ncr" },
    { name: "Mumbai", slug: "mumbai" },
    { name: "Bangalore", slug: "bangalore" },
    { name: "Pune", slug: "pune" },
    { name: "Hyderabad", slug: "hyderabad" },
    { name: "Chennai", slug: "chennai" },
    { name: "Ahmedabad", slug: "ahmedabad" },
    { name: "Jaipur", slug: "jaipur" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B1220]">
      <Header />

      {/* 99acres-style top video slider */}
      <HeroSlider />

      {/* Nearby Cities (same concept as 99acres) */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#225BA0]">TOP CITIES</div>
            <h2 className="mt-2 text-3xl font-extrabold">Explore Real Estate in Popular Indian Cities</h2>
          </div>
          <Link href="/search" className="text-sm font-semibold text-[#225BA0] hover:opacity-80">
            View all →
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-4">
          {(cities?.length ? cities : fallbackCities).map((c: any) => (
            <Link
              key={c.slug}
              href={`/city/${c.slug}`}
              className="group rounded-3xl border border-[#E6EEFF] bg-white p-5 shadow-sm hover:shadow-md"
            >
              <div className="text-lg font-bold">{c.name}</div>
              <div className="mt-1 text-sm text-[#0B1220]/60">Explore properties</div>
              <div className="mt-6 h-1 w-10 rounded-full bg-[#225BA0] opacity-80 transition-all group-hover:w-16" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured properties */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#225BA0]">FEATURED</div>
            <h2 className="mt-2 text-3xl font-extrabold">Premium listings picked for you</h2>
          </div>
          <Link href="/search" className="text-sm font-semibold text-[#225BA0] hover:opacity-80">
            Browse all →
          </Link>
        </div>

        {featured.length ? (
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p: any) => (
              <PropertyCard key={String(p._id)} p={p} />
            ))}
          </div>
        
        ) : (
          <div className="mt-7 rounded-3xl border border-[#E6EEFF] bg-[#F6F9FF] p-8">
            <div className="text-lg font-bold">No approved properties yet</div>
            <div className="mt-1 text-sm text-[#0B1220]/60">
              Post your first property to start seeing listings here.
            </div>

            <div className="mt-5 flex gap-3">
              <Link
                href="/post-property"
                className="rounded-2xl bg-[#225BA0] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Post Property
              </Link>

              <Link
                href="/search"
                className="rounded-2xl border border-[#E6EEFF] bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] hover:bg-[#F3F7FF]"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        )}

             </section>


      {/* Homepage sliders like Zillow/99acres */}
      <PropertyRow title="Showcase Properties" subtitle="SHOWCASE" items={featured} viewAllHref="/search" />
      <PropertyRow title="Latest Properties" subtitle="TRENDING" items={latest} viewAllHref="/search" />
      <PropertyRow title="New Launches" subtitle="NEW LAUNCHES" items={newLaunches} viewAllHref="/search?type=new-launches" />
      <PropertyRow title="Projects" subtitle="PROJECTS" items={projects} viewAllHref="/search?type=projects" />
      <PropertyRow title="Plots / Land" subtitle="PLOTS/LAND" items={plots} viewAllHref="/search?category=plot" />
      <PropertyRow title="Commercial" subtitle="COMMERCIAL" items={commercial} viewAllHref="/search?category=commercial" />
      <CategoryTiles />
      <HowItWorks />
      <MapCTA />



      <Footer />
    </div>
  );
}

