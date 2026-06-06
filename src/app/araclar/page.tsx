"use client";
import { useEffect, useState } from "react";
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

export default function AraclarPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("vehicles")
      .select("*")
      .eq("aktif", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error("Supabase hatası:", error.message);
        setVehicles(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = vehicles.filter(
    (v) =>
      v.marka.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-soft">

        {/* Page header */}
        <div className="bg-ink-deep pt-28 pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-accent text-xs font-medium tracking-widest uppercase mb-3">
              Araç Alım-Satım
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white uppercase mb-4">
              Satılık Araçlar
            </h1>
            <p className="text-muted-light text-base max-w-xl leading-relaxed">
              Güvenilir ticari araç ilanlarımızı inceleyin. Fiyat ve detaylar
              için iletişime geçin.
            </p>
          </div>
        </div>

        {/* Listings */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Marka veya model ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-sm border border-line bg-white text-ink placeholder-muted rounded px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-24 text-muted text-sm">
              Yükleniyor...
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24">
              <span className="text-4xl block mb-4">🚛</span>
              <p className="text-muted text-base">
                {search
                  ? "Aramanızla eşleşen ilan bulunamadı."
                  : "Şu anda yayında ilan bulunmuyor."}
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-3 text-accent text-sm hover:underline"
                >
                  Aramayı temizle
                </button>
              )}
            </div>
          )}

          {/* Card grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  href={`/araclar/${vehicle.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-line rounded-lg overflow-hidden group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-300 h-full flex flex-col">

                    {/* Photo */}
                    <div className="aspect-video bg-bg-soft flex items-center justify-center overflow-hidden flex-shrink-0">
                      {vehicle.foto_url ? (
                        <img
                          src={vehicle.foto_url}
                          alt={`${vehicle.marka} ${vehicle.model}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-light gap-2">
                          <span className="text-4xl">🚛</span>
                          <span className="text-xs">Fotoğraf yakında</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="font-display font-bold text-lg text-ink uppercase mb-2 leading-tight">
                        {vehicle.marka} {vehicle.model}
                      </h2>
                      <div className="flex gap-4 text-sm text-muted mb-auto">
                        {vehicle.yil && <span>{vehicle.yil}</span>}
                        {vehicle.km && (
                          <span>{formatKm(vehicle.km)}</span>
                        )}
                      </div>
                      <p className="font-display font-semibold text-accent text-xl mt-3">
                        {formatPrice(vehicle.fiyat)}
                      </p>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
