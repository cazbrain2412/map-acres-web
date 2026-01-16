export default function TrustBadges() {
  const items = [
    { k: "10,000+", v: "Verified Properties Listed" },
    { k: "500+", v: "Trusted Developers & Brokers" },
    { k: "50+", v: "Cities Across India" },
    { k: "100%", v: "Verified Location Data" },
  ];

  return (
    <section className="border-t border-[#E6EEFF] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((x) => (
            <div
              key={x.v}
              className="rounded-3xl border border-[#E6EEFF] bg-white p-6 shadow-sm"
            >
              <div className="text-3xl font-extrabold text-[#0B1220]">{x.k}</div>
              <div className="mt-2 text-sm font-semibold text-[#225BA0]">{x.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

