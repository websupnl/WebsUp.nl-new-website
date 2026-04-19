import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'
import { requireAuthenticatedUser } from '@/lib/auth/admin'

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
      'Gebruik NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY of NEXT_PUBLIC_SUPABASE_ANON_KEY voor de server Supabase client.'
    )
  }

  return key
}

function getSupabaseAdminKey() {
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!key) {
    throw new Error(
      'Gebruik SUPABASE_SECRET_KEY of SUPABASE_SERVICE_ROLE_KEY voor de admin Supabase client.'
    )
  }

  return key
}

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(getSupabaseUrl(), getSupabasePublicKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server Component: cookies kunnen hier niet altijd worden gezet.
        }
      },
    },
  })
}

export async function createAdminSupabaseClient() {
  await requireAuthenticatedUser()
  const cookieStore = await cookies()

  return createServerClient<Database>(getSupabaseUrl(), getSupabaseAdminKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {}
      },
    },
  })
}
