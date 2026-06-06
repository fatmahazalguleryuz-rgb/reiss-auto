import Reveal from "./Reveal";

const stats = [
  { value: "7/24", label: "Operasyon Desteği" },
  { value: "Yurt İçi & Dışı", label: "Ulusal ve Uluslararası Taşıma" },
  { value: "Soğuk Zincir", label: "Frigorifik Filo" },
  { value: "Sigortalı", label: "Tüm Sevkiyatlar" },
];

export default function Stats() {
  return (
    <section className="bg-ink-deep py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-dark">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-ink-deep flex flex-col items-center text-center py-9 px-4"
              >
                <span className="font-display font-bold text-2xl sm:text-3xl text-white mb-1.5">
                  {stat.value}
                </span>
                <span className="text-muted-light text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
