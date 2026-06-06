"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { createClient } from "@/lib/supabase/client";
import type { Vehicle } from "@/lib/types";

export default function AdminDuzenlePage() {
  const { session, loading } = useRequireAuth();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [yil, setYil] = useState("");
  const [km, setKm] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [sahibindenLink, setSahibindenLink] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session || !id) return;
    const supabase = createClient();
    supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error: fetchError }) => {
        if (fetchError || !data) {
          setNotFound(true);
        } else {
          setVehicle(data);
          setMarka(data.marka ?? "");
          setModel(data.model ?? "");
          setYil(data.yil?.toString() ?? "");
          setKm(data.km?.toString() ?? "");
          setFiyat(data.fiyat?.toString() ?? "");
          setAciklama(data.aciklama ?? "");
          setSahibindenLink(data.sahibinden_link ?? "");
          setPhotoPreview(data.foto_url ?? null);
        }
        setDataLoading(false);
      });
  }, [session, id]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!marka.trim()) { setError("Marka alanı zorunludur."); return; }
    if (!model.trim()) { setError("Model alanı zorunludur."); return; }
    setError("");
    setSaving(true);

    const supabase = createClient();
    let fotoUrl: string | null = vehicle?.foto_url ?? null;

    // Yeni fotoğraf seçildiyse yükle
    if (photoFile) {
      setUploading(true);

      // Eski fotoğrafı sil
      if (vehicle?.foto_url) {
        const oldPath = vehicle.foto_url.split("/arac-fotograflari/")[1];
        if (oldPath) {
          await supabase.storage.from("arac-fotograflari").remove([oldPath]);
        }
      }

      // Yeni fotoğrafı yükle
      const ext = photoFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("arac-fotograflari")
        .upload(fileName, photoFile);
      setUploading(false);

      if (uploadError) {
        setError("Fotoğraf yüklenirken hata: " + uploadError.message);
        setSaving(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("arac-fotograflari")
        .getPublicUrl(fileName);
      fotoUrl = publicUrl;
    }

    const { error: updateError } = await supabase
      .from("vehicles")
      .update({
        marka: marka.trim(),
        model: model.trim(),
        yil: yil ? parseInt(yil) : null,
        km: km ? parseInt(km) : null,
        fiyat: fiyat ? parseFloat(fiyat) : null,
        aciklama: aciklama.trim() || null,
        sahibinden_link: sahibindenLink.trim() || null,
        foto_url: fotoUrl,
      })
      .eq("id", id!);

    setSaving(false);

    if (updateError) {
      setError("Güncelleme sırasında hata: " + updateError.message);
      return;
    }

    router.push("/admin?msg=updated");
  };

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-bg-soft flex items-center justify-center">
        <span className="text-muted text-sm">Yükleniyor...</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-bg-soft flex flex-col items-center justify-center gap-3">
        <p className="font-display font-bold text-ink uppercase text-xl">İlan bulunamadı</p>
        <Link href="/admin" className="text-accent text-sm hover:underline">
          ← Panele Dön
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full border border-line rounded px-3 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:border-accent transition-colors";
  const labelClass =
    "block text-xs text-muted uppercase tracking-wide mb-1.5 font-medium";

  return (
    <div className="min-h-screen bg-bg-soft">

      {/* Header */}
      <div className="bg-ink-deep border-b border-line-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/admin"
            className="text-muted-light hover:text-white text-sm transition-colors"
          >
            ← Panele Dön
          </Link>
          <span className="font-display font-bold text-white text-sm tracking-wide">
            İlanı Düzenle
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {dataLoading ? (
          <div className="text-center py-16 text-muted text-sm">Yükleniyor...</div>
        ) : (
          <div className="bg-white border border-line rounded-lg p-6 sm:p-8 space-y-5">

            <div>
              <label className={labelClass}>
                Marka <span className="text-accent">*</span>
              </label>
              <input type="text" value={marka} onChange={(e) => setMarka(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>
                Model <span className="text-accent">*</span>
              </label>
              <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Yıl</label>
                <input type="number" value={yil} onChange={(e) => setYil(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Kilometre</label>
                <input type="number" value={km} onChange={(e) => setKm(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Fiyat (₺)</label>
              <input type="number" value={fiyat} onChange={(e) => setFiyat(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Açıklama</label>
              <textarea
                value={aciklama}
                onChange={(e) => setAciklama(e.target.value)}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className={labelClass}>
                Sahibinden.com Linki{" "}
                <span className="text-muted normal-case font-normal">(opsiyonel)</span>
              </label>
              <input type="url" value={sahibindenLink} onChange={(e) => setSahibindenLink(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>
                Fotoğraf{" "}
                {vehicle?.foto_url && (
                  <span className="text-muted normal-case font-normal">
                    (değiştirmek için yeni seç)
                  </span>
                )}
              </label>
              {photoPreview && (
                <div className="mb-3 w-full aspect-video max-h-52 rounded overflow-hidden bg-bg-soft">
                  <img
                    src={photoPreview}
                    alt="Önizleme"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full text-sm text-muted file:mr-3 file:py-2 file:px-3 file:border file:border-line file:rounded file:text-xs file:font-medium file:text-ink file:bg-bg-soft hover:file:bg-line transition-colors cursor-pointer"
              />
              {uploading && (
                <p className="text-xs text-muted mt-1.5">Fotoğraf yükleniyor...</p>
              )}
            </div>

            {error && (
              <p className="text-accent text-sm leading-relaxed">{error}</p>
            )}

            <div className="pt-2">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full bg-accent hover:bg-accent-dark disabled:opacity-60 text-white font-display font-semibold text-xs uppercase tracking-wide py-3.5 rounded transition-colors"
              >
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
