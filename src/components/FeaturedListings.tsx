import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui";

export default function FeaturedListings({
  title,
  items,
}: {
  title: string;
  items: {
    id: string;
    title: string;
    location: string;
    priceLabel: string;
    meta: string;
    imageUrl: string;
    badge?: string;
  }[];
}) {
  return (
    <Container className="py-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
        <Link className="text-sm font-semibold text-black/70 hover:text-black" href="/search">
          View all →
        </Link>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/property/${p.id}`}
            className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative h-44 w-full">
              <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 25vw" />
              {p.badge ? (
                <div className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                  {p.badge}
                </div>
              ) : null}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div className="text-sm font-extrabold text-white">{p.priceLabel}</div>
                <div className="text-xs font-semibold text-white/90">Details →</div>
              </div>
            </div>

            <div className="p-4">
              <div className="line-clamp-1 text-sm font-bold">{p.title}</div>
              <div className="mt-1 line-clamp-1 text-xs text-black/60">{p.location}</div>
              <div className="mt-2 line-clamp-2 text-xs text-black/70">{p.meta}</div>
              <div className="mt-3 text-xs font-semibold text-black/60 group-hover:text-black">
                Contact / Shortlist
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

