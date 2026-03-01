"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

const slideshowImages = [
  "/Bild1.png",
  "/SnapInsta.to_619267563_18309907135266547_7588622597534957389_n.jpg",
  "/SnapInsta.to_621663790_18310873372266547_8744142021882896224_n.jpg",
  "/SnapInsta.to_631810161_18312997990266547_8809735527891804484_n.jpg",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [splashPhase, setSplashPhase] = useState<"center" | "slide" | "done">("center");
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [logoTarget, setLogoTarget] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Splash: 1s zentriert, dann zum Header gleiten
  useEffect(() => {
    const timer = setTimeout(() => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        setLogoTarget({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
      }
      setSplashPhase("slide");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Splash entfernen nach Slide-Animation
  useEffect(() => {
    if (splashPhase === "slide") {
      const timer = setTimeout(() => setSplashPhase("done"), 800);
      return () => clearTimeout(timer);
    }
  }, [splashPhase]);

  return (
    <div className="h-screen overflow-hidden md:h-auto md:min-h-screen md:overflow-visible w-screen bg-[#f2efe8] text-black flex flex-col md:pb-0">
      {/* ===== SPLASH OVERLAY ===== */}
      {splashPhase !== "done" && (
        <>
          {/* Weißer Hintergrund – fadet beim Slide aus */}
          <div
            className={`fixed inset-0 z-50 bg-[#f2efe8] pointer-events-none transition-opacity duration-700 ${
              splashPhase === "slide" ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Animiertes Logo – gleitet von Mitte zur Header-Position */}
          <div
            className="fixed z-[51] pointer-events-none transition-all duration-700 ease-in-out"
            style={
              splashPhase === "center"
                ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 200, height: 200 }
                : logoTarget
                ? { top: logoTarget.top, left: logoTarget.left, transform: "translate(0, 0)", width: logoTarget.width, height: logoTarget.height }
                : { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 200, height: 200 }
            }
          >
            <div className={`w-full h-full relative ${splashPhase === "center" ? "animate-spin-once" : ""}`}>
              <Image src="/logo.png" alt="Schu Knecht Logo" fill className="object-contain" priority />
            </div>
          </div>
        </>
      )}

      {/* ===== TOP: Logo bar ===== */}
      <div className="flex-shrink-0 relative flex items-center justify-between px-4 md:px-10 lg:px-16 min-h-[70px] max-h-[70px] md:min-h-[90px] md:max-h-[90px] lg:min-h-[130px] lg:max-h-[150px]">
        {/* Logo left */}
        <a ref={logoRef} href="/" className={`relative h-[60px] w-[60px] md:h-[75px] lg:h-[100px] md:w-[75px] lg:w-[100px] flex-shrink-0 ${splashPhase !== "done" ? "invisible" : ""}`}>
          <Image
            src="/logo.png"
            alt="Schu Knecht Logo"
            fill
            className="object-contain"
            priority
          />
        </a>
        <MobileNav />
      </div>

      {/* ===== CENTER: 5-column grid, image in columns 4-5 (arc style) ===== */}
      <div
        className="md:flex-1 min-h-0 grid grid-cols-5 gap-0 md:gap-[19px] px-4 md:px-10 lg:px-16 mt-4"
      >
        {/* Image slideshow (mobile: 4 cols, desktop: right 2 cols) */}
        <div className="col-span-5 md:col-span-2 order-2 relative aspect-[3/4] max-h-[55vh] md:max-h-none md:aspect-auto md:min-h-[120vh]">
          {slideshowImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Schuknecht ${index + 1}`}
              fill
              className={`object-cover object-bottom transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>

        {/* Title + ticker (mobile: 1 col vertical, desktop: left 3 cols) */}
        <div className="hidden md:flex col-span-3 order-1 flex-col items-start md:pt-0">
          {/* Desktop: horizontal SCHUKNECHT */}
          <h1
            className="hidden md:block text-[clamp(1.8rem,7vw,90px)] leading-[1em] font-bold tracking-[0.05em] uppercase text-black"
            style={{ fontFamily: "'Futura Bold', sans-serif", transform: "scaleY(1.08)" }}
          >
            SCHUKNECH<span className="serif-foot">T</span>
          </h1>
          <h2
            className="hidden md:block mt-6 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[560px] text-justify"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            Mit viel Gespür für Qualität, saisonale Vielfalt und rein
            vegetarischer sowie veganer Küche ist das Schuknecht ein lebendiger
            Treffpunkt – vom kreativen Frühstück bis zu entspannten
            Sommerabenden mit besonderen Drinks.
          </h2>

          {/* Marquee ticker (desktop only — inside left column) */}
          <div className="hidden md:block mt-52 w-[85%] text-white overflow-hidden py-2.5" style={{ backgroundColor: "rgb(207, 46, 46)" }}>
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
      <div className="md:hidden mx-4 text-white overflow-hidden py-3 flex-shrink-0" style={{ backgroundColor: "rgb(207, 46, 46)" }}>
        <div
          className="whitespace-nowrap animate-marquee-mobile text-[13px] leading-[1.4em] font-normal"
          style={{ fontFamily: "'Futura Medium', sans-serif" }}
        >
          Willkommen im Schuknecht &nbsp;&nbsp;|&nbsp;&nbsp; So — Mi 09:30 — 20:00 &nbsp;&nbsp;|&nbsp;&nbsp; Do — Sa 09:30 — 00:00 &nbsp;&nbsp;|&nbsp;&nbsp; Schuknechtstr. 1, Darmstadt, Hessen 64289
        </div>
      </div>
      <div className="flex-[2] md:hidden" />

      {/* ===== DESKTOP: Footer nav ===== */}
      <footer className="hidden md:flex md:items-center md:gap-28 lg:gap-40 h-[60px] lg:h-[90px] px-4 md:px-10 lg:px-16 md:sticky md:bottom-0 bg-[#f2efe8] z-40">
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
      </footer>
    </div>
  );
}
