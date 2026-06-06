"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { createClient } from "@/lib/supabase/client";
import type { Vehicle } from "@/lib/types";

function formatPrice(fiyat: number | null): string {
  if (!fiyat) return "—";
  return Number(fiyat).toLocaleString("tr-TR") + " ₺";
}

function formatKm(km: number | null): string {
  if (!km) return "—";
  return Number(km).toLocaleString("tr-TR") + " km";
}

export default function AdminPage() {
  const { session, loading } = useRequireAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // URL'den başarı mesajını oku
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("msg");
    if (msg === "added") setSuccessMsg("İlan başarıyla eklendi.");
    else if (msg === "updated") setSuccessMsg("İlan başarıyla güncellendi.");
  }, []);

  // Başarı mesajını 4 saniye sonra kaldır
  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(""), 4000);
    return () => clearTimeout(t);
  }, [successMsg]);

  useEffect(() => {
    if (!session) return;
    fetchVehicles();
  }, [session]);

  const fetchVehicles = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Araçlar yüklenemedi:", error.message);
    setVehicles(data ?? []);
    setDataLoading(false);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const handleDelete = async (vehicle: Vehicle) => {
    const confirmed = confirm(
      `"${vehicle.marka} ${vehicle.model}" ilanını silmek istediğinize emin misiniz?\nBu işlem geri alınamaz.`
    );
    if (!confirmed) return;

    setDeletingId(vehicle.id);
    const supabase = createClient();

    // Fotoğrafı Storage'dan sil
    if (vehicle.foto_url) {
      const filePath = vehicle.foto_url.split("/arac-fotograflari/")[1];
      if (filePath) {
        await supabase.storage.from("arac-fotograflari").remove([filePath]);
      }
    }

    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", vehicle.id);

    if (error) {
      alert("Silme işlemi başarısız: " + error.message);
    } else {
      setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
    }
    setDeletingId(null);
  };

  const handleToggleActive = async (vehicle: Vehicle) => {
    setTogglingId(vehicle.id);
    const supabase = createClient();
    const { error } = await supabase
      .from("vehicles")
      .update({ aktif: !vehicle.aktif })
      .eq("id", vehicle.id);

    if (error) {
      alert("Güncelleme başarısız: " + error.message);
    } else {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === vehicle.id ? { ...v, aktif: !v.aktif } : v
        )
      );
    }
    setTogglingId(null);
  };

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-bg-soft flex items-center justify-center">
        <span className="text-muted text-sm">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-soft">

      {/* Admin navbar */}
      <div className="bg-ink-deep border-b border-line-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 border-2 border-accent flex items-center justify-center font-display font-bold text-accent text-sm">
              R
            </div>
            <span className="font-display font-bold text-white text-sm tracking-wide">
              REİSS <span className="text-accent">AUTO</span>
              <span className="text-muted-light font-normal ml-2">Yönetim</span>
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="text-muted-light hover:text-white text-xs transition-colors"
          >
            Çıkış Yap →
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Başarı mesajı */}
        {successMsg && (
          <div className="mb-5 bg-green-50 border border-green-200 text-green-800 text-sm rounded px-4 py-3">
            {successMsg}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-ink text-2xl uppercase">
            Araç İlanları
            <span className="text-muted-light font-normal text-base ml-2">
              ({vehicles.length})
            </span>
          </h1>
          <Link
            href="/admin/yeni"
            className="bg-accent hover:bg-accent-dark text-white font-display font-semibold text-xs uppercase tracking-wide px-5 py-2.5 rounded transition-colors"
          >
            + Yeni İlan Ekle
          </Link>
        </div>

        {/* İlan tablosu */}
        {dataLoading ? (
          <div className="text-muted text-sm text-center py-16">Yükleniyor...</div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-16 bg-white border border-line rounded-lg">
            <p className="text-muted text-sm mb-3">Henüz ilan eklenmedi.</p>
            <Link href="/admin/yeni" className="text-accent text-sm hover:underline">
              İlk ilanı ekle →
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-line rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-line bg-bg-soft">
                  <th className="text-left text-xs text-muted uppercase tracking-wide px-4 py-3 font-medium w-14">Foto</th>
                  <th className="text-left text-xs text-muted uppercase tracking-wide px-4 py-3 font-medium">Araç</th>
                  <th className="text-left text-xs text-muted uppercase tracking-wide px-4 py-3 font-medium">Yıl / KM</th>
                  <th className="text-left text-xs text-muted uppercase tracking-wide px-4 py-3 font-medium">Fiyat</th>
                  <th className="text-left text-xs text-muted uppercase tracking-wide px-4 py-3 font-medium">Durum</th>
                  <th className="text-right text-xs text-muted uppercase tracking-wide px-4 py-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-bg-soft transition-colors">

                    {/* Thumbnail */}
                    <td className="px-4 py-3">
                      <div className="w-12 h-9 bg-bg-soft rounded overflow-hidden flex items-center justify-center flex-shrink-0">
                        {v.foto_url ? (
                          <img
                            src={v.foto_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-base">🚛</span>
                        )}
                      </div>
                    </td>

                    {/* Marka Model */}
                    <td className="px-4 py-3">
                      <span className="font-display font-semibold text-ink">
                        {v.marka} {v.model}
                      </span>
                    </td>

                    {/* Yıl / KM */}
                    <td className="px-4 py-3 text-muted text-xs">
                      <div>{v.yil ?? "—"}</div>
                      <div>{formatKm(v.km)}</div>
                    </td>

                    {/* Fiyat */}
                    <td className="px-4 py-3 text-ink font-medium text-xs">
                      {formatPrice(v.fiyat)}
                    </td>

                    {/* Durum */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
                          v.aktif
                            ? "bg-green-100 text-green-700"
                            : "bg-line text-muted"
                        }`}
                      >
                        {v.aktif ? "Yayında" : "Pasif"}
                      </span>
                    </td>

                    {/* İşlem butonları */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleActive(v)}
                          disabled={togglingId === v.id}
                          className="text-xs text-muted hover:text-ink border border-line px-2 py-1 rounded transition-colors disabled:opacity-40 whitespace-nowrap"
                        >
                          {togglingId === v.id
                            ? "..."
                            : v.aktif
                            ? "Yayından Kaldır"
                            : "Yayınla"}
                        </button>
                        <Link
                          href={`/admin/duzenle/${v.id}`}
                          className="text-xs text-ink hover:text-accent border border-line px-2 py-1 rounded transition-colors"
                        >
                          Düzenle
                        </Link>
                        <button
                          onClick={() => handleDelete(v)}
                          disabled={deletingId === v.id}
                          className="text-xs text-accent hover:text-accent-dark border border-accent/30 hover:border-accent px-2 py-1 rounded transition-colors disabled:opacity-40"
                        >
                          {deletingId === v.id ? "Siliniyor..." : "Sil"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
