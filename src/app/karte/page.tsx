import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import menuData from "@/data/menu.json";

const menu = menuData;

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
      <div className="flex-1 px-6 md:px-10 lg:px-16 pt-14 pb-16">
        <h1
          className="text-[clamp(2.5rem,7vw,90px)] leading-[1.15em] font-bold tracking-[-0.02em] uppercase text-black"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          MENÜ
        </h1>

        <div className="mt-10 max-w-[800px] flex flex-col gap-12">
          {menu.map((section) => (
            <div key={section.category}>
              {/* Category header */}
              <div className="border-b border-black/10 pb-2 mb-6">
                <h2
                  className="text-[clamp(1.2rem,3vw,28px)] font-bold tracking-[-0.01em] uppercase text-black"
                  style={{ fontFamily: "'Futura Bold', sans-serif" }}
                >
                  {section.category}
                </h2>
                {section.desc && (
                  <p
                    className="text-[12px] md:text-[13px] opacity-50 mt-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {section.desc}
                  </p>
                )}
              </div>

              {/* Items */}
              <div className="flex flex-col gap-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-baseline gap-4">
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[15px] md:text-[17px] font-normal"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item.name}
                      </span>
                      {item.desc && (
                        <span
                          className="block text-[12px] md:text-[13px] opacity-40 mt-0.5"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.desc}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[15px] md:text-[17px] font-normal whitespace-nowrap"
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

        {/* Hinweis */}
        <p
          className="mt-16 text-[12px] md:text-[13px] opacity-40 max-w-[600px]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Alle Speisen sind vegetarisch oder vegan. Allergene und Zusatzstoffe auf Nachfrage. Preise inkl. MwSt. Die Wochengerichte wechseln regelmäßig — folgt uns auf Instagram für Updates.
        </p>
      </div>
    </div>
  );
}
