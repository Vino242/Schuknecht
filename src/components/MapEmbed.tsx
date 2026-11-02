"use client";

import { useState } from "react";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2565.5!2d8.6513!3d49.8728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd7063b2a742f3%3A0x0!2sSchuknechtstr.%201%2C%2064289%20Darmstadt!5e0!3m2!1sde!2sde!4v1700000000000";

export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={MAP_SRC}
        title="Karte: Schuknechtstr. 1, 64289 Darmstadt"
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/[0.03] border border-black/10 px-6 text-center">
      <h3
        className="text-[13px] tracking-[0.15em] uppercase opacity-40"
        style={{ fontFamily: "'Futura Medium', sans-serif" }}
      >
        Karte
      </h3>
      <p
        className="max-w-[320px] text-[14px] leading-[1.6em] font-light opacity-60"
        style={{ fontFamily: "'Futura Medium', sans-serif" }}
      >
        Beim Laden der Karte werden Daten an Google übertragen. Mehr dazu in der{" "}
        <a href="/datenschutz" className="underline hover:opacity-60 transition-opacity">
          Datenschutzerklärung
        </a>
        .
      </p>
      <button
        onClick={() => setLoaded(true)}
        className="bg-black text-white px-6 py-3 text-[13px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
        style={{ fontFamily: "'Futura Medium', sans-serif" }}
      >
        Karte laden
      </button>
    </div>
  );
}
