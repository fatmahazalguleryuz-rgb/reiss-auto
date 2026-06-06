import Link from "next/link";

const serviceLinks = [
  "Soğuk Zincir Taşıma",
  "Uluslararası Taşıma",
  "Kargo & Parsiyel",
  "Komple TIR",
  "Sevkiyat Takibi",
  "Sözleşmeli Taşıma",
];

const corporateLinks = [
  { label: "Hakkımızda", href: "#" },
  { label: "Araç İlanları", href: "/araclar" },
  { label: "İletişim", href: "#iletisim" },
];

const socialLinks = [
  { label: "Instagram", initial: "In" },
  { label: "Facebook", initial: "Fb" },
  { label: "LinkedIn", initial: "Li" },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="bg-ink-deep pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-line-dark">

          {/* Column 1: Logo + desc + socials */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 border-2 border-accent flex items-center justify-center font-display font-bold text-accent text-base">
                R
              </div>
              <span className="font-display font-bold text-white text-lg tracking-wide">
                REİSS <span className="text-accent">AUTO</span>
              </span>
            </div>
            <p className="text-muted-light text-sm leading-relaxed mb-6">
              Ulusal ve uluslararası karayolu taşımacılığında güvenilir lojistik
              ortağınız.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 bg-ink rounded flex items-center justify-center text-muted-light hover:text-white text-xs font-bold transition-colors"
                >
                  {s.initial}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-display font-semibold text-white uppercase text-xs tracking-widest mb-5">
              Hizmetler
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#hizmetler"
                    className="text-muted-light hover:text-white text-sm transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div>
            <h4 className="font-display font-semibold text-white uppercase text-xs tracking-widest mb-5">
              Kurumsal
            </h4>
            <ul className="space-y-2.5">
              {corporateLinks.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-muted-light hover:text-white text-sm transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-display font-semibold text-white uppercase text-xs tracking-widest mb-5">
              İletişim
            </h4>
            <ul className="space-y-3 text-muted-light text-sm">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+90 (___) ___ __ __</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉</span>
                <span>info@reissauto.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span className="leading-relaxed">[Adres bilgisi eklenecek]</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-muted-light text-xs">
            © 2026 REİSS AUTO — Tüm hakları saklıdır.
          </span>
          <div className="flex gap-5">
            {["Gizlilik", "KVKK", "Çerez Politikası"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-muted-light hover:text-white text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
