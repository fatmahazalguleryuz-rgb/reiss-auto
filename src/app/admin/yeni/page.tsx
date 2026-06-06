"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { createClient } from "@/lib/supabase/client";

export default function AdminYeniPage() {
  const { session, loading } = useRequireAuth();
  const router = useRouter();

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
    let fotoUrl: string | null = null;

    // Fotoğraf varsa Storage'a yükle
    if (photoFile) {
      setUploading(true);
      const ext = photoFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("arac-fotograflari")
        .upload(fileName, photoFile);
      setUploading(false);

      if (uploadError) {
        setError("Fotoğraf yüklenirken hata oluştu: " + uploadError.message);
        setSaving(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("arac-fotograflari")
        .getPublicUrl(fileName);
      fotoUrl = publicUrl;
    }

    // Kaydı veritabanına ekle
    const { error: insertError } = await supabase.from("vehicles").insert({
      marka: marka.trim(),
      model: model.trim(),
      yil: yil ? parseInt(yil) : null,
      km: km ? parseInt(km) : null,
      fiyat: fiyat ? parseFloat(fiyat) : null,
      aciklama: aciklama.trim() || null,
      sahibinden_link: sahibindenLink.trim() || null,
      foto_url: fotoUrl,
      durum: "satilik",
      aktif: true,
    });

    setSaving(false);

    if (insertError) {
      setError("İlan eklenirken hata oluştu: " + insertError.message);
      return;
    }

    router.push("/admin?msg=added");
  };

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-bg-soft flex items-center justify-center">
        <span className="text-muted text-sm">Yükleniyor...</span>
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
            Yeni İlan Ekle
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white border border-line rounded-lg p-6 sm:p-8 space-y-5">

          <div>
            <label className={labelClass}>
              Marka <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={marka}
              onChange={(e) => setMarka(e.target.value)}
              placeholder="Mercedes-Benz"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Model <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Actros 1845"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Yıl</label>
              <input
                type="number"
                value={yil}
                onChange={(e) => setYil(e.target.value)}
                placeholder="2021"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Kilometre</label>
              <input
                type="number"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                placeholder="250000"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Fiyat (₺)</label>
            <input
              type="number"
              value={fiyat}
              onChange={(e) => setFiyat(e.target.value)}
              placeholder="1250000"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Açıklama</label>
            <textarea
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value)}
              placeholder="Araç hakkında detaylı bilgi..."
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>
              Sahibinden.com Linki{" "}
              <span className="text-muted normal-case font-normal">(opsiyonel)</span>
            </label>
            <input
              type="url"
              value={sahibindenLink}
              onChange={(e) => setSahibindenLink(e.target.value)}
              placeholder="https://www.sahibinden.com/..."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Fotoğraf</label>
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
              {saving ? "Kaydediliyor..." : "İlanı Yayınla"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
