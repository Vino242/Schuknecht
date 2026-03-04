"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Falsches Passwort");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-xs px-6">
        <h1
          className="text-2xl uppercase tracking-[0.05em]"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          Admin
        </h1>
        <p
          className="text-[13px] opacity-50"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Schuknecht Kartenverwaltung
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
          autoFocus
          className="border border-black px-4 py-3 text-[15px] outline-none mt-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        {error && (
          <p className="text-red-600 text-[13px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="bg-black text-white px-4 py-3 text-[13px] tracking-[0.1em] uppercase hover:opacity-80 transition-opacity disabled:opacity-40"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          {loading ? "..." : "Einloggen"}
        </button>
      </form>
    </div>
  );
}
