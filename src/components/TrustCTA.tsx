import { Container, Button } from "./ui";
import Link from "next/link";

export default function TrustCTA({
  stats,
  ctaPrimary,
  ctaSecondary,
}: {
  stats: { label: string; value: string }[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}) {
  return (
    <Container className="py-12">
      <div className="overflow-hidden rounded-3xl border border-black/10 bg-black text-white shadow-sm">
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              A modern real-estate platform, built for scale
            </div>
            <div className="mt-2 max-w-2xl text-sm text-white/80">
              Today: homepage UI. Next: CMS-driven pages, listing management, SEO, leads, payments, and agent dashboards.
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/10 p-4">
                  <div className="text-xl font-extrabold">{s.value}</div>
                  <div className="mt-1 text-xs font-semibold text-white/80">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-5 text-black">
              <div className="text-sm font-extrabold">Get started</div>
              <div className="mt-1 text-xs text-black/70">
                Push this homepage live today, then connect CMS APIs in the same structure.
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={ctaPrimary.href}>
                  <Button>{ctaPrimary.label}</Button>
                </Link>
                <Link href={ctaSecondary.href}>
                  <Button variant="secondary">{ctaSecondary.label}</Button>
                </Link>
              </div>

              <div className="mt-3 text-xs text-black/50">
                Later: replace <code className="rounded bg-black/5 px-1 py-0.5">/api/home</code> with your CMS endpoints.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

