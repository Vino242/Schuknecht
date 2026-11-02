import type { Metadata } from "next";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import { sections, intro, STAND } from "./sections";

export const metadata: Metadata = { title: "Datenschutz" };

export default function Datenschutz() {
  return (
    <div className="min-h-screen w-screen bg-white text-black flex flex-col">
      {/* ===== TOP: Logo bar ===== */}
      <div className="flex-shrink-0 sticky top-0 z-40 bg-white relative flex items-center justify-between px-4 md:px-10 lg:px-16 min-h-[70px] max-h-[70px] md:min-h-[90px] md:max-h-[90px] lg:min-h-[130px] lg:max-h-[150px]">
        <a href="/" className="relative h-[60px] w-[60px] md:h-[75px] lg:h-[100px] md:w-[75px] lg:w-[100px] flex-shrink-0 md:order-2">
          <Image
            src="/logo.png"
            alt="Schu Knecht Logo"
            fill
            sizes="100px"
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
          className="text-[clamp(2.5rem,7vw,90px)] leading-[1em] font-bold tracking-[0.05em] uppercase text-black"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          Datenschutz
        </h1>

        <div
          className="mt-10 max-w-[600px] text-[15px] md:text-[16px] leading-[1.8em] font-light flex flex-col gap-8 text-justify"
          style={{ fontFamily: "'Futura Medium', sans-serif", hyphens: "auto", WebkitHyphens: "auto", wordSpacing: "-0.02em" }}
        >
          <p>{intro}</p>

          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
                {section.title}
              </h3>
              {section.body}
            </div>
          ))}

          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Stand
            </h3>
            <p>
              {STAND}. Bei Änderungen an dieser Website passen wir diese Datenschutzerklärung an.
            </p>
          </div>

          <div className="pt-2">
            <a
              href="/imprint"
              className="text-[13px] tracking-[0.15em] uppercase opacity-40 hover:opacity-100 transition-opacity"
            >
              Impressum
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
