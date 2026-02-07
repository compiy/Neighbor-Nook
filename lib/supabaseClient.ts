import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function missingEnvError() {
  const msg =
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.\n";
  console.error(msg);
  return new Error(msg);
}

let _supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  _supabase = null;
}

export const supabase = new Proxy(
  {} as SupabaseClient,
  {
    get(_, prop) {
      if (!_supabase) throw missingEnvError();
      return (_supabase as any)[prop];
    },
    apply(_, __, args) {
      if (!_supabase) throw missingEnvError();
      return (_supabase as any).apply(null, args);
    },
  }
);

