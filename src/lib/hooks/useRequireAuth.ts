import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";

export function useRequireAuth() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
        // loading true kalır — yönlendirme tamamlanana kadar spinner görünür
      } else {
        setSession(data.session);
        setLoading(false);
      }
    });
  }, [router]);

  return { session, loading };
}
