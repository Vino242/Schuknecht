"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

const slideshowImages = [
  { src: "/Gemini_Generated_Image_hsp5zihsp5zihsp5.png", position: "object-center" },
  { src: "/IMG_4618.jpg", position: "object-top" },
  { src: "/Gemini_Generated_Image_k77bqak77bqak77b.png", position: "object-center" },
  { src: "/img11.jpg", position: "object-top" },
  { src: "/Gemini_Generated_Image_nv4tqanv4tqanv4t.png", position: "object-center" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [splashPhase, setSplashPhase] = useState<"center" | "slide" | "done">("center");
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [logoTarget, setLogoTarget] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const mobileTextRef = useRef<HTMLDivElement>(null);
  const [mobileTextVisible, setMobileTextVisible] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
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

  // Intersection Observer für mobile Text-Animation
  useEffect(() => {
    const el = mobileTextRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMobileTextVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white text-black md:pb-0">
      {/* ===== SPLASH OVERLAY ===== */}
      {splashPhase !== "done" && (
        <>
          {/* Weißer Hintergrund – fadet beim Slide aus */}
          <div
            className={`fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-700 ${
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

      {/* ===== First viewport (mobile) ===== */}
      <div className="h-screen flex flex-col md:h-auto md:min-h-screen">

      {/* ===== TOP: Logo bar ===== */}
      <div className="flex-shrink-0 relative flex items-center justify-between px-4 md:px-10 lg:px-16 min-h-[70px] max-h-[70px] md:min-h-[90px] md:max-h-[90px] lg:min-h-[130px] lg:max-h-[150px]">
        {/* Logo: left on mobile, right on desktop */}
        <a ref={logoRef} href="/" className={`relative h-[60px] w-[60px] md:h-[75px] lg:h-[100px] md:w-[75px] lg:w-[100px] flex-shrink-0 md:order-2 ${splashPhase !== "done" ? "invisible" : ""}`}>
          <Image
            src="/logo.png"
            alt="Schu Knecht Logo"
            fill
            className="object-contain"
            priority
          />
        </a>
        <div className="hidden md:block md:flex-1" />
        <MobileNav />
      </div>

      {/* ===== CENTER: 5-column grid, image in columns 4-5 (arc style) ===== */}
      <div
        className="md:flex-1 min-h-0 grid grid-cols-5 gap-0 md:gap-[19px] px-4 md:px-10 lg:px-16 mt-4"
      >
        {/* Image slideshow (mobile: 4 cols, desktop: right 2 cols) */}
        <div className="col-span-5 md:col-span-2 order-2 relative h-[55vh] md:h-auto md:min-h-[120vh] overflow-hidden">
          {slideshowImages.map((img, index) => (
            <Image
              key={img.src}
              src={img.src}
              alt={`Schuknecht ${index + 1}`}
              fill
              className={`object-cover ${img.position} transition-opacity duration-1000 ${
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
          <div className="hidden md:block mt-52 w-[85%] text-white overflow-hidden py-2.5" style={{ backgroundColor: "black" }}>
            <div
              className="whitespace-nowrap animate-marquee text-[14px] leading-[1.4em] font-normal"
              style={{ fontFamily: "'Futura Medium', sans-serif" }}
            >
              Willkommen im Schuknecht &nbsp;&nbsp;|&nbsp;&nbsp; So — Mi 09:30 — 20:00 &nbsp;&nbsp;|&nbsp;&nbsp; Do — Sa 09:30 — 00:00 &nbsp;&nbsp;|&nbsp;&nbsp; Schuknechtstr. 1, Darmstadt, Hessen 64289 &nbsp;&nbsp;|&nbsp;&nbsp; Willkommen im Schuknecht &nbsp;&nbsp;|&nbsp;&nbsp; So — Mi 09:30 — 20:00 &nbsp;&nbsp;|&nbsp;&nbsp; Do — Sa 09:30 — 00:00 &nbsp;&nbsp;|&nbsp;&nbsp; Schuknechtstr. 1, Darmstadt, Hessen 64289
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE: Ticker ===== */}
      <div className="md:hidden mx-4 mt-6 text-white overflow-hidden py-3 flex-shrink-0" style={{ backgroundColor: "black" }}>
        <div
          className="whitespace-nowrap animate-marquee-mobile text-[13px] leading-[1.4em] font-normal"
          style={{ fontFamily: "'Futura Medium', sans-serif" }}
        >
          Willkommen im Schuknecht &nbsp;&nbsp;|&nbsp;&nbsp; So — Mi 09:30 — 20:00 &nbsp;&nbsp;|&nbsp;&nbsp; Do — Sa 09:30 — 00:00 &nbsp;&nbsp;|&nbsp;&nbsp; Schuknechtstr. 1, Darmstadt, Hessen 64289
        </div>
      </div>
      <div className="flex-1 md:hidden" />

      {/* ===== DESKTOP: Footer nav ===== */}
      <footer className="hidden md:flex md:items-center md:gap-28 lg:gap-40 h-[60px] lg:h-[90px] px-4 md:px-10 lg:px-16 md:sticky md:bottom-0 bg-white z-40">
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

      {/* ===== MOBILE: Text below fold ===== */}
      <div ref={mobileTextRef} className="md:hidden px-6 pt-8 pb-12">
        <h2
          className="text-[clamp(2rem,8vw,3.5rem)] leading-[1.1] font-bold uppercase tracking-[-0.02em] transition-all duration-500 ease-out"
          style={{
            fontFamily: "'Futura Bold', sans-serif",
            transform: mobileTextVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileTextVisible ? 1 : 0,
          }}
        >
          SCHUKNECH<span className="serif-foot">T</span>
        </h2>
        <p
          className="mt-5 text-[14px] leading-[1.6em] font-light transition-all duration-500 ease-out"
          style={{
            fontFamily: "'Futura Medium', sans-serif",
            transform: mobileTextVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileTextVisible ? 1 : 0,
            transitionDelay: mobileTextVisible ? '120ms' : '0ms',
          }}
        >
          Mit viel Gespür für Qualität, saisonale Vielfalt und rein vegetarischer sowie veganer Küche ist das Schuknecht ein lebendiger Treffpunkt – vom kreativen Frühstück bis zu entspannten Sommerabenden mit besonderen Drinks.
        </p>

        {/* Kontakt */}
        <div
          className="mt-10 transition-all duration-500 ease-out"
          style={{
            transform: mobileTextVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileTextVisible ? 1 : 0,
            transitionDelay: mobileTextVisible ? '240ms' : '0ms',
          }}
        >
          <a
            href="/contact"
            className="inline-block px-6 py-3 text-[14px] tracking-[0.1em] uppercase text-white hover:opacity-80 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Bold', sans-serif", backgroundColor: "black" }}
          >
            Kontakt
          </a>
        </div>

        {/* Adresse & Zeiten */}
        <div
          className="mt-8 text-[13px] leading-[1.8em] transition-all duration-500 ease-out"
          style={{
            fontFamily: "'Futura Medium', sans-serif",
            transform: mobileTextVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileTextVisible ? 1 : 0,
            transitionDelay: mobileTextVisible ? '360ms' : '0ms',
          }}
        >
          <p>Schuknechtstr. 1, Darmstadt 64289</p>
          <p className="mt-2 opacity-50">So — Mi &nbsp; 09:30 — 20:00</p>
          <p className="opacity-50">Do — Sa &nbsp; 09:30 — 00:00</p>
        </div>
      </div>
    </div>
  );
}
