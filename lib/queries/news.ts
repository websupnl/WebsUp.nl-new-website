import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { NewsArticle } from '@/types/database.types'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'

// ─── Public queries (ISR-safe, no cookies) ────────────────────

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const supabase = createPublicSupabaseClient()
  let { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('tenant_id', getTenantId())
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('news_articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    data = fallback.data
    error = fallback.error
  }

  if (error) {
    console.error('Error fetching news articles:', error)
    return []
  }
  return (data ?? []) as NewsArticle[]
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const supabase = createPublicSupabaseClient()
  let { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('tenant_id', getTenantId())
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('news_articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    data = fallback.data
    error = fallback.error
  }

  if (error) return null
  return data as NewsArticle
}

export async function getLatestNewsArticles(limit = 3): Promise<NewsArticle[]> {
  const supabase = createPublicSupabaseClient()
  let { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('tenant_id', getTenantId())
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('news_articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit)
    data = fallback.data
    error = fallback.error
  }

  if (error) return []
  return (data ?? []) as NewsArticle[]
}

// Used by generateStaticParams at build time
export async function getAllNewsSlugs(): Promise<string[]> {
  const supabase = createPublicSupabaseClient()
  let { data } = await supabase
    .from('news_articles')
    .select('slug')
    .eq('tenant_id', getTenantId())
    .eq('status', 'published')

  if (!data) {
    const fallback = await supabase
      .from('news_articles')
      .select('slug')
      .eq('status', 'published')
    data = fallback.data
  }

  return (data ?? []).map((a) => a.slug).filter(Boolean) as string[]
}

// ─── Admin queries (require auth context) ────────────────────

export async function getAllNewsAdmin(): Promise<NewsArticle[]> {
  const supabase = await createAdminSupabaseClient()
  let { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('tenant_id', getTenantId())
    .order('created_at', { ascending: false })

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('news_articles')
      .select('*')
      .order('created_at', { ascending: false })
    data = fallback.data
    error = fallback.error
  }

  if (error) return []
  return (data ?? []) as NewsArticle[]
}
