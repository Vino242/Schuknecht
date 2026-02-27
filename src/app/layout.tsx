import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Schuknecht",
  description: "Vegetarisches und veganes Café in Darmstadt. Kreatives Frühstück, saisonale Küche und besondere Drinks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
