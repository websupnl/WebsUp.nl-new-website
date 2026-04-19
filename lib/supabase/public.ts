import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL ontbreekt.')
  }

  return url
}

function getSupabasePublicKey() {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!key) {
    throw new Error(
      'Gebruik NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY of NEXT_PUBLIC_SUPABASE_ANON_KEY voor de publieke Supabase client.'
    )
  }

  return key
}

/**
 * Public read-only Supabase client.
 * Does not call cookies(), so it is safe for static generation and ISR.
 */
export function createPublicSupabaseClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabasePublicKey())
}
