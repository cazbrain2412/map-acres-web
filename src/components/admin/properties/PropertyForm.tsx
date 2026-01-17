"use client";

import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";
import slugify from "slugify";

type Mode = "create" | "edit";

const TABS = ["Basic", "Location", "Media", "Amenities", "Nearby", "Pricing", "SEO"] as const;
type Tab = (typeof TABS)[number];

export default function PropertyForm({ mode, id }: { mode: Mode; id?: string }) {
  const [tab, setTab] = useState<Tab>("Basic");
  const [saving, setSaving] = useState(false);
    const router = useRouter();

  const [form, setForm] = useState<any>({
    // required
    title: "",
    slug: "",
    status: "draft",
    transaction: "buy",
    category: "residential",
    type: "Apartment",
    price: 0,
    area: 0,
    areaUnit: "sqft",
    city: "Jaipur",
    locality: "",
    address: "",

    // homepage controls
    featured: false,          // premium badge
    homeSections: [],         // ["showcase","newLaunches","projects","latest","plots","commercial","featured"]

    // media
    coverImage: "",
    gallery: [],
    videos: [],
    floorPlans: [],
    tour360: [],
    floorPlan3dUrl: "",
    cadMapUrl: "",

    // amenities
    amenities: [],
    highlights: [],
    tags: [],
    nearbyPlaces: [],

    // listing person/company
    listedByType: "owner",
    listedByName: "",
    listedByPhone: "",
    developerName: "",
    brokerCompany: "",

    // ✅ CTA fields (NEW)
    ctaPhone: "",
    ctaWhatsapp: "",
    ctaEmail: "",

    // pricing range
    marketPriceMin: 0,
    marketPriceMax: 0,

    // seo
    metaTitle: "",
    metaDescription: "",
  });


  


  useEffect(() => {
    if (mode !== "edit" || !id) return;
    fetch(`/api/admin/properties/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => d?.item && setForm((prev: any) => ({ ...prev, ...d.item })));
  }, [mode, id]);

  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  const autoSlug = () => set("slug", slugify(form.title || "", { lower: true, strict: true }));

  const save = async () => {
    setSaving(true);
    try {
      const url = mode === "create" ? `/api/admin/properties` : `/api/admin/properties/${id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) alert(data.error || "Failed");
      else {
        if (mode === "create") window.location.href = `/admin/properties/${data.item._id}`;
        else {
  alert("Saved ✅");
  router.push("/admin/properties");
  router.refresh();
}

      }
    } finally {
      setSaving(false);
    }
  };

  const pill = (t: Tab) =>
    `rounded-full px-4 py-2 text-sm font-semibold ${
      tab === t ? "bg-[#225BA0] text-white" : "bg-[#F3F7FF] text-[#0B1220]"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">{mode === "create" ? "Add Property" : "Edit Property"}</h1>
          <p className="mt-1 text-sm text-[#0B1220]/60">High-profile listing with 360°, floor plans, videos, nearby, CAD map link.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => set("status", "draft")}
            className="rounded-2xl border border-[#E6EEFF] bg-white px-5 py-3 text-sm font-semibold hover:bg-[#F3F7FF]"
            type="button"
          >
            Save Draft
          </button>
          <button
            onClick={() => set("status", "approved")}
            className="rounded-2xl bg-[#225BA0] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
            type="button"
          >
            Mark Approved
          </button>
          <button
            onClick={save}
            className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
            type="button"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={pill(t)} type="button">
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-[#E6EEFF] bg-white p-6">
        {tab === "Basic" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" value={form.title} onChange={(v: string) => set("title", v)} />

            <div>
              <div className="text-xs font-semibold text-[#0B1220]/60">Slug</div>
              <div className="mt-2 flex gap-2">
                <input className="w-full rounded-2xl border border-[#E6EEFF] px-4 py-3" value={form.slug || ""} onChange={(e) => set("slug", e.target.value)} />
                <button type="button" onClick={autoSlug} className="rounded-2xl bg-[#F3F7FF] px-4 py-3 text-sm font-semibold">
                  Auto
                </button>
              </div>
            </div>

            <Select label="Type" value={form.type} onChange={(v: string) => set("type", v)} options={[["buy","Buy"],["rent","Rent"],["new-launches","New Launches"],["projects","Projects"]]} />
            <Select label="Category" value={form.category} onChange={(v: string) => set("category", v)} options={[["residential","Residential"],["commercial","Commercial"],["plot","Plots/Land"]]} />

            <Select label="Listed By" value={form.listedByType} onChange={(v: string) => set("listedByType", v)} options={[["owner","Owner"],["agent","Agent"],["builder","Builder/Developer"]]} />
            <Field label="Owner/Agent Name" value={form.listedByName} onChange={(v: string) => set("listedByName", v)} />
            <Field label="Owner/Agent Phone" value={form.listedByPhone} onChange={(v: string) => set("listedByPhone", v)} />
         
   <Field label="Developer Name (optional)" value={form.developerName} onChange={(v: string) => set("developerName", v)} />
{/* Premium badge */}
<div className="flex items-center gap-3 rounded-2xl border border-[#E6EEFF] bg-white p-4">
  <input
    type="checkbox"
    checked={!!form.featured}
    onChange={(e) => set("featured", e.target.checked)}
  />
  <div>
    <div className="text-sm font-semibold">Premium / Featured</div>
    <div className="text-xs text-[#0B1220]/60">Show PREMIUM badge + appear in Featured sort.</div>
  </div>
</div>

{/* Homepage sections */}
<div className="md:col-span-2">
  <div className="text-xs font-semibold text-[#0B1220]/60">Homepage Sections (where to show)</div>
  <div className="mt-2 flex flex-wrap gap-2">
    {[
      ["showcase", "Showcase"],
      ["latest", "Latest"],
      ["newLaunches", "New Launches"],
      ["projects", "Projects"],
      ["plots", "Plots/Land"],
      ["commercial", "Commercial"],
      ["featured", "Featured Row"],
    ].map(([key, label]) => {
      const arr = form.homeSections || [];
      const active = arr.includes(key);
      return (
        <button
          key={key}
          type="button"
          onClick={() => {
            const next = active ? arr.filter((x: string) => x !== key) : [...arr, key];
            set("homeSections", next);
          }}
          className={
            "rounded-full px-4 py-2 text-sm font-semibold border " +
            (active
              ? "bg-[#225BA0] text-white border-[#225BA0]"
              : "bg-white text-[#0B1220] border-[#E6EEFF] hover:bg-[#F3F7FF]")
          }
        >
          {label}
        </button>
      );
    })}
  </div>
</div>

{/* CTA fields */}
<Field label="CTA Phone (Call Now)" value={form.ctaPhone} onChange={(v: string) => set("ctaPhone", v)} />
<Field label="CTA WhatsApp (number only preferred)" value={form.ctaWhatsapp} onChange={(v: string) => set("ctaWhatsapp", v)} />
<Field label="CTA Email (optional)" value={form.ctaEmail} onChange={(v: string) => set("ctaEmail", v)} />

<Select
  label="Transaction"
  value={form.transaction}
  onChange={(v: string) => set("transaction", v)}
  options={[
    ["buy", "Buy"],
    ["rent", "Rent"],
    ["sell", "Sell"],
  ]}
/>

<NumberField
  label="Area"
  value={form.area}
  onChange={(v: number) => set("area", v)}
/>

<Select
  label="Area Unit"
  value={form.areaUnit}
  onChange={(v: string) => set("areaUnit", v)}
  options={[
    ["sqft", "Sq Ft"],
    ["sqm", "Sq M"],
    ["sqyd", "Sq Yd"],
    ["acre", "Acre"],
    ["bigha", "Bigha"],
  ]}
/>


          </div>
        )}

        {tab === "Location" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="City" value={form.city} onChange={(v: string) => set("city", v)} />
            <Field label="Locality" value={form.locality} onChange={(v: string) => set("locality", v)} />
            <Field label="Address" value={form.address} onChange={(v: string) => set("address", v)} />
            <Field label="CAD Map URL (map.mapacres.com link)" value={form.cadMapUrl} onChange={(v: string) => set("cadMapUrl", v)} />
          </div>
        )}



        {tab === "Media" && (
  <div className="grid gap-4">

    {/* Cover */}
    <div className="flex items-center justify-between">
      <div className="text-xs font-semibold text-[#0B1220]/60">Cover Image</div>
      <UploadButton
        accept="image/*"
        onUploaded={(url) => set("coverImage", url)}
      />
    </div>
    <Field label="Cover Image URL" value={form.coverImage} onChange={(v: string) => set("coverImage", v)} />

    {/* Gallery */}
    <div className="flex items-center justify-between">
      <div className="text-xs font-semibold text-[#0B1220]/60">Gallery Images</div>
      <UploadButton
        accept="image/*"
        onUploaded={(url) => set("gallery", [...(form.gallery || []), url])}
      />
    </div>
    <ListField label="Gallery Images (URLs)" values={form.gallery} onChange={(v: string[]) => set("gallery", v)} />

    {/* Videos */}
    <div className="flex items-center justify-between">
      <div className="text-xs font-semibold text-[#0B1220]/60">Videos</div>
      <UploadButton
        accept="video/*"
        onUploaded={(url) => set("videos", [...(form.videos || []), url])}
      />
    </div>
    <ListField label="Videos (YouTube/mp4 URLs)" values={form.videos} onChange={(v: string[]) => set("videos", v)} />

    {/* Floor Plans */}
    <div className="flex items-center justify-between">
      <div className="text-xs font-semibold text-[#0B1220]/60">Floor Plans</div>
      <UploadButton
        accept="image/*,application/pdf"
        onUploaded={(url) => set("floorPlans", [...(form.floorPlans || []), url])}
      />
    </div>
    <ListField label="Floor Plans (image/pdf URLs)" values={form.floorPlans} onChange={(v: string[]) => set("floorPlans", v)} />

    <ListField label="360 Tour Links (URLs/iframe links)" values={form.tour360} onChange={(v: string[]) => set("tour360", v)} />
    <Field label="3D Try-On Floor Plan URL (NEW)" value={form.floorPlan3dUrl} onChange={(v: string) => set("floorPlan3dUrl", v)} />

  </div>
)}




        {tab === "Amenities" && (
          <div className="grid gap-4">
            <ListField label="Amenities (text list)" values={form.amenities} onChange={(v: string[]) => set("amenities", v)} />
            <ListField label="Highlights (bullets)" values={form.highlights} onChange={(v: string[]) => set("highlights", v)} />
            <ListField label="Tags" values={form.tags} onChange={(v: string[]) => set("tags", v)} />
          </div>
        )}

        {tab === "Nearby" && (
          <NearbyBuilder value={form.nearbyPlaces} onChange={(v: any[]) => set("nearbyPlaces", v)} />
        )}

        {tab === "Pricing" && (
          <div className="grid gap-4 md:grid-cols-2">
            <NumberField label="Price" value={form.price} onChange={(v: number) => set("price", v)} />
            <Select label="Status" value={form.status} onChange={(v: string) => set("status", v)} options={[["draft","Draft"],["approved","Approved"],["rejected","Rejected"]]} />
            <NumberField label="Market Price Min" value={form.marketPriceMin} onChange={(v: number) => set("marketPriceMin", v)} />
            <NumberField label="Market Price Max" value={form.marketPriceMax} onChange={(v: number) => set("marketPriceMax", v)} />
          </div>
        )}

        {tab === "SEO" && (
          <div className="grid gap-4">
            <Field label="Meta Title" value={form.metaTitle} onChange={(v: string) => set("metaTitle", v)} />
            <Field label="Meta Description" value={form.metaDescription} onChange={(v: string) => set("metaDescription", v)} />
          </div>
        )}
      </div>
    </div>
  );
}

function UploadButton({ onUploaded, accept }: { onUploaded: (url: string) => void; accept?: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#225BA0] px-4 py-2 text-sm font-semibold text-white">
      Upload
      <input
        type="file"
        accept={accept || "*/*"}
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const fd = new FormData();
          fd.append("file", f);
          const res = await fetch("/api/admin/upload", {
  method: "POST",
  body: fd,
  credentials: "include",
});

const data = await res.json();
if (data?.ok && data?.url) onUploaded(data.url);
else alert(data?.error || "Upload failed");

e.currentTarget.value = "";

        }}
      />
    </label>
  );
}


function Field({ label, value, onChange }: any) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-[#0B1220]/60">{label}</div>
      <input
        className="mt-2 w-full rounded-2xl border border-[#E6EEFF] px-4 py-3 outline-none focus:ring-2 focus:ring-[#225BA0]/20"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function NumberField({ label, value, onChange }: any) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-[#0B1220]/60">{label}</div>
      <input
        type="number"
        className="mt-2 w-full rounded-2xl border border-[#E6EEFF] px-4 py-3 outline-none focus:ring-2 focus:ring-[#225BA0]/20"
        value={Number(value || 0)}
        onChange={(e) => onChange(Number(e.target.value || 0))}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }: any) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-[#0B1220]/60">{label}</div>
      <select
        className="mt-2 w-full rounded-2xl border border-[#E6EEFF] bg-white px-4 py-3 outline-none"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(([v, t]: any) => (
          <option key={v} value={v}>{t}</option>
        ))}
      </select>
    </label>
  );
}

function ListField({ label, values, onChange }: any) {
  const [text, setText] = useState((values || []).join("\n"));

  useEffect(() => setText((values || []).join("\n")), [values]);

  return (
    <label className="block">
      <div className="text-xs font-semibold text-[#0B1220]/60">{label}</div>
      <textarea
        className="mt-2 w-full rounded-2xl border border-[#E6EEFF] px-4 py-3 outline-none focus:ring-2 focus:ring-[#225BA0]/20"
        rows={5}
        value={text}
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          onChange(v.split("\n").map((x) => x.trim()).filter(Boolean));
        }}
      />
      <div className="mt-2 text-xs text-[#0B1220]/50">One per line</div>
    </label>
  );
}

function NearbyBuilder({ value, onChange }: any) {
  const items = value || [];

  const add = () => onChange([...items, { placeType: "hospital", name: "", distanceKm: 1 }]);
  const remove = (i: number) => onChange(items.filter((_: any, idx: number) => idx !== i));
  const setAt = (i: number, k: string, v: any) =>
    onChange(items.map((it: any, idx: number) => (idx === i ? { ...it, [k]: v } : it)));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold tracking-widest text-[#225BA0]">NEARBY</div>
          <h3 className="mt-1 text-xl font-extrabold">Nearby places</h3>
        </div>
        <button type="button" onClick={add} className="rounded-2xl bg-[#225BA0] px-4 py-2 text-sm font-semibold text-white">
          + Add
        </button>
      </div>

      <div className="mt-5 grid gap-3">
        {items.map((it: any, i: number) => (
          <div key={i} className="rounded-3xl border border-[#E6EEFF] p-4">
            <div className="grid gap-3 md:grid-cols-3">
              <Select
                label="Type"
                value={it.placeType}
                onChange={(v: any) => setAt(i, "placeType", v)}
                options={[
                  ["hospital","Hospital"],
                  ["school","School"],
                  ["metro","Metro"],
                  ["mall","Mall"],
                  ["airport","Airport"],
                  ["railway","Railway"],
                ]}
              />
              <Field label="Name" value={it.name} onChange={(v: any) => setAt(i, "name", v)} />
              <NumberField label="Distance (km)" value={it.distanceKm} onChange={(v: any) => setAt(i, "distanceKm", v)} />
            </div>

            <div className="mt-3 text-right">
              <button type="button" onClick={() => remove(i)} className="text-sm font-semibold text-red-600">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

