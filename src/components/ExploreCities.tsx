import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui";

export default function ExploreCities({
  title,
  items,
}: {
  title: string;
  items: { name: string; listingsLabel: string; imageUrl: string }[];
}) {
  return (
    <Container className="py-10">
      <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => (
          <Link
            key={c.name}
            href={`/search?city=${encodeURIComponent(c.name)}`}
            className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
          >
            <div className="relative h-36">
              <Image src={c.imageUrl} alt={c.name} fill className="object-cover transition group-hover:scale-[1.03]" sizes="(max-width:1024px) 100vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-base font-extrabold text-white">{c.name}</div>
                <div className="text-xs font-semibold text-white/85">{c.listingsLabel}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

