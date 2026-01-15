export default function HowItWorks() {
  const steps = [
    { t: "Search", d: "Find by city, locality, project, landmark or filters." },
    { t: "Compare", d: "See photos, videos, price insights, amenities & nearby places." },
    { t: "Map Plot", d: "Plot land boundaries on satellite map with CAD-like precision." },
    { t: "Contact", d: "Connect with Owner / Agent / Developer securely." },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl border border-[#E6EEFF] bg-[#F6F9FF] p-8">
        <div className="text-xs font-semibold tracking-widest text-[#225BA0]">HOW IT WORKS</div>
        <h2 className="mt-2 text-3xl font-extrabold text-[#0B1220]">A premium workflow built for India</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.t} className="rounded-3xl border border-[#E6EEFF] bg-white p-5">
              <div className="text-lg font-bold">{s.t}</div>
              <div className="mt-2 text-sm text-[#0B1220]/65">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

