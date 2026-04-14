"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import settings from "@/data/settings.json";

const slideshowImages = [
  { src: "/slideshow/00b.jpg", position: "object-center" },
  { src: "/slideshow/02b.jpg", position: "object-center" },
  { src: "/slideshow/00a.jpg", position: "object-center" },
  { src: "/slideshow/01ajpg.jpg", position: "object-center" },
  { src: "/slideshow/01b.jpg", position: "object-center" },
  { src: "/slideshow/02a.jpg", position: "object-center" },
  { src: "/slideshow/03a.jpg", position: "object-center" },
  { src: "/slideshow/03b.jpg", position: "object-center" },
  { src: "/slideshow/04a.jpg", position: "object-center" },
  { src: "/slideshow/04b.jpg", position: "object-center" },
  { src: "/slideshow/05a.jpg", position: "object-center" },
  { src: "/slideshow/05b.jpg", position: "object-center" },
  { src: "/slideshow/06a.jpg", position: "object-center" },
  { src: "/slideshow/06b.jpg", position: "object-center" },
  { src: "/slideshow/06c.jpg", position: "object-center" },
  { src: "/slideshow/07a.jpg", position: "object-center" },
  { src: "/slideshow/07b.jpg", position: "object-center" },
  { src: "/slideshow/08a.jpg", position: "object-center" },
  { src: "/slideshow/08b.jpg", position: "object-center" },
  { src: "/slideshow/09.jpg", position: "object-center" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [splashPhase, setSplashPhase] = useState<"center" | "slide" | "done">("center");
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [logoTarget, setLogoTarget] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const mobileTextRef = useRef<HTMLDivElement>(null);
  const [mobileTextVisible, setMobileTextVisible] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [tickerWidth, setTickerWidth] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (titleRef.current) setTickerWidth(titleRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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
    <div className="w-full bg-white text-black pb-0 md:pb-24 lg:pb-28">
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

      {/* ===== RESERVATION MODAL ===== */}
      {reservationOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          onClick={() => setReservationOpen(false)}
        >
          <div
            className="bg-white p-8 max-w-[360px] w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setReservationOpen(false)}
              className="absolute top-4 right-4 text-black/40 hover:text-black text-xl leading-none"
            >
              ✕
            </button>
            <h3
              className="text-[11px] tracking-[0.2em] uppercase opacity-40 mb-4"
              style={{ fontFamily: "'Futura Medium', sans-serif" }}
            >
              Reservierung
            </h3>
            <p
              className="text-[15px] leading-[1.6em] font-light mb-6"
              style={{ fontFamily: "'Futura Medium', sans-serif" }}
            >
              Wir nehmen Reservierungen ausschließlich telefonisch entgegen. Ruf uns einfach an — wir freuen uns!
            </p>
            <a
              href="tel:+4961513924562"
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-[13px] tracking-[0.1em] uppercase hover:opacity-80 transition-opacity w-full"
              style={{ fontFamily: "'Futura Bold', sans-serif" }}
            >
              Jetzt anrufen
            </a>
          </div>
        </div>
      )}

      {/* ===== First viewport (mobile) ===== */}
      <div className="flex flex-col min-h-[100svh] md:min-h-0">

      {/* ===== TOP: Logo bar ===== */}
      <div className="flex-shrink-0 sticky top-0 z-40 bg-white relative flex items-center justify-between px-4 md:px-10 lg:px-16 min-h-[70px] max-h-[70px] md:min-h-[90px] md:max-h-[90px] lg:min-h-[130px] lg:max-h-[150px]">
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
        {/* Image slideshow (mobile: 70% right-aligned, desktop: right 2 cols) — 9:16 portrait */}
        <div className="col-span-5 md:col-span-2 order-2">
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden w-[70%] ml-auto md:w-full">
          {slideshowImages.map((img, index) => (
            <Image
              key={index}
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
        </div>

        {/* Title + ticker (desktop: left 3 cols) */}
        <div className="hidden md:flex col-span-3 order-1 flex-col items-start md:pt-0">
          {/* Title + ticker wrapped together so ticker width = title width */}
          <h1
            ref={titleRef}
            className="text-[clamp(3rem,7vw,90px)] leading-[1em] font-bold tracking-[0.05em] uppercase text-black whitespace-nowrap"
            style={{ fontFamily: "'Futura Bold', sans-serif", transform: "scaleY(1.08)" }}
          >
            SCHUKNECH<span className="serif-foot">T</span>
          </h1>
          <div className="mt-10 text-[15px] md:text-[16px] leading-[1.6em] font-light text-left" style={{ fontFamily: "'Futura Medium', sans-serif", textWrap: "pretty", width: tickerWidth ? `${tickerWidth * 0.95}px` : undefined }}>
            <p>Gutes Essen macht glücklich — nach diesem Motto begrüßen wir Dich im<br />Schuknecht — denn wir lieben gutes Essen und insbesondere gutes Frühstück.</p>
            <p className="mt-4">Auf unsere wechselnde Karte kommt nur, worauf wir selbst Lust haben und was uns schmeckt. Wir legen besonderen Wert auf die Qualität und Zubereitung unserer Produkte — sei es Quinoa aus dem Odenwald — oder Gemüse aus dem Ried.</p>
          </div>

          {/* Ticker — same width as SCHUKNECHT title */}
          <div className="mt-40 text-white overflow-hidden py-2.5" style={{ backgroundColor: "black", width: tickerWidth ? `${tickerWidth}px` : "70%" }}>
            <div
              className="whitespace-nowrap animate-marquee text-[14px] leading-[1.4em] font-normal"
              style={{ fontFamily: "'Futura Medium', sans-serif" }}
            >
              {settings.ticker} &nbsp;&nbsp;|&nbsp;&nbsp; {settings.ticker}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE: Ticker + Reservieren (pinned to bottom) ===== */}
      <div className="md:hidden mt-auto mb-3 mx-4">
        <div className="text-white overflow-hidden py-3" style={{ backgroundColor: "black" }}>
          <div
            className="whitespace-nowrap animate-marquee-mobile text-[13px] leading-[1.4em] font-normal"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            {settings.ticker}
          </div>
        </div>
        <div className="mt-12 flex justify-end">
          <button
            onClick={() => setReservationOpen(true)}
            className="px-5 py-2 border border-black/30 text-[13px] tracking-[0.1em] uppercase text-black/60 hover:border-black hover:text-black transition-colors duration-200"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            Tisch reservieren
          </button>
        </div>
      </div>

      {/* ===== DESKTOP: Footer nav ===== */}
      <footer className="hidden md:flex md:items-center md:justify-between h-[60px] lg:h-[90px] px-4 md:px-10 lg:px-16 md:fixed md:bottom-0 md:left-0 md:right-0 bg-white z-40">
        <div className="hidden md:block">
          <a
            href="/karte"
            className="text-[26px] leading-[1.3em] font-normal capitalize text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            karte
          </a>
        </div>
        <div className="hidden md:block">
          <a
            href="/menu"
            className="text-[26px] leading-[1.3em] font-normal capitalize text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            schuki
          </a>
        </div>
        <div className="hidden md:block">
          <a
            href="/catering"
            className="text-[26px] leading-[1.3em] font-normal capitalize text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            catering
          </a>
        </div>
        <div className="hidden md:block">
          <a
            href="/contact"
            className="text-[26px] leading-[1.3em] font-normal capitalize text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            kontakt
          </a>
        </div>
        <div className="hidden md:block">
          <a
            href="/imprint"
            className="text-[26px] leading-[1.3em] font-normal capitalize text-black hover:opacity-50 transition-opacity duration-300"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            impressum
          </a>
        </div>
        <div className="hidden md:block">
          <button
            onClick={() => setReservationOpen(true)}
            className="px-5 py-2 border border-black text-[14px] tracking-[0.08em] capitalize text-black hover:opacity-60 transition-opacity duration-200"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            Tisch reservieren
          </button>
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
        <div
          className="mt-5 text-[14px] leading-[1.6em] font-light text-justify transition-all duration-500 ease-out"
          style={{
            fontFamily: "'Futura Medium', sans-serif",
            hyphens: "auto",
            WebkitHyphens: "auto",
            wordSpacing: "-0.02em",
            transform: mobileTextVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileTextVisible ? 1 : 0,
            transitionDelay: mobileTextVisible ? '120ms' : '0ms',
          }}
        >
          <p>Gutes Essen macht glücklich — nach diesem Motto begrüßen wir Dich im Schuknecht — denn wir lieben gutes Essen und insbesondere <span style={{ whiteSpace: "nowrap" }}>gutes Frühstück.</span></p>
          <p className="mt-4">Auf unsere wechselnde Karte kommt nur, worauf wir selbst Lust haben und was uns schmeckt. Wir legen besonderen Wert auf die Qualität und Zubereitung unserer Produkte - sei es Quinoa aus dem Odenwald - oder Gemüse aus dem Ried.</p>
        </div>

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
          <button
            onClick={() => setReservationOpen(true)}
            className="ml-3 inline-block px-6 py-3 text-[14px] tracking-[0.1em] uppercase border border-black hover:bg-black hover:text-white transition-colors duration-200"
            style={{ fontFamily: "'Futura Bold', sans-serif" }}
          >
            Reservieren
          </button>
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
          {settings.oeffnungszeiten.map((z, i) => (
            <p key={i} className={`opacity-50${i === 0 ? " mt-2" : ""}`}>{z.tage} &nbsp; {z.zeit}</p>
          ))}
        </div>
      </div>

    </div>
  );
}
