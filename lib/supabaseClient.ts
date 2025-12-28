import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function missingEnvError() {
  const msg =
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.\n" +
    "Set these in .env.local (or your hosting env) and restart the dev server.";
  console.error(msg);
  return new Error(msg);
}

let _supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Provide a minimal stub that throws helpful error when used instead of crashing on import
  // This keeps the app from throwing `supabaseUrl is required` at import time.
  _supabase = null;
}

export const supabase = new Proxy(
  {} as SupabaseClient,
  {
    get(_, prop) {
      if (!_supabase) throw missingEnvError();
      // @ts-expect-error - forward to real client
      return (_supabase as any)[prop];
    },
    apply(_, __, args) {
      if (!_supabase) throw missingEnvError();
      // @ts-expect-error
      return (_supabase as any).apply(null, args);
    },
  }
);

