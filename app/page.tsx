import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import FeaturedListings from "@/components/FeaturedListings";
import ExploreCities from "@/components/ExploreCities";
import NewProjects from "@/components/NewProjects";
import TrustCTA from "@/components/TrustCTA";
import Footer from "@/components/Footer";
import { homeData } from "@/lib/homeData";

export default async function HomePage() {
  const data = homeData;

  return (
    <main className="min-h-screen bg-white">
      <Navbar links={data.nav} />
      <HeroSearch
        headline={data.hero.headline}
        subheadline={data.hero.subheadline}
        tabs={data.hero.tabs}
        quickFilters={data.hero.quickFilters}
      />
      <FeaturedListings title={data.featured.title} items={data.featured.items} />
      <ExploreCities title={data.cities.title} items={data.cities.items} />
      <NewProjects title={data.projects.title} items={data.projects.items} />
      <TrustCTA
        stats={data.trust.stats}
        ctaPrimary={data.trust.ctaPrimary}
        ctaSecondary={data.trust.ctaSecondary}
      />
      <Footer columns={data.footer.columns} note={data.footer.note} />
    </main>
  );
}

