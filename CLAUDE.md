# REİSS AUTO — Proje Rehberi

## Proje Nedir
REİSS AUTO, tek çatı altında iki iş yapan bir şirketin web sitesidir:
1. Lojistik / nakliye (ANA İŞ): TIR filosu ile ulusal ve uluslararası karayolu taşımacılığı. Ağırlıklı: soğuk zincir meyve-sebze, kargo & parsiyel, komple TIR.
2. Araç alım-satım (İKİNCİL): site içinde /araclar sayfasında ilanlar.

## Teknik Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (araç ilanları için, sonraki aşamada)
- Resend (teklif formu maili için, sonraki aşamada)
- Vercel (deploy)

## Tasarım Dili
- Tema: Erk Logistics tarzı ağırbaşlı kurumsal. Koyu hero + açık (beyaz/gri) içerik bölümleri.
- Ana renk: antrasit/gri (#3a3a3c, #2b2b2d). Vurgu: koyu kırmızı (#c0392b), minimum kullanılır.
- Yazı: başlıklar Barlow Condensed (büyük harf, condensed), gövde Inter.
- Hero: otomatik geçişli fotoğraf slider (3-5 görsel).

## ÇALIŞMA KURALLARI
- Bir görevi "tamamlandı" demeden önce hata olmadığını ve gerçekten çalıştığını doğrula.
- Deploy gerektiren bir şey varsa, Vercel "Ready" göstermeden tamamlandı deme.
- Her adımda ne yaptığını Türkçe ve kısaca açıkla.
- Sahte/abartılı sayı kullanma (örn. "10.000 mutlu müşteri" gibi uydurma istatistik yok).
- Renkleri asla doğrudan kod içine gömme; Tailwind tema değişkenleri / config üzerinden yönet.

## Yapıldı
- Next.js 14 + TypeScript + Tailwind kurulumu tamamlandı.
- Tasarım sistemi tamamlandı: Tailwind'e özel renkler (ink, accent vb.) ve fontFamily (display/body) eklendi.
- Google Fonts: Barlow Condensed (--font-display) + Inter (--font-body) next/font/google ile entegre edildi.
- layout.tsx: metadata, lang="tr", body font/renk sınıfları güncellendi.
- globals.css: Tailwind direktifleri korundu, gereksiz varsayılan stiller temizlendi.
- Ana sayfa (Faz 1) tüm bölümleriyle tamamlandı: Navbar, Hero slider, Stats, Services, WhyUs+form, CarsSection, CtaBand, Footer.
- src/components/ altında 9 ayrı bileşen + Reveal.tsx (scroll animasyonu) oluşturuldu.

## Bileşenler (src/components/)
- Reveal.tsx — IntersectionObserver ile fade-up animasyonu
- Navbar.tsx — scroll'da beyazlaşan, mobil hamburger menü
- Hero.tsx — 3 slide, 4.5s otomatik geçiş, dot göstergeleri
- Stats.tsx — 4 istatistik şeridi (koyu zemin)
- Services.tsx — 6 hizmet kartı (hover animasyonlu)
- WhyUs.tsx — Neden biz + hızlı teklif formu
- CarsSection.tsx — Araç alım-satım linki
- CtaBand.tsx — Kırmızı CTA bandı
- Footer.tsx — 4 sütunlu footer

## Sırada
- /araclar sayfası
- Teklif formu + Resend
- Supabase araç ilanları
