import Link from "next/link";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="bg-accent py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase mb-4">
            Yükünüz için en uygun çözümü konuşalım
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-base leading-relaxed mb-8">
            Sevkiyat ihtiyacınızı paylaşın, size özel en uygun taşıma planını
            birlikte oluşturalım.
          </p>
          <Link
            href="#iletisim"
            className="inline-block bg-white text-accent hover:bg-white/90 font-display font-semibold text-sm uppercase tracking-wide px-8 py-3.5 rounded transition-colors"
          >
            Bizimle İletişime Geçin →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
