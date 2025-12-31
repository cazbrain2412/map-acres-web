import Link from "next/link";
import { Container } from "./ui";

export default function NewProjects({
  title,
  items,
}: {
  title: string;
  items: { id: string; name: string; city: string; fromPriceLabel: string; meta: string }[];
}) {
  return (
    <Container className="py-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
        <Link className="text-sm font-semibold text-black/70 hover:text-black" href="/search?type=new">
          Explore projects →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {items.map((x) => (
          <Link
            key={x.id}
            href={`/project/${x.id}`}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-sm font-extrabold">{x.name}</div>
            <div className="mt-1 text-xs text-black/60">{x.city}</div>
            <div className="mt-3 text-sm font-bold">{x.fromPriceLabel}</div>
            <div className="mt-2 text-xs text-black/70">{x.meta}</div>
            <div className="mt-4 text-xs font-semibold text-black/60 hover:text-black">View details →</div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

