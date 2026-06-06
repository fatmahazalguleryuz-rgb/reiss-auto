"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Lojistik", href: "#hizmetler" },
  { label: "Neden Biz", href: "#neden" },
  { label: "Araç Alım-Satım", href: "/araclar" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 border-2 border-accent flex items-center justify-center font-display font-bold text-base transition-colors ${
                scrolled ? "text-accent" : "text-white"
              }`}
            >
              R
            </div>
            <span
              className={`font-display font-bold text-lg tracking-wide transition-colors ${
                scrolled ? "text-ink" : "text-white"
              }`}
            >
              REİSS <span className="text-accent">AUTO</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-ink hover:text-accent"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#teklif"
              className="bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2 rounded transition-colors"
            >
              Teklif Al
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden text-xl leading-none transition-colors ${
              scrolled ? "text-ink" : "text-white"
            }`}
            aria-label="Menüyü aç/kapat"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t border-line-dark ${
            scrolled ? "bg-white" : "bg-ink-deep"
          }`}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-2.5 text-sm font-medium border-b border-line-dark last:border-0 transition-colors ${
                  scrolled ? "text-ink hover:text-accent" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#teklif"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2.5 rounded text-center transition-colors"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
