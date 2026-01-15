import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dbConnect from "@/lib/db/mongoose";
import Property from "@/models/Property";
import EnquiryForm from "@/components/forms/EnquiryForm";

export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await dbConnect();

  const p: any = await Property.findOne({ slug, status: "approved" }).lean();



  if (!p) {
    return (
      <div className="min-h-screen bg-white text-[#0B1220]">


        <Header />
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-3xl border border-[#E6EEFF] bg-[#F6F9FF] p-8 text-[#0B1220]/70">

            Property not found or not approved yet.
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  

  const plain: any = JSON.parse(JSON.stringify(p));
  const pid = String(plain._id);

  const price = typeof plain.price === "number" ? plain.price.toLocaleString("en-IN") : plain.price;


  return (
    <div className="min-h-screen bg-white text-[#0B1220]">


      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-[#E6EEFF] bg-white shadow-sm">

              <div className="aspect-[16/9] bg-[#F6F9FF]">

                  {(p.coverImage || p.gallery?.[0]) ? (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={p.coverImage || p.gallery?.[0]}
    alt={p.title}
    className="h-full w-full object-cover"
  />
) : null}



              </div>

              <div className="p-6">
                <div className="text-xs text-[#225BA0] font-semibold tracking-widest">{String(p.category).toUpperCase()}</div>

                <h1 className="mt-2 text-3xl font-bold">{p.title}</h1>
                <div className="mt-2 text-[#0B1220]/60">

                  {p.locality ? `${p.locality}, ` : ""}
                  {p.city}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/55">Price</div>
                    <div className="mt-1 font-bold">₹ {price}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/55">Area</div>
                    <div className="mt-1 font-bold">{p.area} sqft</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/55">Type</div>
                    <div className="mt-1 font-bold">{p.type}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/55">Transaction</div>
                    <div className="mt-1 font-bold">{p.transaction}</div>
                  </div>
                </div>

                {p.description ? (
                  <div className="mt-6">
                    <div className="text-sm font-semibold text-[#0B1220]">Overview</div>

                    <p className="mt-2 text-sm leading-6 text-[#0B1220]/70">{p.description}</p>

                  </div>
                ) : null}

                {((p.tour360 && p.tour360.length) || (p.videos && p.videos.length)) && (

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {p.tour360?.[0] && (
  <a
    href={p.tour360[0]}
    target="_blank"
    className="rounded-2xl border border-[#E6EEFF] bg-white p-4 text-sm font-semibold text-[#0B1220] hover:bg-[#F3F7FF]"
    rel="noreferrer"
  >
    Open 360° Tour →
  </a>
)}

                    {p.videos?.[0] && (
  <a
    href={p.videos[0]}
    target="_blank"
    className="rounded-2xl border border-[#E6EEFF] bg-white p-4 text-sm font-semibold text-[#0B1220] hover:bg-[#F3F7FF]"
    rel="noreferrer"
  >
    Watch Video →
  </a>
)}

                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <EnquiryForm
  propertyId={pid}
  ctaPhone={plain.ctaPhone}
  ctaWhatsapp={plain.ctaWhatsapp}
/>



            <div className="mt-4 rounded-3xl border border-[#E6EEFF] bg-white p-6">

              <div className="text-sm font-semibold text-[#0B1220]">Map Plotting</div>

              <div className="mt-2 text-sm text-[#0B1220]/60">

                Visualize plots & boundaries on satellite map.
              </div>
              <a
                href={process.env.NEXT_PUBLIC_MAP_URL || "https://map.mapacres.com"}
                className="mt-4 inline-flex rounded-2xl bg-[#225BA0] px-5 py-3 text-sm font-semibold hover:opacity-90"
              >
                Open Map
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

