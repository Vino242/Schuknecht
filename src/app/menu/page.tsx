"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

const galleryImages = [
  "/schuki/SnapInsta.to_571416637_18298987600266547_3405723530171740079_n.jpg",
  "/schuki/SnapInsta.to_571798906_18298987576266547_7559366974313528418_n.jpg",
  "/schuki/SnapInsta.to_572126642_18298987573266547_141197245182427405_n.jpg",
  "/schuki/SnapInsta.to_572158971_18298987591266547_3827719316460653812_n.jpg",
  "/schuki/SnapInsta.to_573283502_18298987549266547_9156242153154724135_n.jpg",
  "/schuki/SnapInsta.to_573341431_18298987564266547_6795980787638574488_n.jpg",
  "/schuki/SnapInsta.to_573496149_18298987546266547_2808062395761828047_n.jpg",
  "/schuki/SnapInsta.to_573657062_18298987603266547_6406355972972956997_n.jpg",
  "/schuki/SnapInsta.to_574348949_18298987531266547_7203622640070163603_n.jpg",
];

export default function Menu() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen w-screen bg-white text-black flex flex-col">
      {/* ===== LIGHTBOX ===== */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none z-10" onClick={() => setLightbox(null)}>✕</button>
          <button className="absolute left-4 text-white/70 hover:text-white text-5xl leading-none px-4 py-8 z-10" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length); }}>‹</button>
          <div className="relative w-full h-full max-w-4xl mx-auto px-16 py-12" onClick={(e) => e.stopPropagation()}>
            <Image src={galleryImages[lightbox]} alt={`Schuki ${lightbox + 1}`} fill className="object-contain" />
          </div>
          <button className="absolute right-4 text-white/70 hover:text-white text-5xl leading-none px-4 py-8 z-10" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }}>›</button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-[13px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lightbox + 1} / {galleryImages.length}</div>
        </div>
      )}
      {/* ===== TOP: Logo bar ===== */}
      <div className="flex-shrink-0 sticky top-0 z-40 bg-white relative flex items-center justify-between px-4 md:px-10 lg:px-16 min-h-[70px] max-h-[70px] md:min-h-[90px] md:max-h-[90px] lg:min-h-[130px] lg:max-h-[150px]">
        <a href="/" className="relative h-[60px] w-[60px] md:h-[75px] lg:h-[100px] md:w-[75px] lg:w-[100px] flex-shrink-0 md:order-2">
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
        className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-5 gap-[19px] px-6 md:px-10 lg:px-16"
      >
        {/* Left columns 1-3: SCHUKI title + menu content */}
        <div className="hidden md:flex md:col-span-3 flex-col items-start pt-0">
          <h1
            className="text-[clamp(3rem,7vw,90px)] leading-[1em] font-bold tracking-[-0.02em] uppercase text-black"
            style={{ fontFamily: "'Futura Bold', sans-serif" }}
          >
            SCHUKI
          </h1>
          <p
            className="mt-6 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Wir freuen uns riesig, dass unser kleiner Ableger vom Schuknecht endlich seine Pforten öffnet.
          </p>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Schuki ist da, um geteilt zu werden: Ein Ort für kreative Köpfe, Foodies, Gastgeber:innen, Nachbar:innen — für alle, die Lust haben, etwas auf die Beine zu stellen.
          </p>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ob Pop-Up, Dinnerabend, Workshop oder kleine, private Feier — Schuki lebt von euch und euren Ideen. Ein Ort für alle, die Lust haben, sich kulinarisch auszuprobieren, Neues zu wagen oder einfach gemeinsam schöne Momente zu gestalten.
          </p>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Bei uns kannst du das Schuki mieten — tageweise, wochenweise oder für besondere Anlässe. Und wer etwas Größeres plant, kann zusätzlich auch das Studio von @a.paevi nebenan dazu buchen, um mehr Platz zu haben.
          </p>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Schuki lebt von euch — von euren Ideen, eurer Kreativität, eurer Leidenschaft für gutes Essen und schöne Begegnungen.
          </p>
          <a
            href="mailto:mail@schuknecht.net"
            className="mt-8 inline-block bg-black text-white px-6 py-3 text-[13px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Schuki anfragen
          </a>
        </div>

        {/* Right columns 4-5: video */}
        <div className="col-span-1 md:col-span-2 relative min-h-[60vh] md:min-h-[80vh]">
          <video
            ref={videoRef}
            src="/schuki/SnapInsta.to_AQMACyNywDypoIFjdf67dcRnnIqbY2uxmAi7JXceZVvtlAsx0WO1WMWPcy_i0221xjHQ70OKYngGuizswF5obsgR.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* ===== MOBILE ONLY: Text between video and gallery ===== */}
      <div className="md:hidden px-6 py-10">
        <h1
          className="text-[clamp(2rem,7vw,90px)] leading-[1em] font-bold tracking-[-0.02em] uppercase text-black"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          SCHUKI
        </h1>
        <p
          className="mt-4 text-[14px] leading-[1.6em] font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Wir freuen uns riesig, dass unser kleiner Ableger vom Schuknecht endlich seine Pforten öffnet.
        </p>
        <p
          className="mt-3 text-[14px] leading-[1.6em] font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Schuki ist da, um geteilt zu werden: Ein Ort für kreative Köpfe, Foodies, Gastgeber:innen, Nachbar:innen — für alle, die Lust haben, etwas auf die Beine zu stellen.
        </p>
        <p
          className="mt-3 text-[14px] leading-[1.6em] font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Ob Pop-Up, Dinnerabend, Workshop oder kleine, private Feier — Schuki lebt von euch und euren Ideen. Ein Ort für alle, die Lust haben, sich kulinarisch auszuprobieren, Neues zu wagen oder einfach gemeinsam schöne Momente zu gestalten.
        </p>
        <p
          className="mt-3 text-[14px] leading-[1.6em] font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Bei uns kannst du das Schuki mieten — tageweise, wochenweise oder für besondere Anlässe. Und wer etwas Größeres plant, kann zusätzlich auch das Studio von @a.paevi nebenan dazu buchen, um mehr Platz zu haben.
        </p>
        <p
          className="mt-3 text-[14px] leading-[1.6em] font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Schuki lebt von euch — von euren Ideen, eurer Kreativität, eurer Leidenschaft für gutes Essen und schöne Begegnungen.
        </p>
        <a
          href="mailto:mail@schuknecht.net"
          className="mt-6 inline-block bg-black text-white px-5 py-2.5 text-[12px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Schuki anfragen
        </a>
      </div>

      {/* ===== GALLERY: Schuki Bilder ===== */}
      <div className="px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[19px]">
          {galleryImages.map((src, i) => (
            <div key={src} className="relative aspect-[4/5] cursor-pointer overflow-hidden group" onClick={() => setLightbox(i)}>
              <Image src={src} alt={`Schuki ${i + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
