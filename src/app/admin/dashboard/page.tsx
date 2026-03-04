"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MenuItem = {
  name: string;
  desc?: string;
  price?: string;
};

type MenuCategory = {
  category: string;
  highlight?: boolean;
  desc?: string;
  items: MenuItem[];
};

export default function AdminDashboard() {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/menu")
      .then((r) => {
        if (r.status === 401) { router.push("/admin"); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) { setMenu(data); setLoading(false); }
      });
  }, [router]);

  function updateItem(ci: number, ii: number, field: keyof MenuItem, value: string) {
    setMenu((prev) =>
      prev.map((cat, c) =>
        c !== ci ? cat : {
          ...cat,
          items: cat.items.map((item, i) =>
            i !== ii ? item : { ...item, [field]: value }
          ),
        }
      )
    );
    setStatus("idle");
  }

  function updateCategoryDesc(ci: number, value: string) {
    setMenu((prev) =>
      prev.map((cat, c) => c !== ci ? cat : { ...cat, desc: value })
    );
    setStatus("idle");
  }

  function addItem(ci: number) {
    setMenu((prev) =>
      prev.map((cat, c) =>
        c !== ci ? cat : { ...cat, items: [...cat.items, { name: "", desc: "", price: "" }] }
      )
    );
  }

  function deleteItem(ci: number, ii: number) {
    if (!confirm("Gericht löschen?")) return;
    setMenu((prev) =>
      prev.map((cat, c) =>
        c !== ci ? cat : { ...cat, items: cat.items.filter((_, i) => i !== ii) }
      )
    );
    setStatus("idle");
  }

  async function save() {
    setSaving(true);
    setStatus("idle");
    const res = await fetch("/api/admin/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    });
    setSaving(false);
    if (res.ok) {
      setStatus("saved");
    } else {
      setStatus("error");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-[14px] opacity-40">Laden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-black/10 px-6 md:px-10 py-4 flex items-center justify-between">
        <h1
          className="text-[18px] uppercase tracking-[0.05em]"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          Karte bearbeiten
        </h1>
        <div className="flex items-center gap-4">
          {status === "saved" && (
            <p className="text-[13px] text-green-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Gespeichert ✓ — Seite wird in ~1 Min aktualisiert
            </p>
          )}
          {status === "error" && (
            <p className="text-[13px] text-red-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Fehler beim Speichern
            </p>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="bg-black text-white px-5 py-2 text-[12px] tracking-[0.1em] uppercase hover:opacity-80 transition-opacity disabled:opacity-40"
            style={{ fontFamily: "'Futura Bold', sans-serif" }}
          >
            {saving ? "Speichern..." : "Speichern"}
          </button>
          <button
            onClick={logout}
            className="text-[12px] opacity-40 hover:opacity-80 transition-opacity uppercase tracking-[0.05em]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Menu Editor */}
      <div className="px-6 md:px-10 py-10 max-w-[800px] flex flex-col gap-12">
        {menu.map((cat, ci) => (
          <div key={ci}>
            {/* Category title */}
            <div className="border-b border-black pb-3 mb-6">
              <h2
                className="text-[20px] font-bold uppercase"
                style={{ fontFamily: "'Futura Bold', sans-serif" }}
              >
                {cat.category}
              </h2>
              {/* Optional category description */}
              <input
                type="text"
                value={cat.desc ?? ""}
                onChange={(e) => updateCategoryDesc(ci, e.target.value)}
                placeholder="Kategorie-Beschreibung (optional)"
                className="mt-1 w-full text-[12px] opacity-50 outline-none border-none bg-transparent"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>

            {/* Items */}
            <div className="flex flex-col gap-3">
              {cat.items.map((item, ii) => (
                <div key={ii} className="flex gap-3 items-start group">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_2fr_80px] gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(ci, ii, "name", e.target.value)}
                      placeholder="Name"
                      className="border-b border-black/20 focus:border-black px-0 py-1.5 text-[14px] outline-none bg-transparent transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                    <input
                      type="text"
                      value={item.desc ?? ""}
                      onChange={(e) => updateItem(ci, ii, "desc", e.target.value)}
                      placeholder="Beschreibung (optional)"
                      className="border-b border-black/20 focus:border-black px-0 py-1.5 text-[13px] opacity-60 outline-none bg-transparent transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                    <input
                      type="text"
                      value={item.price ?? ""}
                      onChange={(e) => updateItem(ci, ii, "price", e.target.value)}
                      placeholder="0,00"
                      className="border-b border-black/20 focus:border-black px-0 py-1.5 text-[14px] outline-none bg-transparent text-right transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                  <button
                    onClick={() => deleteItem(ci, ii)}
                    className="mt-1.5 text-[18px] opacity-0 group-hover:opacity-30 hover:!opacity-80 transition-opacity leading-none"
                    title="Löschen"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Add item */}
            <button
              onClick={() => addItem(ci)}
              className="mt-4 text-[12px] opacity-40 hover:opacity-80 transition-opacity uppercase tracking-[0.08em]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              + Gericht hinzufügen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
