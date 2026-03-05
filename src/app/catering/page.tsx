"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

const slideshowImages = [
  "/catering/IMG_4603.jpg",
  "/catering/IMG_4604.jpg",
];

export default function Catering() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="min-h-screen w-screen bg-white text-black flex flex-col">
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

      {/* ===== MOBILE ONLY: Title above image ===== */}
      <div className="md:hidden px-6 pt-6">
        <h1
          className="text-[clamp(2rem,7vw,90px)] leading-[1em] font-bold tracking-[-0.02em] uppercase text-black"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          CATERING
        </h1>
      </div>

      {/* ===== CENTER: 5-column grid ===== */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-5 gap-[19px] px-6 md:px-10 lg:px-16">
        {/* Left columns 1-3: text */}
        <div className="hidden md:flex md:col-span-3 flex-col items-start pt-0">
          <h1
            className="text-[clamp(3rem,7vw,90px)] leading-[1em] font-bold tracking-[-0.02em] uppercase text-black"
            style={{ fontFamily: "'Futura Bold', sans-serif" }}
          >
            CATERING
          </h1>
          <p
            className="mt-6 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ihr plant ein Event, eine Feier oder ein besonderes Dinner? Wir bringen das Schuknecht zu euch — mit frischen, saisonalen Gerichten, die komplett vegetarisch oder vegan sind.
          </p>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ob Fingerfood für den Empfang, ein mehrgängiges Menü für den Geburtstag oder ein entspanntes Brunch-Buffet am Sonntagmorgen — wir stellen euch ein individuelles Angebot zusammen, das zu eurem Anlass passt.
          </p>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Unser Catering lebt von dem, was wir am besten können: kreative, pflanzliche Küche mit hochwertigen Zutaten aus der Region. Von Quinoa aus dem Odenwald bis zu Brot aus dem Martinsviertel — alles frisch zubereitet, mit Liebe angerichtet.
          </p>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.6em] font-light max-w-[440px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Schreibt uns einfach eine Nachricht mit euren Wünschen — wir melden uns schnellstmöglich mit einem unverbindlichen Angebot.
          </p>
          <a
            href="mailto:mail@schuknecht.net?subject=Catering-Anfrage"
            className="mt-8 inline-block bg-black text-white px-6 py-3 text-[13px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Catering anfragen
          </a>
        </div>

        {/* Right columns 4-5: slideshow */}
        <div className="col-span-1 md:col-span-2 relative min-h-[55vh] md:min-h-[120vh]">
          {slideshowImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Catering ${index + 1}`}
              fill
              className={`object-cover object-center transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
      </div>

      {/* ===== MOBILE: Text below image ===== */}
      <div className="md:hidden px-6 py-10">
        <p
          className="mt-4 text-[14px] leading-[1.6em] font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Ihr plant ein Event, eine Feier oder ein besonderes Dinner? Wir bringen das Schuknecht zu euch — mit frischen, saisonalen Gerichten, die komplett vegetarisch oder vegan sind.
        </p>
        <p
          className="mt-3 text-[14px] leading-[1.6em] font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Ob Fingerfood für den Empfang, ein mehrgängiges Menü für den Geburtstag oder ein entspanntes Brunch-Buffet am Sonntagmorgen — wir stellen euch ein individuelles Angebot zusammen, das zu eurem Anlass passt.
        </p>
        <p
          className="mt-3 text-[14px] leading-[1.6em] font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Unser Catering lebt von dem, was wir am besten können: kreative, pflanzliche Küche mit hochwertigen Zutaten aus der Region.
        </p>
        <p
          className="mt-3 text-[14px] leading-[1.6em] font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Schreibt uns einfach eine Nachricht mit euren Wünschen — wir melden uns schnellstmöglich mit einem unverbindlichen Angebot.
        </p>
        <a
          href="mailto:mail@schuknecht.net?subject=Catering-Anfrage"
          className="mt-6 inline-block bg-black text-white px-5 py-2.5 text-[12px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Catering anfragen
        </a>
      </div>
    </div>
  );
}
