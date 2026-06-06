export interface Vehicle {
  id: string;
  created_at: string;
  marka: string;
  model: string;
  yil: number | null;
  km: number | null;
  fiyat: number | null;
  foto_url: string | null;
  sahibinden_link: string | null;
  aciklama: string | null;
  durum: string | null;
  aktif: boolean;
}
