import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import tageskarte from "@/data/tageskarte.json";

export default function Karte() {
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
      <div className="flex-1 px-6 md:px-10 lg:px-16 pt-6 pb-16">
        <h1
          className="text-[clamp(2.5rem,7vw,90px)] leading-[1.15em] font-bold tracking-[-0.02em] uppercase text-black"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          KARTE
        </h1>

        {/* ===== TAGESKARTE ===== */}
        <div className="mt-10 max-w-[800px] bg-[#f7f5f2] px-6 py-8 md:px-10 md:py-10">
          <div className="flex items-baseline gap-4 mb-8 border-b border-black/10 pb-4">
            <h2
              className="text-[clamp(1.4rem,3.5vw,32px)] font-bold tracking-[-0.01em] uppercase"
              style={{ fontFamily: "'Futura Bold', sans-serif" }}
            >
              Tageskarte
            </h2>
            <span
              className="text-[12px] opacity-40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {tageskarte.zeitraum}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {tageskarte.sections.map((section) => (
              <div key={section.category}>
                <div className="mb-4">
                  <h3
                    className="text-[clamp(1rem,2vw,18px)] font-bold uppercase tracking-[-0.01em]"
                    style={{ fontFamily: "'Futura Bold', sans-serif" }}
                  >
                    {section.category}
                  </h3>
                  {section.desc && (
                    <p
                      className="text-[11px] opacity-40 mt-0.5"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {section.desc}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-baseline gap-4">
                      <span
                        className="text-[14px] md:text-[15px] font-light flex-1"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="text-[14px] md:text-[15px] font-light whitespace-nowrap opacity-70"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item.price} €
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== KARTE ALS PDF ===== */}
        <div className="mt-16 max-w-[800px]">
          <div className="flex items-baseline justify-between mb-6 border-b border-black/10 pb-4">
            <h2
              className="text-[clamp(1.4rem,3.5vw,32px)] font-bold tracking-[-0.01em] uppercase"
              style={{ fontFamily: "'Futura Bold', sans-serif" }}
            >
              Speisekarte
            </h2>
            <a
              href="/speisekarte.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] tracking-[0.1em] uppercase opacity-40 hover:opacity-100 transition-opacity"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              PDF öffnen ↗
            </a>
          </div>

          <p
            className="text-[14px] leading-[1.6em] font-light opacity-60 mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Unsere vollständige Speise- und Getränkekarte — Frühstück, Mittagessen, Kaffee, Drinks und mehr.
          </p>
          <a
            href="/speisekarte.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-6 py-3 text-[13px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Futura Bold', sans-serif" }}
          >
            Karte öffnen
          </a>
        </div>
      </div>
    </div>
  );
}
