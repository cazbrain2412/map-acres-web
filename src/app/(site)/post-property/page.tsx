"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

export default function PostProperty() {
  const [form, setForm] = useState<any>({
    title: "",
    transaction: "buy",
    category: "residential",
    type: "Apartment",
    city: "",
    locality: "",
    price: "",
    area: "",
    description: "",
  });
  const [msg, setMsg] = useState<string | null>(null);

  async function submit() {
    setMsg(null);
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        area: Number(form.area),
      }),
    });
    const data = await res.json();
    if (!data.ok) return setMsg(data.error || "Failed");
    setMsg("Submitted! Your listing is under review.");
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold">Post Property</h1>
        <p className="mt-2 text-white/60">Owner & Agent can post. Approval required before publishing.</p>

        <div className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <input className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
            placeholder="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <select className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
              value={form.transaction} onChange={(e) => setForm({ ...form, transaction: e.target.value })}>
              <option value="buy">Sell</option>
              <option value="rent">Rent</option>
            </select>

            <select className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
              value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="plot">Plot/Land</option>
            </select>

            <input className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
              placeholder="Type (Apartment/Villa/Office/Plot...)" value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
              placeholder="City" value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <input className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
              placeholder="Locality" value={form.locality}
              onChange={(e) => setForm({ ...form, locality: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
              placeholder="Price (INR)" value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
              placeholder="Area (sqft)" value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })} />
          </div>

          <textarea className="min-h-[120px] rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
            placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />

          {msg && <div className="text-sm text-white/80">{msg}</div>}

          <button onClick={submit} className="rounded-2xl bg-[#225BA0] py-3 font-semibold hover:opacity-90">
            Submit for Approval
          </button>

          <div className="text-xs text-white/45">
            Tip: After approval, it will appear in search results and city pages.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

