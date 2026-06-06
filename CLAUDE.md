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

## Supabase
- Proje: ProtoBuilder (ID: khmshpxtbpmfomujvdso), bölge: eu-central-1
- Schema: "reiss" (public schema'ya DOKUNMA)
- Tablo: reiss.vehicles (11 alan: id, marka, model, yil, km, fiyat, foto_url, sahibinden_link, aciklama, durum, aktif)
- RLS açık: aktif=true ilanları herkese SELECT; yazma sadece service_role
- Storage bucket: "arac-fotograflari" (public)
- Client: src/lib/supabase/client.ts — createBrowserClient @supabase/ssr, schema='reiss'
- Tipler: src/lib/types.ts — Vehicle interface

⚠️ ÖNEMLİ — PGRST106 HATASINDAN DERS: reiss schema'sı Supabase Dashboard → Settings → API → Exposed schemas listesine manuel olarak eklendi. GRANT izinleri (PostgreSQL seviyesi) tek başına yetmez; PostgREST API katmanı da schema'yı görmesi için bu listeye eklenmiş olmalı. Yeni schema veya proje kurulumunda bu adım unutulursa "Invalid schema" / PGRST106 hatası alınır.

## Faz 2 Tamamlandı
- reiss schema + vehicles tablosu + RLS + storage bucket kuruldu
- /araclar sayfası: ilan listesi, arama, fotoğraf/placeholder
- /araclar/[id] detay sayfası: tüm bilgiler, sahibinden link, iletişim butonu
- Supabase'den 3 örnek ilan çekiliyor (Mercedes, Volvo, DAF)

## Admin Panel (Faz 2c — Tamamlandı)
- /admin/login: e-posta+şifre girişi, signInWithPassword, noindex
- /admin: ilan tablosu (tümü, aktif/pasif), yayına al/kaldır toggle, sil (Storage temizliği dahil), düzenle linki
- /admin/yeni: ilan ekleme formu, Storage fotoğraf yükleme, insert
- /admin/duzenle/[id]: mevcut veri yüklü form, fotoğraf değiştirme, update
- useRequireAuth hook: session kontrolü, giriş yoksa /admin/login'e yönlendirme
- admin layout.tsx: robots noindex/nofollow (tüm /admin sayfaları)
- RLS: authenticated SELECT ALL policy eklendi (admin pasif ilanları da görebilsin)
- service_role ASLA kullanılmadı — tüm işlemler kullanıcı JWT'si ile RLS üzerinden

## Sırada
- Teklif formu + Resend (Faz 3)
- Vercel deploy + domain (Faz 4)
