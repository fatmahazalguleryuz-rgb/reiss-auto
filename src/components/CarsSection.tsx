import Link from "next/link";
import Reveal from "./Reveal";

export default function CarsSection() {
  return (
    <section className="bg-ink-deep py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal>
          <div className="text-center mb-10">
            <span className="inline-block text-accent text-xs font-medium tracking-widest uppercase mb-3">
              Araç Alım-Satım
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase mb-4">
              Sadece taşımıyoruz,
              <br />
              araç da alıp satıyoruz
            </h2>
            <p className="text-muted-light max-w-md mx-auto text-base leading-relaxed">
              Ticari araç ihtiyacınız için güvenilir bir adres. İncelemek
              istediğiniz araç ilanlarına göz atın.
            </p>
          </div>
        </Reveal>

        {/* Single card */}
        <Reveal delay={100}>
          <Link href="/araclar" className="block group">
            <div className="border border-line-dark group-hover:border-accent rounded-xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group-hover:-translate-y-1 transition-all duration-300">
              <div>
                <h3 className="font-display font-bold text-xl text-white uppercase mb-2">
                  Araç İlanlarını Görüntüle
                </h3>
                <p className="text-muted-light text-sm max-w-md leading-relaxed">
                  Satılık kamyon, TIR ve ticari araç ilanlarımızı inceleyin.
                  Fiyat ve detaylar için iletişime geçin.
                </p>
              </div>
              <span className="flex-shrink-0 bg-accent group-hover:bg-accent-dark text-white font-medium text-sm px-6 py-3 rounded transition-colors whitespace-nowrap">
                İlanlara Git →
              </span>
            </div>
          </Link>
        </Reveal>

      </div>
    </section>
  );
}
