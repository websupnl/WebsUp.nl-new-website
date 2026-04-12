import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export type AdminRole = 'admin' | 'editor'

export function getUserRole(user: { app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> }): AdminRole {
  const normalize = (value: unknown) =>
    typeof value === 'string' ? value.toLowerCase().trim() : ''

  const appRole = normalize(user.app_metadata?.role)
  const metaRole = normalize(user.user_metadata?.role)
  const roleValue = appRole || metaRole

  if (['admin', 'administrator', 'beheerder'].includes(roleValue)) return 'admin'
  return 'editor'
}

export async function requireAuthenticatedUser() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Niet geauthenticeerd.')
  }

  return user
}

export async function requireAdminUser() {
  const user = await requireAuthenticatedUser()
  const role = getUserRole(user)

  if (role !== 'admin') {
    throw new Error('Onvoldoende rechten.')
  }

  return user
}

export async function requireAuthenticatedAdminPage() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return { user, role: getUserRole(user) }
}
