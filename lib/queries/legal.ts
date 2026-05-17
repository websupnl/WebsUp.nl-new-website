import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getTenantId } from '@/lib/tenant'
import type { LegalPage } from '@/types/database.types'

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('legal_pages')
    .select('*')
    .eq('tenant_id', getTenantId())
    .eq('slug', slug)
    .single()
  return data ?? null
}

export async function getAllLegalPages(): Promise<LegalPage[]> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('legal_pages')
    .select('*')
    .eq('tenant_id', getTenantId())
    .order('slug')
  return data ?? []
}
