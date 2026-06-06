"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import type { Vehicle } from "@/lib/types";

function formatPrice(fiyat: number | null): string {
  if (!fiyat) return "Fiyat için iletişime geçin";
  return Number(fiyat).toLocaleString("tr-TR") + " ₺";
}

function formatKm(km: number | null): string {
  if (!km) return "—";
  return Number(km).toLocaleString("tr-TR") + " km";
}

export default function AracDetayPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const supabase = createClient();
    supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .eq("aktif", true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          setVehicle(data);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-bg-soft flex items-center justify-center">
          <span className="text-muted text-sm">Yükleniyor...</span>
        </div>
        <Footer />
      </>
    );
  }

  if (notFound || !vehicle) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-bg-soft flex flex-col items-center justify-center gap-4 px-4 text-center">
          <span className="text-5xl">🔍</span>
          <p className="font-display font-bold text-ink text-2xl uppercase">
            İlan Bulunamadı
          </p>
          <p className="text-muted text-sm">
            Bu ilan kaldırılmış veya mevcut değil.
          </p>
          <Link
            href="/araclar"
            className="text-accent text-sm hover:underline mt-2"
          >
            ← Tüm ilanlara dön
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-soft">

        {/* Dark header with photo */}
        <div className="bg-ink-deep pt-20 pb-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/araclar"
              className="inline-flex items-center gap-1.5 text-muted-light hover:text-white text-sm mb-6 transition-colors"
            >
              ← Tüm ilanlar
            </Link>

            {/* Photo */}
            <div className="w-full aspect-video max-h-[420px] bg-ink rounded-xl overflow-hidden flex items-center justify-center">
              {vehicle.foto_url ? (
                <img
                  src={vehicle.foto_url}
                  alt={`${vehicle.marka} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-light gap-3">
                  <span className="text-6xl">🚛</span>
                  <span className="text-sm">Fotoğraf yakında</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: main info */}
            <div className="lg:col-span-2">
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase leading-tight mb-2">
                {vehicle.marka} {vehicle.model}
              </h1>
              <p className="font-display font-bold text-2xl text-accent mb-8">
                {formatPrice(vehicle.fiyat)}
              </p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {vehicle.yil && (
                  <div className="bg-white border border-line rounded-lg p-4 text-center">
                    <p className="text-xs text-muted uppercase tracking-widest mb-1.5">Yıl</p>
                    <p className="font-display font-bold text-ink text-xl">{vehicle.yil}</p>
                  </div>
                )}
                {vehicle.km && (
                  <div className="bg-white border border-line rounded-lg p-4 text-center">
                    <p className="text-xs text-muted uppercase tracking-widest mb-1.5">Kilometre</p>
                    <p className="font-display font-bold text-ink text-xl">{formatKm(vehicle.km)}</p>
                  </div>
                )}
                {vehicle.durum && (
                  <div className="bg-white border border-line rounded-lg p-4 text-center">
                    <p className="text-xs text-muted uppercase tracking-widest mb-1.5">Durum</p>
                    <p className="font-display font-bold text-ink text-xl capitalize">
                      {vehicle.durum === "satilik" ? "Satılık" : vehicle.durum}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              {vehicle.aciklama && (
                <div className="bg-white border border-line rounded-lg p-6">
                  <h2 className="font-display font-semibold text-ink uppercase text-xs tracking-widest mb-3">
                    Açıklama
                  </h2>
                  <p className="text-muted text-sm leading-relaxed">{vehicle.aciklama}</p>
                </div>
              )}
            </div>

            {/* Right: action panel */}
            <div className="space-y-3">
              <div className="bg-ink-deep rounded-xl p-6">
                <h3 className="font-display font-bold text-white uppercase text-sm tracking-wide mb-1">
                  İlgileniyorum
                </h3>
                <p className="text-muted-light text-xs mb-5 leading-relaxed">
                  Bu araç hakkında bilgi almak için iletişime geçin.
                </p>
                <Link
                  href="/#iletisim"
                  className="block w-full bg-accent hover:bg-accent-dark text-white font-display font-semibold text-xs uppercase tracking-wide text-center py-3.5 rounded transition-colors mb-3"
                >
                  Bilgi Al →
                </Link>
                {vehicle.sahibinden_link && (
                  <a
                    href={vehicle.sahibinden_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full border border-line-dark text-muted-light hover:text-white hover:border-white font-medium text-xs text-center py-3 rounded transition-colors"
                  >
                    Sahibinden&apos;de İncele →
                  </a>
                )}
              </div>

              <Link
                href="/araclar"
                className="block w-full border border-line bg-white text-muted hover:text-ink font-medium text-xs text-center py-3 rounded transition-colors"
              >
                ← Diğer ilanlar
              </Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
