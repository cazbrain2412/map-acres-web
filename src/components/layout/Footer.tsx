export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0B0F17]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="text-lg font-bold text-white">MapAcres</div>
          <p className="mt-3 text-sm text-white/60">
            Premium property discovery with map plotting, 360° tours and smarter insights.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-white/80">Explore</div>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>Buy</li>
            <li>Rent</li>
            <li>New Launches</li>
            <li>Commercial</li>
            <li>Plots/Land</li>
            <li>Projects</li>
            <li>360° View</li>
            <li>Map</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-white/80">Support</div>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>FAQ</li>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Report a problem</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-white/80">Contact</div>
          <div className="mt-3 text-sm text-white/60">
            <div className="font-semibold text-white/75">Mapacres Technology</div>
            <div>07 GF, Acacia Str, Urban Woods, Vatika Infotech City,</div>
            <div>Thikariya, Jaipur – 302026, Rajasthan</div>
            <div className="mt-2">Phone: 9636306310</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/45">
        © {new Date().getFullYear()} MapAcres. All rights reserved.
      </div>
    </footer>
  );
}

