"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Buraya kendi fotoğraflarınız gelecek: public/images/slider/
const slides = [
  { image: "/images/slider/1.jpg" },
  { image: "/images/slider/2.jpg" },
  { image: "/images/slider/3.jpg" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setTextVisible(true);
      }, 450);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setTextVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setTextVisible(true);
    }, 300);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background: gradient fallback + optional image */}
          <div
            className="absolute inset-0 bg-ink-deep"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Readability overlay: dark left, transparent right */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/95 via-ink-deep/70 to-ink/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
        <div
          className={`max-w-2xl transition-[opacity,transform] duration-500 ease-out ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-accent flex-shrink-0" />
            <span className="text-white/75 text-xs font-medium tracking-widest uppercase">
              Ulusal &amp; Uluslararası Karayolu Taşımacılık
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight mb-6">
            Yükünüz güvende,
            <br />
            teslimat zamanında.
          </h1>

          {/* Body text */}
          <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-9 max-w-xl">
            TIR filomuzla yurt içi ve yurt dışı taşımacılıkta; soğuk zincir
            meyve-sebze, kargo ve parsiyel yüklerde hızlı ve güvenilir çözümler.
            Lojistiğin yanında güvenilir araç alım-satım hizmeti.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#teklif"
              className="bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3 rounded transition-colors"
            >
              Hemen Teklif Al →
            </Link>
            <Link
              href="#hizmetler"
              className="border border-white/50 hover:border-white/90 text-white font-medium px-7 py-3 rounded transition-colors"
            >
              Hizmetlerimiz
            </Link>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slayt ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-accent w-7"
                : "bg-white/40 hover:bg-white/70 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
