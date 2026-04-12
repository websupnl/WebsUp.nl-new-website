import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { Publication, PublicationBlock } from '@/types/database.types'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'

// ─── Public queries (ISR-safe, no cookies) ────────────────────

export async function getPublications(): Promise<Publication[]> {
  const supabase = createPublicSupabaseClient()
  let { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('tenant_id', getTenantId())
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('publications')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    data = fallback.data
    error = fallback.error
  }

  if (error) {
    console.error('Error fetching publications:', error)
    return []
  }
  return data ?? []
}

export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  const supabase = createPublicSupabaseClient()
  let { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('tenant_id', getTenantId())
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('publications')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    data = fallback.data
    error = fallback.error
  }

  if (error) return null
  return data
}

export async function getLatestPublications(limit = 3): Promise<Publication[]> {
  const supabase = createPublicSupabaseClient()
  let { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('tenant_id', getTenantId())
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('publications')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    data = fallback.data
    error = fallback.error
  }

  if (error) return []
  return data ?? []
}

export async function getPublicationBlocks(publicationId: string): Promise<PublicationBlock[]> {
  const supabase = createPublicSupabaseClient()
  const { data, error } = await supabase
    .from('publication_blocks')
    .select('*')
    .eq('publication_id', publicationId)
    .order('order_index', { ascending: true })

  if (error) return []
  return (data ?? []) as PublicationBlock[]
}

// Used by generateStaticParams at build time
export async function getAllPublicationSlugs(): Promise<string[]> {
  const supabase = createPublicSupabaseClient()
  let { data } = await supabase
    .from('publications')
    .select('slug')
    .eq('tenant_id', getTenantId())
    .eq('published', true)

  if (!data) {
    const fallback = await supabase
      .from('publications')
      .select('slug')
      .eq('published', true)
    data = fallback.data
  }

  return (data ?? []).map((p) => p.slug).filter(Boolean) as string[]
}

// ─── Admin queries (require auth context) ────────────────────

export async function getAllPublicationsAdmin(): Promise<Publication[]> {
  const supabase = await createAdminSupabaseClient()
  let { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('tenant_id', getTenantId())
    .order('created_at', { ascending: false })

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('publications')
      .select('*')
      .order('created_at', { ascending: false })
    data = fallback.data
    error = fallback.error
  }

  if (error) return []
  return data ?? []
}
