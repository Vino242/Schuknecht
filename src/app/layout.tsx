import type { Metadata, Viewport } from "next";
import { restaurantJsonLd } from "@/lib/structured-data";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const description = "Vegetarisches und veganes Café in Darmstadt. Kreatives Frühstück, saisonale Küche und besondere Drinks.";

export const metadata: Metadata = {
  metadataBase: new URL("https://schuknecht.net"),
  title: { default: "Schuknecht", template: "%s · Schuknecht" },
  description,
  openGraph: { type: "website", locale: "de_DE", siteName: "Schuknecht", title: "Schuknecht", description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd(description)) }}
        />
        {children}
      </body>
    </html>
  );
}
