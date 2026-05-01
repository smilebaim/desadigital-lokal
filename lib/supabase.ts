import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xntltvftkboiyqsfpqoi.supabase.co';

const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: SupabaseClient<any> = createClient(supabaseUrl, supabaseKey);

/** Cek apakah Supabase sudah terkonfigurasi */
export const isSupabaseConfigured = !!supabaseKey;

/** Helper: tabel belum ada = PGRST205, artinya koneksi OK tapi schema belum dijalankan */
export function isTableNotFound(error: unknown): boolean {
  return (error as { code?: string })?.code === 'PGRST205';
}
