"use client";

import Image from "next/image";
import MobileNav from "@/components/MobileNav";

const menu = [
  {
    category: "Wochengerichte",
    highlight: true,
    items: [
      { name: "Blumenkohl-Steak", desc: "mit Tahini-Dressing, gerösteten Kichererbsen & Granatapfel", price: "14,50" },
      { name: "Kürbis-Risotto", desc: "cremig mit Salbei, gerösteten Walnüssen & veganem Parmesan", price: "13,80" },
      { name: "Rote-Bete-Burger", desc: "mit Avocado, Rucola, eingelegten Zwiebeln & Süßkartoffel-Pommes", price: "15,20" },
    ],
  },
  {
    category: "Frühstück",
    items: [
      { name: "Schuknecht Frühstück", desc: "Hummus, Avocado, Ofentomaten, Brot aus dem Martinsviertel, Aufstriche & Obst", price: "12,90" },
      { name: "Tofu-Rührei (vegan)", desc: "mit frischen Kräutern, Tomaten & geröstetem Sauerteig", price: "10,50" },
      { name: "Menemen à la Turka", desc: "Rührei mit Paprika, Tomaten, Zwiebeln & Fladenbrot", price: "11,80" },
      { name: "Frühstücks-Burrito", desc: "gefüllt mit Scramble, schwarzen Bohnen, Avocado & Salsa", price: "11,50" },
      { name: "Açaí Bowl", desc: "mit Granola, frischen Früchten, Kokos & Agavendicksaft", price: "10,90" },
      { name: "Porridge", desc: "Haferbrei mit saisonalem Obst, Nüssen & Ahornsirup", price: "8,50" },
    ],
  },
  {
    category: "Essen",
    items: [
      { name: "Buddha Bowl", desc: "Quinoa aus dem Odenwald, geröstetes Gemüse, Edamame, Erdnuss-Dressing", price: "13,90" },
      { name: "Süßkartoffel-Curry", desc: "mit Kokosmilch, Spinat, Cashews & Basmatireis", price: "12,80" },
      { name: "Flammkuchen", desc: "mit Crème fraîche, Zwiebeln, Pilzen & frischem Thymian", price: "11,50" },
      { name: "Mezze-Teller", desc: "Hummus, Babaganoush, Falafel, Tabouleh & warmes Fladenbrot", price: "14,50" },
    ],
  },
  {
    category: "Kaffee",
    items: [
      { name: "Espresso", price: "2,80" },
      { name: "Doppelter Espresso", price: "3,50" },
      { name: "Cappuccino", price: "3,90" },
      { name: "Flat White", price: "4,20" },
      { name: "Café Latte", price: "4,20" },
      { name: "Filterkaffee", price: "3,20" },
      { name: "Affogato", desc: "Espresso über veganes Vanilleeis", price: "5,50" },
    ],
  },
  {
    category: "Matcha & Tee",
    items: [
      { name: "Matcha Latte", price: "4,80" },
      { name: "Iced Matcha Latte", price: "5,20" },
      { name: "Matcha Shot", price: "3,50" },
      { name: "Chai Latte", desc: "hausgemacht mit frischen Gewürzen", price: "4,50" },
      { name: "Frische Minze", desc: "mit heißem Wasser & Honig", price: "3,80" },
    ],
  },
  {
    category: "Kaltgetränke",
    items: [
      { name: "Hausgemachte Limonade", desc: "Zitrone-Ingwer oder Rhabarber-Rosmarin", price: "4,50" },
      { name: "Iced Coffee", desc: "kalt gebrüht, auf Eis", price: "4,20" },
      { name: "Kombucha", desc: "vom Fass, wechselnde Sorten", price: "4,80" },
      { name: "Fritz-Kola / Limo", price: "3,50" },
      { name: "Club Mate", price: "3,20" },
      { name: "Apfelschorle", desc: "naturtrüb", price: "3,20" },
    ],
  },
  {
    category: "Cocktails & Drinks",
    desc: "Do — Sa ab 18 Uhr · in vier Wirkungsgraden: ohne · leicht · mittel · stark",
    items: [
      { name: "Schuknecht Spritz", desc: "Aperol, Prosecco, Rosmarin & Grapefruit", price: "9,50" },
      { name: "Gurke-Basilikum Smash", desc: "Gin, frische Gurke, Basilikum & Limette", price: "10,50" },
      { name: "Mango-Chili Margarita", desc: "Tequila, Mango, Chili & Limette", price: "11,00" },
      { name: "Nuri's Negroni", desc: "Gin, Campari, süßer Wermut & Orangenzeste", price: "10,50" },
    ],
  },
];

export default function Karte() {
  return (
    <div className="min-h-screen w-screen bg-[#f2efe8] text-black flex flex-col">
      {/* ===== TOP: Logo bar ===== */}
      <div className="flex-shrink-0 relative flex items-center justify-between px-4 md:px-10 lg:px-16 min-h-[70px] max-h-[70px] md:min-h-[90px] md:max-h-[90px] lg:min-h-[130px] lg:max-h-[150px]">
        <a href="/" className="relative h-[60px] w-[60px] md:h-[75px] lg:h-[100px] md:w-[75px] lg:w-[100px] flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Schu Knecht Logo"
            fill
            className="object-contain"
            priority
          />
        </a>
        <MobileNav />
      </div>

      {/* ===== Content ===== */}
      <div className="flex-1 px-6 md:px-10 lg:px-16 pb-16">
        <h1
          className="text-[clamp(2.5rem,7vw,90px)] leading-[1em] font-bold tracking-[-0.02em] uppercase text-black"
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
                  className={`text-[clamp(1.2rem,3vw,28px)] font-bold tracking-[-0.01em] uppercase ${section.highlight ? "text-black" : "text-black"}`}
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
                {section.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-baseline gap-4">
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
