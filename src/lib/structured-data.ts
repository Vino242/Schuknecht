import settings from "@/data/settings.json";

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const SCHEMA_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// "So — Mi" -> Sunday bis Wednesday, auch über das Wochenende hinweg
function parseDays(text: string): string[] | null {
  const parts = text.split(/[—–-]/).map((part) => part.trim().slice(0, 2));
  const start = DAYS.indexOf(parts[0]);
  const end = DAYS.indexOf(parts[parts.length - 1]);
  if (start < 0 || end < 0 || parts.length > 2) return null;
  const days: string[] = [];
  for (let i = start; ; i = (i + 1) % 7) {
    days.push(SCHEMA_DAYS[i]);
    if (i === end) break;
  }
  return days;
}

// "09:30 — 00:00" -> ["09:30", "23:59"], Mitternacht als Tagesende
function parseTimes(text: string): [string, string] | null {
  const match = text.match(/(\d{1,2}:\d{2})\s*[—–-]\s*(\d{1,2}:\d{2})/);
  if (!match) return null;
  const opens = match[1].padStart(5, "0");
  const closes = match[2] === "00:00" ? "23:59" : match[2].padStart(5, "0");
  return [opens, closes];
}

// Öffnungszeiten kommen aus dem Admin-Panel. Passt ein Eintrag nicht ins Schema, lieber keine als falsche.
function openingHours() {
  const specs = (settings.oeffnungszeiten ?? []).map(({ tage, zeit }) => {
    const days = parseDays(String(tage ?? ""));
    const times = parseTimes(String(zeit ?? ""));
    if (!days || !times) return null;
    return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: times[0], closes: times[1] };
  });
  return specs.length > 0 && specs.every(Boolean) ? specs : undefined;
}

export function restaurantJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Schuknecht",
    description,
    url: "https://schuknecht.net",
    image: "https://schuknecht.net/logo.png",
    telephone: "+49 6151 3924562",
    email: "mail@schuknecht.net",
    servesCuisine: ["Vegetarisch", "Vegan"],
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Schuknechtstr. 1",
      postalCode: "64289",
      addressLocality: "Darmstadt",
      addressRegion: "Hessen",
      addressCountry: "DE",
    },
    openingHoursSpecification: openingHours(),
  };
}
