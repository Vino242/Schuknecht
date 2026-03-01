"use client";

import { useState } from "react";

const navLinks = [
  { label: "home", href: "/" },
  { label: "menü", href: "/karte" },
  { label: "catering", href: "/catering" },
  { label: "schuki", href: "/menu" },
  { label: "kontakt", href: "/contact" },
  { label: "impressum", href: "/imprint" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Burger button */}
      <div className="md:hidden absolute left-4">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="menu"
          style={{ color: "rgb(207, 46, 46)" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M0 5h22M0 11h22M0 17h22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Dark backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Side drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 w-2/3 h-full px-8 py-20 flex flex-col justify-center transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "rgb(207, 46, 46)" }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Menü schließen"
          className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <nav className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[15px] tracking-[0.08em] uppercase text-white hover:opacity-70 transition-opacity"
              style={{ fontFamily: "'Futura Bold', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
