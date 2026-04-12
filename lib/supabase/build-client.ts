// Build-time Supabase client (geen cookies, voor generateStaticParams)
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

export function createBuildTimeClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
