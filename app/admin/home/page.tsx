"use client";

import { useEffect, useState } from "react";

export default function AdminHomeEditor() {
  const [jsonText, setJsonText] = useState<string>("");
  const [status, setStatus] = useState<string>("Loading...");

  async function load() {
    setStatus("Loading...");
    const res = await fetch("/api/admin/home", { cache: "no-store" });
    const data = await res.json();
    setJsonText(JSON.stringify(data, null, 2));
    setStatus("Loaded ✅");
  }

  async function save() {
    try {
      setStatus("Saving...");
      const parsed = JSON.parse(jsonText);

      const res = await fetch("/api/admin/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const out = await res.json();
      if (!res.ok || !out.ok) throw new Error(out?.error || "Save failed");

      setStatus("Saved ✅ (refresh homepage)");
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Admin: Home Page Content</h1>
        <div className="flex gap-2">
          <button onClick={load} className="rounded-xl bg-black/5 px-4 py-2 text-sm font-semibold">
            Reload
          </button>
          <button onClick={save} className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white">
            Save
          </button>
        </div>
      </div>

      <div className="mt-2 text-sm text-black/60">{status}</div>

      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        className="mt-6 h-[70vh] w-full rounded-2xl border border-black/10 bg-white p-4 font-mono text-xs outline-none"
      />
      <div className="mt-3 text-xs text-black/50">
        After saving, open homepage in new tab and refresh: <code>/</code>
      </div>
    </div>
  );
}

