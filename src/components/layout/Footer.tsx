import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F17] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-extrabold tracking-wide text-white/90">Company</h3>
            <div className="mt-4 space-y-3">
              <FooterLink href="/about" label="About MapAcres" />
              <FooterLink href="/vision" label="Our Vision" />
              <FooterLink href="/team" label="Our Team" />
              <FooterLink href="/careers" label="Careers" />
              <FooterLink href="/press" label="Press & Media" />
              <FooterLink href="/contact" label="Contact Us" />
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-extrabold tracking-wide text-white/90">Properties</h3>
            <div className="mt-4 space-y-3">
              <FooterLink href="/search?transaction=buy" label="Buy Property" />
              <FooterLink href="/search?transaction=rent" label="Rent Property" />
              <FooterLink href="/search?category=plot" label="Land & Plots" />
              <FooterLink href="/search?category=commercial" label="Commercial Property" />
              <FooterLink href="/search?type=new-launches" label="New Projects" />
              <FooterLink href="/search?tag=government" label="Government Projects" />
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-extrabold tracking-wide text-white/90">For Professionals</h3>
            <div className="mt-4 space-y-3">
              <FooterLink href="/developers" label="Developers" />
              <FooterLink href="/brokers" label="Brokers & Agents" />
              <FooterLink href="/post-property" label="Post Property" />
              <FooterLink href="/advertise" label="Advertise with Us" />
              <FooterLink href="/partners" label="Partner Program" />
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-extrabold tracking-wide text-white/90">Support & Legal</h3>
            <div className="mt-4 space-y-3">
              <FooterLink href="/help" label="Help Center" />
              <FooterLink href="/faqs" label="FAQs" />
              <FooterLink href="/how-it-works" label="How It Works" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
              <FooterLink href="/cookies" label="Cookie Policy" />
            </div>
          </div>
        </div>

        {/* Contact block */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm font-extrabold tracking-wide text-white/90">MapAcres Technology</h3>
          <div className="mt-3 grid gap-3 text-sm text-white/75 md:grid-cols-2">
            <div>
              <h4 className="text-xs font-bold text-white/80">Address</h4>
              <div className="mt-1">
                07 GF, Acacia Str, Urban Woods, Vatika Infotech City, Thikariya, Jaipur - 302026, Rajasthan
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white/80">Working Hours</h4>
              <div className="mt-1">Monday - Saturday: 9:00 AM - 6:00 PM</div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white/80">Phone</h4>
              <div className="mt-1">
                <a className="hover:text-white" href="tel:+919636306310">+91 9636306310</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white/80">Email</h4>
              <div className="mt-1 space-y-1">
                <div>
                  Inquiry: <a className="hover:text-white" href="mailto:inquiry@mapacres.com">inquiry@mapacres.com</a>
                </div>
                <div>
                  Support: <a className="hover:text-white" href="mailto:support@mapacres.com">support@mapacres.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} MapAcres Technology. All Rights Reserved.</div>
          <div className="flex flex-wrap gap-4">
            <span className="text-white/70">Coming Soon:</span>
            <span>App Store</span>
            <span>Google Play</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-white" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-white" href="/terms">Terms of Service</Link>
            <Link className="hover:text-white" href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <h4 className="text-sm">
      <Link className="text-white/70 hover:text-white" href={href}>
        {label}
      </Link>
    </h4>
  );
}

