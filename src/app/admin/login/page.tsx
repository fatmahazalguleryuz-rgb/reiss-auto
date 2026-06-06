"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/admin");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError("Lütfen e-posta ve şifrenizi girin.");
      return;
    }
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (authError) {
      setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
    } else {
      router.replace("/admin");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-ink-deep flex items-center justify-center">
        <span className="text-muted-light text-sm">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-deep flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-2">
            <div
              style={{ border: "2px solid #c0392b" }}
              className="w-8 h-8 flex items-center justify-center text-base font-bold"
            >
              <span style={{ color: "#c0392b" }}>R</span>
            </div>
            <span className="text-white text-lg font-bold tracking-wide">
              REİSS <span style={{ color: "#c0392b" }}>AUTO</span>
            </span>
          </div>
          <p className="text-muted-light text-sm">Yönetim Paneli</p>
        </div>

        {/* Kart */}
        <div
          style={{ backgroundColor: "#3a3a3c" }}
          className="rounded-xl p-8 border border-line-dark"
        >
          <h1 className="text-white text-xl font-bold uppercase mb-6 tracking-wide">
            Giriş Yap
          </h1>

          <div className="space-y-4">

            {/* E-posta */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#aab0ba" }}
              >
                E-posta
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#3a3a3c",
                  border: "1px solid #e3e5e8",
                }}
                className="w-full rounded px-4 py-3 text-sm focus:outline-none focus:ring-2"
                onFocus={(e) => (e.target.style.borderColor = "#c0392b")}
                onBlur={(e) => (e.target.style.borderColor = "#e3e5e8")}
              />
            </div>

            {/* Şifre */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#aab0ba" }}
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#3a3a3c",
                  border: "1px solid #e3e5e8",
                }}
                className="w-full rounded px-4 py-3 text-sm focus:outline-none focus:ring-2"
                onFocus={(e) => (e.target.style.borderColor = "#c0392b")}
                onBlur={(e) => (e.target.style.borderColor = "#e3e5e8")}
              />
            </div>

            {/* Hata mesajı */}
            {error && (
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#e74c3c" }}
              >
                {error}
              </p>
            )}

            {/* Buton */}
            <div className="pt-1">
              <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#a93226" : "#c0392b",
                  color: "#ffffff",
                  opacity: loading ? 0.8 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                className="w-full rounded py-3.5 text-sm font-bold uppercase tracking-wide transition-opacity"
              >
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
