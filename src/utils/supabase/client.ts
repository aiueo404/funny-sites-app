import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Supabaseにデータを投稿する関数例
export async function insertData<T extends object>(table: string, payload: T) {
  const supabase = createClient();
  const { data, error } = await supabase.from(table).insert([payload]);
  return { data, error };
}