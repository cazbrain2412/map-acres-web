import Link from "next/link";

const tiles = [
  { title: "Buy", desc: "Homes, flats, villas, land", href: "/search?type=buy" },
  { title: "Rent", desc: "Rental homes & commercial", href: "/search?type=rent" },
  { title: "New Launches", desc: "Latest projects & inventory", href: "/search?type=new-launches" },
  { title: "Projects", desc: "Verified builders & developers", href: "/search?type=projects" },
  { title: "Plots / Land", desc: "Plot on satellite map", href: "/search?category=plot" },
  { title: "Commercial", desc: "Office, retail, warehouses", href: "/search?category=commercial" },
];

export default function CategoryTiles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="text-xs font-semibold tracking-widest text-[#225BA0]">EXPLORE</div>
      <h2 className="mt-2 text-3xl font-extrabold text-[#0B1220]">Find your next property faster</h2>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="group rounded-3xl border border-[#E6EEFF] bg-white p-6 shadow-sm hover:shadow-md"
          >
            <div className="text-xl font-bold">{t.title}</div>
            <div className="mt-1 text-sm text-[#0B1220]/60">{t.desc}</div>
            <div className="mt-6 h-1 w-10 rounded-full bg-[#225BA0] opacity-80 transition-all group-hover:w-16" />
          </Link>
        ))}
      </div>
    </section>
  );
}

