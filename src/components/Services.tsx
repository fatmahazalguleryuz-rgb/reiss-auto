import Reveal from "./Reveal";

const services = [
  {
    no: "01",
    icon: "❄",
    title: "Soğuk Zincir Taşıma",
    desc: "Frigorifik TIR'larla meyve-sebze ve gıda ürünlerinin ısı kontrollü taşıması.",
  },
  {
    no: "02",
    icon: "🌍",
    title: "Uluslararası Taşıma",
    desc: "Yurt dışı sevkiyatlarda gümrük süreçleriyle uyumlu, sınır ötesi karayolu taşımacılığı.",
  },
  {
    no: "03",
    icon: "📦",
    title: "Kargo & Parsiyel",
    desc: "Küçük ve orta hacimli yükler için ekonomik parsiyel ve komple kargo taşımacılığı.",
  },
  {
    no: "04",
    icon: "🚛",
    title: "Komple TIR",
    desc: "Tek müşteriye özel komple araç ile büyük hacimli yüklerin yurt içi ve yurt dışı sevkiyatı.",
  },
  {
    no: "05",
    icon: "📍",
    title: "Sevkiyat Takibi",
    desc: "Yükünüzün nerede olduğunu anlık takip; teslimatta bilgilendirme.",
  },
  {
    no: "06",
    icon: "📑",
    title: "Sözleşmeli Taşıma",
    desc: "Düzenli yük gönderen işletmeler için sözleşmeli, önceliklendirilmiş taşıma.",
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <Reveal>
          <div className="text-center mb-14">
            <span className="inline-block text-accent text-xs font-medium tracking-widest uppercase mb-3">
              Hizmetlerimiz
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase mb-4">
              Lojistikte uçtan uca çözüm
            </h2>
            <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
              Soğuk zincirden uluslararası sevkiyata, parsiyelden komple TIR&apos;a
              kadar her ihtiyacınız için güvenilir çözümler sunuyoruz.
            </p>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <Reveal key={idx} delay={idx * 70}>
              <div className="group relative border border-line rounded-lg p-6 bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full">
                {/* Card number */}
                <span className="absolute top-5 right-5 text-xs font-display font-bold text-muted-light">
                  {s.no}
                </span>
                {/* Icon box */}
                <div className="w-12 h-12 bg-bg-soft group-hover:bg-accent rounded-lg flex items-center justify-center text-xl mb-5 transition-colors duration-300 flex-shrink-0">
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold text-base text-ink uppercase mb-2 tracking-wide">
                  {s.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
