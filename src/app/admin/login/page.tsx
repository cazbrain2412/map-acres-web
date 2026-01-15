"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const r = useRouter();
  const [email, setEmail] = useState("admin@mapacres.com");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setErr(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.ok) return setErr(data.error || "Login failed");
    r.push("/admin/properties");

  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-white/60">MapAcres admin access</p>

        <div className="mt-6 space-y-3">
          <input className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {err && <div className="text-sm text-red-300">{err}</div>}
          <button onClick={submit} className="w-full rounded-2xl bg-[#225BA0] py-3 font-semibold hover:opacity-90">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

