import { Container, A } from "./ui";

export default function Footer({
  columns,
  note,
}: {
  columns: { title: string; links: { label: string; href: string }[] }[];
  note: string;
}) {
  return (
    <footer className="border-t border-black/10 bg-white">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-base font-extrabold">Realty</div>
            <div className="mt-2 text-sm text-black/60">
              Zillow/99acres-style UX, built in Next.js — CMS ready.
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-extrabold">{c.title}</div>
              <div className="mt-3 flex flex-col gap-2">
                {c.links.map((l) => (
                  <A key={l.href} href={l.href}>
                    {l.label}
                  </A>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-black/10 pt-6 text-xs text-black/60">{note}</div>
      </Container>
    </footer>
  );
}

