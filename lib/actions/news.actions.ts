'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'
import { requireAuthenticatedUser } from '@/lib/auth/admin'
import { sanitizeRichTextHtml } from '@/lib/security/content'
import { assert, isSafeUrl, isValidSlug, normalizeText, validateLength } from '@/lib/security/validation'

type ActionResult = { success: true; id?: string } | { success: false; error: string }

function revalidateNewsPaths(slug?: string) {
  revalidatePath('/', 'layout')
  revalidatePath('/nieuws')
  revalidatePath('/admin')
  revalidatePath('/admin/nieuws')
  if (slug) {
    revalidatePath(`/nieuws/${slug}`)
  }
}

export async function saveNewsArticle(data: {
  id?: string
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  image_url?: string | null
  status?: 'draft' | 'published'
  published?: boolean
  published_at?: string | null
}): Promise<ActionResult> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    const tenantId = getTenantId()
    const now = new Date().toISOString()
    let savedId = data.id
    const title = normalizeText(data.title)
    const slug = normalizeText(data.slug)
    const excerpt = normalizeText(data.excerpt)

    assert(title.length >= 3, 'Titel moet minimaal 3 tekens bevatten.')
    assert(validateLength(title, 160), 'Titel mag maximaal 160 tekens bevatten.')
    assert(isValidSlug(slug), 'Slug mag alleen kleine letters, cijfers en koppeltekens bevatten.')
    assert(validateLength(slug, 120), 'Slug is te lang.')
    assert(validateLength(excerpt, 320), 'Samenvatting mag maximaal 320 tekens bevatten.')
    assert(isSafeUrl(data.image_url), 'Afbeeldings-URL is ongeldig.')

    const computedStatus = data.status ?? (typeof data.published === 'boolean' ? (data.published ? 'published' : 'draft') : 'draft')
    const computedPublishedAt = data.published_at ?? (computedStatus === 'published' ? now : null)
    const sanitizedData = {
      ...data,
      title,
      slug,
      excerpt: excerpt || null,
      status: computedStatus,
      published_at: computedPublishedAt,
      content: sanitizeRichTextHtml(data.content),
      image_url: normalizeText(data.image_url) || null,
    }

    const payload = { ...sanitizedData }
    delete payload.published

    if (data.id) {
      let { error } = await supabase
        .from('news_articles')
        .update({ ...payload, updated_at: now })
        .eq('id', data.id)
        .eq('tenant_id', tenantId)

      if (isMissingColumnError(error, 'tenant_id')) {
        const fallback = await supabase
          .from('news_articles')
          .update({ ...payload, updated_at: now })
          .eq('id', data.id)
        error = fallback.error
      }

      if (error) return { success: false, error: error.message }
    } else {
      let inserted: { id: string } | null = null
      const { data: createData, error: createError } = await supabase
        .from('news_articles')
        .insert({ ...payload, tenant_id: tenantId, created_at: now, updated_at: now })
        .select('id')
        .single()

      inserted = createData
      let error = createError

      if (isMissingColumnError(error, 'tenant_id')) {
        const fallback = await supabase
          .from('news_articles')
          .insert({ ...payload, created_at: now, updated_at: now })
          .select('id')
          .single()
        inserted = fallback.data
        error = fallback.error
      }

      if (error) return { success: false, error: error.message }
      if (!inserted) return { success: false, error: 'Nieuwsbericht kon niet worden opgeslagen.' }
      savedId = inserted.id
    }

    revalidateNewsPaths(data.slug)
    return { success: true, id: savedId }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Opslaan mislukt.' }
  }
}

export async function deleteNewsArticle(id: string, slug?: string): Promise<ActionResult> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
      .from('news_articles')
      .delete()
      .eq('id', id)
      .eq('tenant_id', getTenantId())
    if (error) return { success: false, error: error.message }
    revalidateNewsPaths(slug)
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Verwijderen mislukt.' }
  }
}
