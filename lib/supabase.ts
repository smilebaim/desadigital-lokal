import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] Missing environment variables. Using dummy data fallback.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Helper untuk fetch data dari Supabase dengan fallback ke dummy data
 */
export async function fetchFromSupabase<T>(
  tableName: string,
  query: (client: ReturnType<typeof createClient>) => Promise<{ data: T | null; error: unknown }>,
  fallback: T
): Promise<T> {
  if (!supabaseUrl || !supabaseKey) {
    return fallback;
  }
  try {
    const { data, error } = await query(supabase);
    if (error) {
      console.error(`[Supabase] Error fetching ${tableName}:`, error);
      return fallback;
    }
    return data ?? fallback;
  } catch (err) {
    console.error(`[Supabase] Exception fetching ${tableName}:`, err);
    return fallback;
  }
}
