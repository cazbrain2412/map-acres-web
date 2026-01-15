"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState("");
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

    // If admin -> admin dashboard, else -> post property
    if (data.role === "admin") r.push("/admin/dashboard");
    else r.push("/post-property");
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <Header />

      <div className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="mt-2 text-sm text-white/60">Owner / Agent login</p>

          <div className="mt-6 space-y-3">
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {err && <div className="text-sm text-red-300">{err}</div>}

            <button
              onClick={submit}
              className="w-full rounded-2xl bg-[#225BA0] py-3 font-semibold hover:opacity-90"
            >
              Login
            </button>

            <div className="text-xs text-white/50">
              Don’t have an account? <a className="text-white underline" href="/signup">Sign up</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

