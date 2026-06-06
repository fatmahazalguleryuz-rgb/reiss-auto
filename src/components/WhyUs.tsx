"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const points = [
  {
    title: "Isı Kontrollü Taşıma",
    desc: "Frigorifik araçlarımızla yükünüzün sıcaklık zinciri hiç kopmadan teslim edilir.",
  },
  {
    title: "Tek Muhatap",
    desc: "Sevkiyat planlamasından teslimata kadar tek bir iletişim noktası, sıfır karmaşa.",
  },
  {
    title: "Şeffaf Fiyat",
    desc: "Gizli ücret yok. Teklif aldığınız fiyat, faturanızdaki fiyattır.",
  },
];

const fields = [
  { key: "from" as const, placeholder: "Nereden" },
  { key: "to" as const, placeholder: "Nereye" },
  { key: "cargo" as const, placeholder: "Yük türü" },
  { key: "phone" as const, placeholder: "Telefon" },
];

export default function WhyUs() {
  const [form, setForm] = useState({ from: "", to: "", cargo: "", phone: "" });

  return (
    <section id="neden" className="bg-bg-soft py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Why Us text */}
          <Reveal>
            <div>
              <span className="inline-block text-accent text-xs font-medium tracking-widest uppercase mb-3">
                Neden REİSS AUTO?
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase leading-tight mb-4">
                Küçük ekip,
                <br />
                büyük titizlik.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-9">
                Her sevkiyatı kendi yükümüz gibi sahipleniyor, sürecin her
                adımında yanınızda oluyoruz. Ekibimizin küçüklüğü bize çevik
                hareket etme ve her müşteriye odaklanma gücü veriyor.
              </p>

              <div className="space-y-6">
                {points.map((p, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <div className="flex gap-4">
                      <div className="mt-0.5 w-5 h-5 bg-accent rounded-sm flex-shrink-0 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-ink text-sm uppercase tracking-wide mb-1">
                          {p.title}
                        </h4>
                        <p className="text-muted text-sm leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Quick quote panel (div, not form) */}
          <Reveal delay={150}>
            <div id="teklif" className="bg-ink-deep rounded-xl p-8">
              <h3 className="font-display font-bold text-2xl text-white uppercase mb-1">
                Hızlı Teklif İste
              </h3>
              <p className="text-muted-light text-sm mb-7">
                Bilgilerinizi bırakın, en kısa sürede sizi arayalım.
              </p>

              <div className="space-y-3">
                {fields.map((field) => (
                  <input
                    key={field.key}
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    className="w-full bg-ink border border-line-dark text-white placeholder-muted-light rounded px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                ))}

                <div className="pt-1">
                  <button className="w-full bg-accent hover:bg-accent-dark text-white font-display font-semibold text-sm uppercase tracking-wide py-3.5 rounded transition-colors">
                    Teklif Gönder →
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
