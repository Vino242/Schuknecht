"use client";

import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export default function Contact() {
  return (
    <div className="min-h-screen w-screen bg-white text-black flex flex-col">
      {/* ===== TOP: Logo bar ===== */}
      <div className="flex-shrink-0 relative flex items-center justify-between px-4 md:px-10 lg:px-16 min-h-[70px] max-h-[70px] md:min-h-[90px] md:max-h-[90px] lg:min-h-[130px] lg:max-h-[150px]">
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

      {/* ===== CENTER: 5-column grid ===== */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-5 gap-[19px] px-6 md:px-10 lg:px-16">
        {/* Left columns 1-3: Contact info */}
        <div className="md:col-span-3 flex flex-col items-start pt-0">
          <h1
            className="text-[clamp(3rem,7vw,90px)] leading-[1em] font-bold tracking-[-0.02em] uppercase text-black"
            style={{ fontFamily: "'Futura Bold', sans-serif" }}
          >
            KONTAKT
          </h1>

          {/* Adresse */}
          <div className="mt-10">
            <h3
              className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Adresse
            </h3>
            <p
              className="text-[18px] leading-[1.6em] font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Schuknechtstr. 1<br />
              64289 Darmstadt<br />
              Hessen
            </p>
          </div>

          {/* Telefon */}
          <div className="mt-8">
            <h3
              className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Telefon
            </h3>
            <a
              href="tel:+4915110657966"
              className="text-[18px] leading-[1.6em] font-light hover:opacity-50 transition-opacity"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              +49 151 10657966
            </a>
          </div>

          {/* Öffnungszeiten */}
          <div className="mt-8">
            <h3
              className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Öffnungszeiten
            </h3>
            <div
              className="text-[18px] leading-[1.8em] font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <div className="flex gap-6">
                <span className="w-[80px]">So — Mi</span>
                <span>09:30 — 20:00</span>
              </div>
              <div className="flex gap-6">
                <span className="w-[80px]">Do — Sa</span>
                <span>09:30 — 00:00</span>
              </div>
            </div>
          </div>

          {/* Google Maps Link */}
          <a
            href="https://maps.google.com/?q=Schuknechtstr.+1,+64289+Darmstadt"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-black text-white px-6 py-3 text-[13px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Route planen
          </a>
        </div>

        {/* Right columns 4-5: Google Maps Embed */}
        <div className="col-span-1 md:col-span-2 relative min-h-[50vh] md:min-h-[80vh]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2565.5!2d8.6513!3d49.8728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd7063b2a742f3%3A0x0!2sSchuknechtstr.%201%2C%2064289%20Darmstadt!5e0!3m2!1sde!2sde!4v1700000000000"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
