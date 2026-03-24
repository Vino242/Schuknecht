"use client";

import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export default function About() {
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

      {/* ===== CENTER: 5-column grid, image in columns 4-5 ===== */}
      <div
        className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-5 gap-[19px] px-6 md:px-10 lg:px-16"
      >
        {/* Left columns 1-3: ÜBER UNS title + text */}
        <div className="hidden md:flex md:col-span-3 flex-col items-start pt-0">
          <h1
            className="text-[clamp(3rem,7vw,90px)] leading-[1em] font-bold tracking-[0.05em] uppercase text-black"
            style={{ fontFamily: "'Futura Bold', sans-serif" }}
          >
            ÜBER
            <br />
            UNS
          </h1>
          <p
            className="mt-6 text-[15px] md:text-[16px] leading-[1.6em] font-light max-w-[480px] text-justify"
            style={{ fontFamily: "'Futura Medium', sans-serif", hyphens: "auto", WebkitHyphens: "auto", wordSpacing: "-0.02em" }}
          >
            Ein frischer Wind weht durchs Schuknecht am Schlossgartenplatz. Nuri Vural, eine Bekanntheit in der Darmstädter Gastronomieszene, übernimmt die Führung des Cafés im Herzen des Martinsviertels.
          </p>
          <p
            className="mt-4 text-[15px] md:text-[16px] leading-[1.6em] font-light max-w-[480px] text-justify"
            style={{ fontFamily: "'Futura Medium', sans-serif", hyphens: "auto", WebkitHyphens: "auto", wordSpacing: "-0.02em" }}
          >
            Nuri hat Lust auf Vielfalt — und ein Auge für Qualität: Ihre Küchenerfahrung bringt sie in einer wechselnden Karte ein, mit einer erlesenen Auswahl an saisonal abgestimmten Speisen mit frischen Zutaten — darunter Quinoa aus dem Odenwald und Brot aus dem Martinsviertel.
          </p>
          <p
            className="mt-4 text-[15px] md:text-[16px] leading-[1.6em] font-light max-w-[480px] text-justify"
            style={{ fontFamily: "'Futura Medium', sans-serif", hyphens: "auto", WebkitHyphens: "auto", wordSpacing: "-0.02em" }}
          >
            Eine Sache steht fest: Alles ist vegan oder vegetarisch. Von veganem Tofu-Rührei mit frischen Kräutern über Frühstücksburritos bis hin zu Rührei &bdquo;Menemen&ldquo; à la turka — die Frühstückslandschaft des Viertels bekommt frischen Wind.
          </p>
          <p
            className="mt-4 text-[15px] md:text-[16px] leading-[1.6em] font-light max-w-[480px] text-justify"
            style={{ fontFamily: "'Futura Medium', sans-serif", hyphens: "auto", WebkitHyphens: "auto", wordSpacing: "-0.02em" }}
          >
            Am Donnerstag, Freitag und Samstag ab 18 Uhr bieten wir wechselnde Getränkespecials — ausgefallene Spirituosen zu originellen Cocktails, in vier Wirkungsgraden von &bdquo;ohne Alkohol&ldquo; bis &bdquo;stark&ldquo;.
          </p>
          <p
            className="mt-4 text-[15px] md:text-[16px] leading-[1.6em] font-light max-w-[480px] text-justify"
            style={{ fontFamily: "'Futura Medium', sans-serif", hyphens: "auto", WebkitHyphens: "auto", wordSpacing: "-0.02em" }}
          >
            Was bleibt: Unsere hauseigene Konditorin Liza und mit ihr das unschlagbare Schuknecht-Kuchensortiment — auch vegan und glutenfrei — sowie unser fresches Team und das vertraute Gesicht des Cafés.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block bg-black text-white px-6 py-3 text-[13px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Futura Medium', sans-serif" }}
          >
            Kontakt
          </a>
        </div>

        {/* Right columns 4-5: image */}
        <div className="col-span-1 md:col-span-2 relative min-h-[60vh] md:min-h-[80vh]">
          <Image
            src="/ueber/SnapInsta.to_580485830_1607661643931805_1787513410864216100_n.jpg"
            alt="Schuknecht Über Uns"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  );
}
