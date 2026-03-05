"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
{ label: "Menü", href: "/karte" },
  { label: "Catering", href: "/catering" },
  { label: "Schuki", href: "/menu" },
{ label: "Impressum", href: "/imprint" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Burger button */}
      <div className="md:hidden absolute right-4 z-[60]">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="menu"
        >
          <div className="relative w-[32px] h-[10px]">
            <div
              className="absolute w-full h-[1.5px] transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: "black",
                top: open ? '4px' : '0px',
                transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            />
            <div
              className="absolute w-full h-[1.5px] transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: "black",
                bottom: open ? '4px' : '0px',
                transform: open ? 'rotate(-45deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        </button>
      </div>

      {/* Fullscreen overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 flex flex-col transition-all duration-500 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ backgroundColor: "white" }}
      >
        {/* Logo in nav */}
        <div className="px-4 min-h-[70px] flex items-center">
          <a href="/" className="relative h-[60px] w-[60px]">
            <Image src="/logo.png" alt="Schu Knecht Logo" fill className="object-contain" />
          </a>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-6 pt-10">
          {navLinks.map((link, i) => (
            <div
              key={link.label}
              className="transition-all duration-500 ease-out border-b border-black"
              style={{
                transform: open ? 'translate(0px, 0px)' : 'translate(0px, 20px)',
                opacity: open ? 1 : 0,
                transitionDelay: open ? `${i * 120}ms` : '0ms',
              }}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-4 text-[clamp(2rem,8vw,3.5rem)] leading-[1.1] text-black hover:opacity-50 transition-opacity duration-300"
                style={{ fontFamily: "'Futura Bold', sans-serif" }}
              >
                {link.label}
              </a>
            </div>
          ))}

          {/* Kontakt Button */}
          <div
            className="mt-8 transition-all duration-500 ease-out"
            style={{
              transform: open ? 'translate(0px, 0px)' : 'translate(0px, 20px)',
              opacity: open ? 1 : 0,
              transitionDelay: open ? `${navLinks.length * 120}ms` : '0ms',
            }}
          >
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-block px-6 py-3 text-[clamp(1rem,4vw,1.4rem)] text-white hover:opacity-80 transition-opacity duration-300"
              style={{
                fontFamily: "'Futura Bold', sans-serif",
                backgroundColor: "black",
              }}
            >
              Kontakt
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
