"use client";

import { useState } from "react";

export default function EnquiryForm({
  propertyId,
  ctaPhone,
  ctaWhatsapp,
}: {
  propertyId: string;
  ctaPhone?: string;
  ctaWhatsapp?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [mode, setMode] = useState<"site" | "virtual">("site");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ propertyId, name, phone, date, time, note, mode }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed");
      setMsg("✅ Enquiry submitted. Our team will contact you.");
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setNote("");
      setMode("site");
    } catch (e: any) {
      setMsg("❌ " + (e.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[#E6EEFF] bg-white p-6 shadow-sm">
      <div className="text-lg font-extrabold text-[#0B1220]">Book a Visit</div>
      <div className="mt-1 text-sm text-[#0B1220]/60">
        Choose site visit or virtual video call.
      </div>

      <div className="mt-5 space-y-3">
        <input
          className="w-full rounded-2xl border border-[#E6EEFF] px-4 py-3 outline-none"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded-2xl border border-[#E6EEFF] px-4 py-3 outline-none"
          placeholder="Mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            className="w-full rounded-2xl border border-[#E6EEFF] px-4 py-3 outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            className="w-full rounded-2xl border border-[#E6EEFF] px-4 py-3 outline-none"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <select
          className="w-full rounded-2xl border border-[#E6EEFF] px-4 py-3 outline-none"
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
        >
          <option value="site">On-ground Site Visit</option>
          <option value="virtual">Virtual Video Call</option>
        </select>

        <textarea
          className="w-full rounded-2xl border border-[#E6EEFF] px-4 py-3 outline-none"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
        />

        {msg ? <div className="text-sm">{msg}</div> : null}

        <button
          disabled={loading}
          onClick={submit}
          className="w-full rounded-2xl bg-[#225BA0] py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>

        {(ctaPhone || ctaWhatsapp) ? (
          <div className="mt-2 grid grid-cols-2 gap-3">
            {ctaPhone ? (
              <a
                className="rounded-2xl border border-[#E6EEFF] px-4 py-3 text-center text-sm font-semibold hover:bg-[#F6F9FF]"
                href={`tel:${ctaPhone}`}
              >
                Call Now
              </a>
            ) : <div />}

            {ctaWhatsapp ? (
              <a
                className="rounded-2xl border border-[#E6EEFF] px-4 py-3 text-center text-sm font-semibold hover:bg-[#F6F9FF]"
                href={`https://wa.me/${ctaWhatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            ) : <div />}
          </div>
        ) : null}
      </div>
    </div>
  );
}

