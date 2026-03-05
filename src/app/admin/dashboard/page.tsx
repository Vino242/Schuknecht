"use client";

import { useEffect, useState, useRef } from "react";
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

type Tageskarte = {
  zeitraum: string;
  sections: MenuCategory[];
};

type OeffnungszeitRow = { tage: string; zeit: string };
type Settings = { oeffnungszeiten: OeffnungszeitRow[]; ticker: string };

export default function AdminDashboard() {
  const [tageskarte, setTageskarte] = useState<Tageskarte>({ zeitraum: "", sections: [] });
  const [settings, setSettings] = useState<Settings>({ oeffnungszeiten: [], ticker: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [pdfStatus, setPdfStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/menu").then((r) => {
        if (r.status === 401) { router.push("/admin"); return null; }
        return r.json();
      }),
      fetch("/api/admin/settings").then((r) => r.ok ? r.json() : null),
    ]).then(([menuData, settingsData]) => {
      if (menuData) setTageskarte(menuData);
      if (settingsData) setSettings(settingsData);
      setLoading(false);
    });
  }, [router]);

  function updateItem(ci: number, ii: number, field: keyof MenuItem, value: string) {
    setTageskarte((prev) => ({
      ...prev,
      sections: prev.sections.map((cat, c) =>
        c !== ci ? cat : {
          ...cat,
          items: cat.items.map((item, i) =>
            i !== ii ? item : { ...item, [field]: value }
          ),
        }
      ),
    }));
    setStatus("idle");
  }

  function updateCategoryDesc(ci: number, value: string) {
    setTageskarte((prev) => ({
      ...prev,
      sections: prev.sections.map((cat, c) => c !== ci ? cat : { ...cat, desc: value }),
    }));
    setStatus("idle");
  }

  function addItem(ci: number) {
    setTageskarte((prev) => ({
      ...prev,
      sections: prev.sections.map((cat, c) =>
        c !== ci ? cat : { ...cat, items: [...cat.items, { name: "", price: "" }] }
      ),
    }));
  }

  function deleteItem(ci: number, ii: number) {
    if (!confirm("Gericht löschen?")) return;
    setTageskarte((prev) => ({
      ...prev,
      sections: prev.sections.map((cat, c) =>
        c !== ci ? cat : { ...cat, items: cat.items.filter((_, i) => i !== ii) }
      ),
    }));
    setStatus("idle");
  }

  async function save() {
    setSaving(true);
    setStatus("idle");
    const [menuRes, settingsRes] = await Promise.all([
      fetch("/api/admin/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tageskarte),
      }),
      fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      }),
    ]);
    setSaving(false);
    if (menuRes.ok && settingsRes.ok) {
      setStatus("saved");
    } else {
      setStatus("error");
    }
  }

  async function uploadPdf() {
    const file = pdfInputRef.current?.files?.[0];
    if (!file) return;
    setPdfStatus("uploading");
    const formData = new FormData();
    formData.append("pdf", file);
    const res = await fetch("/api/admin/upload-pdf", {
      method: "POST",
      body: formData,
    });
    setPdfStatus(res.ok ? "done" : "error");
    if (pdfInputRef.current) pdfInputRef.current.value = "";
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
          Admin
        </h1>
        <div className="flex items-center gap-4">
          {status === "saved" && (
            <p className="text-[13px] text-green-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Gespeichert ✓
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

      <div className="px-6 md:px-10 py-10 max-w-[800px] flex flex-col gap-12">
        {/* Öffnungszeiten */}
        <div>
          <div className="border-b border-black pb-3 mb-6">
            <h2 className="text-[20px] font-bold uppercase" style={{ fontFamily: "'Futura Bold', sans-serif" }}>
              Öffnungszeiten
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {settings.oeffnungszeiten.map((row, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={row.tage}
                  onChange={(e) => {
                    const updated = [...settings.oeffnungszeiten];
                    updated[i] = { ...updated[i], tage: e.target.value };
                    setSettings({ ...settings, oeffnungszeiten: updated });
                    setStatus("idle");
                  }}
                  placeholder="z.B. So — Mi"
                  className="border-b border-black/20 focus:border-black px-0 py-1.5 text-[14px] outline-none bg-transparent transition-colors w-[150px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <input
                  type="text"
                  value={row.zeit}
                  onChange={(e) => {
                    const updated = [...settings.oeffnungszeiten];
                    updated[i] = { ...updated[i], zeit: e.target.value };
                    setSettings({ ...settings, oeffnungszeiten: updated });
                    setStatus("idle");
                  }}
                  placeholder="z.B. 09:30 — 20:00"
                  className="border-b border-black/20 focus:border-black px-0 py-1.5 text-[14px] outline-none bg-transparent transition-colors w-[200px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  onClick={() => {
                    setSettings({
                      ...settings,
                      oeffnungszeiten: settings.oeffnungszeiten.filter((_, idx) => idx !== i),
                    });
                    setStatus("idle");
                  }}
                  className="text-[18px] opacity-30 hover:opacity-80 transition-opacity leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSettings({
              ...settings,
              oeffnungszeiten: [...settings.oeffnungszeiten, { tage: "", zeit: "" }],
            })}
            className="mt-4 text-[12px] opacity-40 hover:opacity-80 transition-opacity uppercase tracking-[0.08em]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            + Zeile hinzufügen
          </button>
        </div>

        {/* Ticker */}
        <div>
          <div className="border-b border-black pb-3 mb-6">
            <h2 className="text-[20px] font-bold uppercase" style={{ fontFamily: "'Futura Bold', sans-serif" }}>
              Ticker
            </h2>
          </div>
          <textarea
            value={settings.ticker}
            onChange={(e) => {
              setSettings({ ...settings, ticker: e.target.value });
              setStatus("idle");
            }}
            placeholder="Ticker-Text (wird auf der Startseite als Laufband angezeigt)"
            rows={3}
            className="w-full border border-black/20 focus:border-black px-3 py-2 text-[14px] outline-none bg-transparent transition-colors resize-none"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>

        {/* Speisekarte PDF Upload */}
        <div>
          <div className="border-b border-black pb-3 mb-6">
            <h2 className="text-[20px] font-bold uppercase" style={{ fontFamily: "'Futura Bold', sans-serif" }}>
              Speisekarte (PDF)
            </h2>
          </div>
          <p className="text-[13px] opacity-50 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Lade hier die aktuelle Speisekarte als PDF hoch. Sie wird auf der Karte-Seite zum Download angeboten.
          </p>
          <div className="flex items-center gap-4">
            <input
              ref={pdfInputRef}
              type="file"
              accept=".pdf"
              className="text-[13px]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            <button
              onClick={uploadPdf}
              disabled={pdfStatus === "uploading"}
              className="bg-black text-white px-5 py-2 text-[12px] tracking-[0.1em] uppercase hover:opacity-80 transition-opacity disabled:opacity-40"
              style={{ fontFamily: "'Futura Bold', sans-serif" }}
            >
              {pdfStatus === "uploading" ? "Hochladen..." : "Hochladen"}
            </button>
          </div>
          {pdfStatus === "done" && (
            <p className="mt-3 text-[13px] text-green-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              PDF hochgeladen ✓
            </p>
          )}
          {pdfStatus === "error" && (
            <p className="mt-3 text-[13px] text-red-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Fehler beim Hochladen
            </p>
          )}
        </div>

        {/* Tageskarte */}
        <div>
          <div className="border-b border-black pb-3 mb-6">
            <h2 className="text-[20px] font-bold uppercase" style={{ fontFamily: "'Futura Bold', sans-serif" }}>
              Tageskarte
            </h2>
          </div>
          <div className="mb-8">
            <label className="text-[12px] opacity-50 uppercase tracking-[0.08em] block mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Zeitraum
            </label>
            <input
              type="text"
              value={tageskarte.zeitraum}
              onChange={(e) => {
                setTageskarte({ ...tageskarte, zeitraum: e.target.value });
                setStatus("idle");
              }}
              placeholder="z.B. Mo, 02.02. – Fr, 06.03. von 12.00 bis 14.30 Uhr"
              className="w-full border-b border-black/20 focus:border-black px-0 py-1.5 text-[14px] outline-none bg-transparent transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {tageskarte.sections.map((cat, ci) => (
            <div key={ci} className="mb-10">
              <div className="border-b border-black/30 pb-3 mb-6">
                <h3 className="text-[16px] font-bold uppercase" style={{ fontFamily: "'Futura Bold', sans-serif" }}>
                  {cat.category}
                </h3>
                <input
                  type="text"
                  value={cat.desc ?? ""}
                  onChange={(e) => updateCategoryDesc(ci, e.target.value)}
                  placeholder="Kategorie-Beschreibung (optional)"
                  className="mt-1 w-full text-[12px] opacity-50 outline-none border-none bg-transparent"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div className="flex flex-col gap-3">
                {cat.items.map((item, ii) => (
                  <div key={ii} className="flex gap-3 items-start group">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_80px] gap-2">
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
    </div>
  );
}
