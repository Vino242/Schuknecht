import type { Metadata } from "next";

export const metadata: Metadata = { title: "Catering" };

export default function CateringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
