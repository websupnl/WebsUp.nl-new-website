import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

/**
 * Public read-only Supabase client.
 * Does NOT call cookies() — safe for static generation and ISR.
 * Use this for all public site queries (publications, news, settings, …).
 * Never use this in admin routes or mutations.
 */
export function createPublicSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
