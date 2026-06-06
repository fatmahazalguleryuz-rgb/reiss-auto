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

  // Zaten giriş yapılmışsa admin'e yönlendir
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
            <div className="w-8 h-8 border-2 border-accent flex items-center justify-center font-display font-bold text-accent text-base">
              R
            </div>
            <span className="font-display font-bold text-white text-lg tracking-wide">
              REİSS <span className="text-accent">AUTO</span>
            </span>
          </div>
          <p className="text-muted-light text-sm">Yönetim Paneli</p>
        </div>

        {/* Card */}
        <div className="bg-ink rounded-xl p-8 border border-line-dark">
          <h1 className="font-display font-bold text-white text-xl uppercase mb-6">
            Giriş Yap
          </h1>

          <div className="space-y-3">
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ink-deep border border-line-dark text-white placeholder-muted-light rounded px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-ink-deep border border-line-dark text-white placeholder-muted-light rounded px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            />

            {error && (
              <p className="text-red-400 text-xs leading-relaxed">{error}</p>
            )}

            <div className="pt-1">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-accent hover:bg-accent-dark disabled:opacity-60 text-white font-display font-semibold text-xs uppercase tracking-wide py-3.5 rounded transition-colors"
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
