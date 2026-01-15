"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePropertyButton({ id }: { id: string }) {
  const r = useRouter();
  const [loading, setLoading] = useState(false);

  async function del() {
    if (!confirm("Delete this property?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed");
      r.refresh();
    } catch (e: any) {
      alert(e.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={del}
      disabled={loading}
      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold hover:bg-white/10 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}

