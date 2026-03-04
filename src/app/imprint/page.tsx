"use client";

import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export default function Imprint() {
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

      {/* ===== Content ===== */}
      <div className="flex-1 px-6 md:px-10 lg:px-16 pb-16">
        <h1
          className="text-[clamp(2.5rem,7vw,90px)] leading-[1em] font-bold tracking-[-0.02em] uppercase text-black"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          Impressum
        </h1>

        <div
          className="mt-10 max-w-[600px] text-[16px] md:text-[18px] leading-[1.8em] font-light flex flex-col gap-8"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {/* Angaben gemäß § 5 TMG */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Angaben gemäß § 5 TMG
            </h3>
            <p>
              Nurhan Vural<br />
              Schuknecht Café &amp; Bar<br />
              Schuknechtstr. 1<br />
              64289 Darmstadt
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Kontakt
            </h3>
            <p>
              Telefon: +49 151 10657966<br />
              E-Mail: mail@schuknecht.net
            </p>
          </div>

          {/* Verantwortlich für den Inhalt */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h3>
            <p>
              Nurhan Vural<br />
              Schuknechtstr. 1<br />
              64289 Darmstadt
            </p>
          </div>

          {/* Haftungsausschluss */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Haftungsausschluss
            </h3>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </div>

          {/* Urheberrecht */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Urheberrecht
            </h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
