"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

const slideshowImages = [
  "/Bild1.png",
  "/SnapInsta.to_619267563_18309907135266547_7588622597534957389_n.jpg",
  "/SnapInsta.to_621663790_18310873372266547_8744142021882896224_n.jpg",
  "/SnapInsta.to_631810161_18312997990266547_8809735527891804484_n.jpg",
];

export default function Home() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [personen, setPersonen] = useState("2");
  const [datum, setDatum] = useState(() => new Date().toISOString().split("T")[0]);
  const [zeit, setZeit] = useState("19:00");
  const [name, setName] = useState("");
  const [telefon, setTelefon] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // Öffnungszeiten: So-Mi 09:30-20:00, Do-Sa 09:30-00:00
  // Letzte Reservierung 1h vor Schluss
  const getTimeRange = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    const day = d.getDay(); // 0=So, 1=Mo, ..., 4=Do, 5=Fr, 6=Sa
    const isDoSa = day >= 4 && day <= 6;
    return { min: "09:30", max: isDoSa ? "23:00" : "19:00" };
  };

  const timeRange = getTimeRange(datum);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Auto-open reservation panel after 3 seconds
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    const timer = setTimeout(() => setReserveOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen overflow-hidden md:h-auto md:min-h-screen md:overflow-visible w-screen bg-white text-black flex flex-col pb-[70px] md:pb-0">
      {/* ===== TOP: Logo bar ===== */}
      <div className="flex-shrink-0 relative flex items-center justify-end px-4 md:px-10 lg:px-16 min-h-[50px] max-h-[50px] md:min-h-[90px] md:max-h-[90px] lg:min-h-[130px] lg:max-h-[150px]">
        <MobileNav />
        {/* Logo right */}
        <a href="/" className="relative h-[35px] w-[35px] md:h-[75px] lg:h-[100px] md:w-[75px] lg:w-[100px] flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Schu Knecht Logo"
            fill
            className="object-contain"
            priority
          />
        </a>
      </div>

      {/* ===== CENTER: 5-column grid, image in columns 4-5 (arc style) ===== */}
      <div
        className="md:flex-1 min-h-0 grid grid-cols-5 gap-[8px] md:gap-[19px] px-4 md:px-10 lg:px-16"
      >
        {/* Image slideshow (mobile: right 3 cols, desktop: right 2 cols) */}
        <div className="col-span-3 md:col-span-2 order-2 relative aspect-[2/3] md:aspect-auto md:min-h-[120vh]">
          {slideshowImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Schuknecht ${index + 1}`}
              fill
              className={`object-cover object-center transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>

        {/* Title + ticker (mobile: right 2 cols, desktop: left 3 cols) */}
        <div className="col-span-2 md:col-span-3 order-1 flex flex-col items-start pt-4 md:pt-0">
          <h1
            className="text-[clamp(1.8rem,7vw,90px)] leading-[1em] font-bold tracking-[-0.02em] uppercase text-black"
            style={{ fontFamily: "'Futura Bold', sans-serif" }}
          >
            SCHU
            <br />
            KNECHT
          </h1>
          <h2
            className="hidden md:block mt-6 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Mit viel Gespür für Qualität, saisonale Vielfalt und rein
            vegetarischer sowie veganer Küche ist das Schuknecht ein lebendiger
            Treffpunkt – vom kreativen Frühstück bis zu entspannten
            Sommerabenden mit besonderen Drinks.
          </h2>

          {/* Marquee ticker (desktop only — inside left column) */}
          <div className="hidden md:block mt-16 w-[75%] bg-black text-white overflow-hidden py-2.5">
            <div
              className="whitespace-nowrap animate-marquee text-[14px] leading-[1.4em] font-normal"
              style={{ fontFamily: "'Futura Medium', sans-serif" }}
            >
              Willkommen im Schuknecht &nbsp;&nbsp;|&nbsp;&nbsp; So — Mi 09:30 — 20:00 &nbsp;&nbsp;|&nbsp;&nbsp; Do — Sa 09:30 — 00:00 &nbsp;&nbsp;|&nbsp;&nbsp; Schuknechtstr. 1, Darmstadt, Hessen 64289 &nbsp;&nbsp;|&nbsp;&nbsp; Willkommen im Schuknecht &nbsp;&nbsp;|&nbsp;&nbsp; So — Mi 09:30 — 20:00 &nbsp;&nbsp;|&nbsp;&nbsp; Do — Sa 09:30 — 00:00 &nbsp;&nbsp;|&nbsp;&nbsp; Schuknechtstr. 1, Darmstadt, Hessen 64289
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE: Spacer + Ticker + Spacer (1:2 ratio = ticker higher) ===== */}
      <div className="flex-[1] md:hidden" />
      <div className="md:hidden mx-4 bg-black text-white overflow-hidden py-3 flex-shrink-0">
        <div
          className="whitespace-nowrap animate-marquee-mobile text-[13px] leading-[1.4em] font-normal"
          style={{ fontFamily: "'Futura Medium', sans-serif" }}
        >
          Willkommen im Schuknecht &nbsp;&nbsp;|&nbsp;&nbsp; So — Mi 09:30 — 20:00 &nbsp;&nbsp;|&nbsp;&nbsp; Do — Sa 09:30 — 00:00 &nbsp;&nbsp;|&nbsp;&nbsp; Schuknechtstr. 1, Darmstadt, Hessen 64289
        </div>
      </div>
      <div className="flex-[2] md:hidden" />

      {/* ===== MOBILE: Reservieren fixed am unteren Rand ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-center h-[50px]">
          <button
            onClick={() => setReserveOpen(true)}
            className="border border-black/20 text-black px-5 py-2 text-[12px] tracking-[0.15em] uppercase hover:border-black/50 transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Reservieren
          </button>
        </div>
      </div>

      {/* ===== DESKTOP: Footer nav ===== */}
      <footer className="hidden md:grid md:grid-cols-6 md:items-center md:justify-items-center h-[60px] lg:h-[90px] px-6 md:px-10 lg:px-16 md:sticky md:bottom-0 bg-white z-40">
        <div className="hidden md:block">
          <a
            href="/karte"
            className="text-[21px] leading-[1.3em] font-normal lowercase text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            menü
          </a>
        </div>
        <div className="hidden md:block">
          <a
            href="/catering"
            className="text-[21px] leading-[1.3em] font-normal lowercase text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            catering
          </a>
        </div>
        <div className="hidden md:block">
          <a
            href="/menu"
            className="text-[21px] leading-[1.3em] font-normal lowercase text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            schuki
          </a>
        </div>
        <div className="hidden md:block">
          <a
            href="/contact"
            className="text-[21px] leading-[1.3em] font-normal lowercase text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            kontakt
          </a>
        </div>
        <div className="hidden md:block">
          <a
            href="/imprint"
            className="text-[21px] leading-[1.3em] font-normal lowercase text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            impressum
          </a>
        </div>
        <div className="md:justify-self-end">
          <button
            onClick={() => setReserveOpen(true)}
            className="border border-black/20 text-black px-5 py-2.5 md:px-6 md:py-3 text-[12px] md:text-[13px] tracking-[0.15em] uppercase hover:border-black/50 transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Reservieren
          </button>
        </div>
      </footer>

      {/* ===== RESERVATION POPUP WIDGET ===== */}
      <div
        className={`fixed bottom-20 right-4 md:bottom-24 md:right-10 w-[260px] md:w-[320px] rounded-xl shadow-2xl z-[100] overflow-hidden bg-white transform transition-all duration-500 ease-in-out origin-bottom-right ${
          reserveOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-black/10">
          <button
            onClick={() => setReserveOpen(false)}
            className="text-[20px] leading-none hover:opacity-50 transition-opacity"
          >
            &times;
          </button>
          <span
            className="text-[14px] tracking-[0.1em] uppercase font-bold"
            style={{ fontFamily: "'Futura Bold', sans-serif" }}
          >
            Schuknecht
          </span>
          <div className="w-5" />
        </div>

        {/* Form fields */}
        <form
          className="p-4 md:p-5 flex flex-col gap-2 md:gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const msg = `Hallo, ich möchte gerne einen Tisch reservieren:%0A%0AName: ${name}%0ATelefon: ${telefon}%0APersonen: ${personen}%0ADatum: ${datum}%0AUhrzeit: ${zeit}`;
            window.open(`https://wa.me/4915110657966?text=${msg}`, "_blank");
            setReserveOpen(false);
          }}
        >
          <div>
            <label className="block text-[11px] tracking-[0.12em] uppercase opacity-40 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vor- und Nachname"
              className="w-full border-b border-black/20 py-2 text-[15px] bg-transparent outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] tracking-[0.12em] uppercase opacity-40 mb-1">
              Telefon
            </label>
            <input
              type="tel"
              required
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="+49 ..."
              className="w-full border-b border-black/20 py-2 text-[15px] bg-transparent outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] tracking-[0.12em] uppercase opacity-40 mb-1">
              Personen
            </label>
            <select
              required
              value={personen}
              onChange={(e) => setPersonen(e.target.value)}
              className="w-full border-b border-black/20 py-2 text-[15px] bg-transparent outline-none focus:border-black transition-colors"
            >
              <option value="1">1 Person</option>
              <option value="2">2 Personen</option>
              <option value="3">3 Personen</option>
              <option value="4">4 Personen</option>
              <option value="5">5 Personen</option>
              <option value="6">6 Personen</option>
              <option value="7">7 Personen</option>
              <option value="8">8 Personen</option>
              <option value="9">9 Personen</option>
              <option value="10">10 Personen</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] tracking-[0.12em] uppercase opacity-40 mb-1">
              Datum
            </label>
            <input
              type="date"
              required
              min={today}
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              className="w-full border-b border-black/20 py-2 text-[15px] bg-transparent outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] tracking-[0.12em] uppercase opacity-40 mb-1">
              Zeit
            </label>
            <input
              type="time"
              required
              min={timeRange.min}
              max={timeRange.max}
              value={zeit}
              onChange={(e) => setZeit(e.target.value)}
              className="w-full border-b border-black/20 py-2 text-[15px] bg-transparent outline-none focus:border-black transition-colors"
            />
            <p className="text-[10px] opacity-40 mt-1">
              {datum && (() => {
                const d = new Date(datum + "T00:00:00");
                const day = d.getDay();
                const isDoSa = day >= 4 && day <= 6;
                return isDoSa ? "Do–Sa: 09:30 – 23:00 Uhr" : "So–Mi: 09:30 – 19:00 Uhr";
              })()}
            </p>
          </div>

          <button
            type="submit"
            className="mt-2 bg-black text-white py-3 text-[13px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
          >
            Reservierung anfragen
          </button>

          <p className="text-[10px] text-center opacity-40">
            Gruppen über 10 Personen bitte telefonisch anfragen.
          </p>
        </form>
      </div>
    </div>
  );
}
