"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const r = useRouter();
  const [role, setRole] = useState<"owner" | "agent">("owner");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setErr(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role, name, phone, email, password }),
    });
    const data = await res.json();
    if (!data.ok) return setErr(data.error || "Signup failed");

    // auto go login
    r.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <Header />

      <div className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold">Sign up</h1>
          <p className="mt-2 text-sm text-white/60">Create Owner / Agent account</p>

          <div className="mt-6 space-y-3">
            <select
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="owner">Owner</option>
              <option value="agent">Agent</option>
            </select>

            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              placeholder="Password (min 6)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {err && <div className="text-sm text-red-300">{err}</div>}

            <button
              onClick={submit}
              className="w-full rounded-2xl bg-[#225BA0] py-3 font-semibold hover:opacity-90"
            >
              Create Account
            </button>

            <div className="text-xs text-white/50">
              Already have an account? <a className="text-white underline" href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

