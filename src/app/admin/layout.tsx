import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="px-2 py-2">
              <div className="text-lg font-extrabold">MapAcres Admin</div>
              <div className="text-xs text-white/60">Manage listings & enquiries</div>
            </div>

            <nav className="mt-4 space-y-2">
              <NavItem href="/admin/dashboard" label="Dashboard" />
              <NavItem href="/admin/properties" label="Properties" />
              <NavItem href="/admin/properties/create" label="Add Property" />
              <NavItem href="/admin/enquiries" label="Enquiries (next)" muted />
            </nav>

            <div className="mt-6 border-t border-white/10 pt-4">
              <Link
                href="/"
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
              >
                ← Back to website
              </Link>

              <form action="/api/auth/logout" method="POST">
                <button
                  className="mt-2 w-full rounded-2xl bg-[#225BA0] px-4 py-3 text-sm font-semibold hover:opacity-90"
                  type="submit"
                >
                  Logout
                </button>
              </form>
            </div>
          </aside>

          {/* Content */}
          <main className="rounded-3xl border border-white/10 bg-white/5 p-5">
  {children}

  {/* ✅ Admin input text visibility fix */}
  <style>{`
    input, textarea, select {
      color: #0B1220 !important;
      background: #ffffff !important;
      border-color: rgba(230,238,255,.9) !important;
    }
    input::placeholder, textarea::placeholder {
      color: rgba(11,18,32,.45) !important;
    }
  `}</style>
</main>

        </div>
      </div>
    </div>
  );
}

function NavItem({ href, label, muted }: { href: string; label: string; muted?: boolean }) {
  return (
    <Link
      href={href}
      className={[
        "block rounded-2xl px-4 py-3 text-sm font-semibold",
        muted ? "text-white/50 hover:bg-white/5" : "text-white/90 hover:bg-white/10",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

