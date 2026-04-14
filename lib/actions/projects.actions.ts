'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError, isMissingTableError } from '@/lib/supabase/schema-helpers'
import { requireAuthenticatedUser } from '@/lib/auth/admin'
import { sanitizeRichTextHtml } from '@/lib/security/content'
import {
  assert,
  isSafeInternalRedirect,
  isSafeUrl,
  isValidSlug,
  normalizeText,
  validateLength,
} from '@/lib/security/validation'

type ActionResult = { success: true; id?: string } | { success: false; error: string }

function isPersistedProjectId(value?: string | null) {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  )
}

function projectTableErrorMessage(error: { message?: string } | null | undefined) {
  if (isMissingTableError(error, 'projects')) {
    return 'De projects-tabel ontbreekt nog in Supabase. Run eerst de nieuwe migration.'
  }

  return error?.message ?? 'Opslaan mislukt.'
}

function revalidateProjectPaths(slug?: string) {
  revalidatePath('/', 'layout')
  revalidatePath('/projecten')
  revalidatePath('/admin')
  revalidatePath('/admin/projecten')

  if (slug) {
    revalidatePath(`/projecten/${slug}`)
  }
}

async function findExistingProjectIdBySlug(supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>, slug: string) {
  let { data, error } = await supabase
    .from('projects')
    .select('id')
    .eq('tenant_id', getTenantId())
    .eq('slug', slug)
    .maybeSingle()

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('projects')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    data = fallback.data
    error = fallback.error
  }

  if (error) {
    return { id: null, error }
  }

  return { id: data?.id ?? null, error: null }
}

export async function saveProject(data: {
  id?: string
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  image_url: string
  website_url?: string | null
  highlights: string[]
  featured?: boolean
  published?: boolean
  sort_order: number
}): Promise<ActionResult> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    const tenantId = getTenantId()
    const now = new Date().toISOString()
    const title = normalizeText(data.title)
    const slug = normalizeText(data.slug)
    const category = normalizeText(data.category)
    const excerpt = normalizeText(data.excerpt)
    const content = normalizeText(data.content)
    const imageUrl = normalizeText(data.image_url)
    const websiteUrl = normalizeText(data.website_url)
    const highlights = data.highlights
      .map((item) => normalizeText(item))
      .filter(Boolean)
      .slice(0, 6)

    assert(title.length >= 2, 'Titel moet minimaal 2 tekens bevatten.')
    assert(validateLength(title, 120), 'Titel mag maximaal 120 tekens bevatten.')
    assert(isValidSlug(slug), 'Slug is ongeldig.')
    assert(validateLength(slug, 140), 'Slug mag maximaal 140 tekens bevatten.')
    assert(category.length >= 2, 'Categorie moet minimaal 2 tekens bevatten.')
    assert(validateLength(category, 80), 'Categorie mag maximaal 80 tekens bevatten.')
    assert(excerpt.length >= 20, 'Korte beschrijving moet minimaal 20 tekens bevatten.')
    assert(validateLength(excerpt, 320), 'Korte beschrijving mag maximaal 320 tekens bevatten.')
    assert(content.length >= 40, 'Projectomschrijving moet minimaal 40 tekens bevatten.')
    assert(validateLength(content, 5000), 'Projectomschrijving mag maximaal 5000 tekens bevatten.')
    assert(imageUrl.length > 0, 'Afbeelding is verplicht.')
    assert(
      isSafeUrl(imageUrl) || isSafeInternalRedirect(imageUrl),
      'Afbeeldings-URL is ongeldig.'
    )
    assert(
      !websiteUrl || isSafeUrl(websiteUrl) || isSafeInternalRedirect(websiteUrl),
      'Website-URL is ongeldig.'
    )
    assert(highlights.length >= 1, 'Voeg minimaal 1 highlight toe.')
    assert(highlights.length <= 6, 'Voeg maximaal 6 highlights toe.')
    assert(Number.isFinite(data.sort_order), 'Sorteervolgorde is ongeldig.')
    assert(data.sort_order >= 0 && data.sort_order <= 9999, 'Sorteervolgorde is ongeldig.')
    highlights.forEach((item) => {
      assert(validateLength(item, 120), 'Een highlight is te lang.')
    })

    const persistedId = isPersistedProjectId(data.id) ? data.id : null
    const existingBySlug = await findExistingProjectIdBySlug(supabase, slug)

    if (existingBySlug.error) {
      return { success: false, error: projectTableErrorMessage(existingBySlug.error) }
    }

    if (persistedId && existingBySlug.id && existingBySlug.id !== persistedId) {
      return { success: false, error: 'Deze slug wordt al gebruikt door een ander project.' }
    }

    if (!persistedId && !data.id && existingBySlug.id) {
      return { success: false, error: 'Deze slug wordt al gebruikt door een ander project.' }
    }

    const targetId = persistedId ?? (data.id ? existingBySlug.id : null)

    const payload = {
      tenant_id: tenantId,
      title,
      slug,
      category,
      excerpt,
      content: sanitizeRichTextHtml(content),
      image_url: imageUrl,
      website_url: websiteUrl || null,
      highlights,
      featured: Boolean(data.featured),
      published: Boolean(data.published),
      sort_order: data.sort_order,
    }

    let savedId = targetId ?? undefined

    if (targetId) {
      let { error } = await supabase
        .from('projects')
        .update({ ...payload, updated_at: now })
        .eq('id', targetId)
        .eq('tenant_id', tenantId)

      if (isMissingColumnError(error, 'tenant_id')) {
        const fallback = await supabase
          .from('projects')
          .update({ ...payload, updated_at: now })
          .eq('id', targetId)

        error = fallback.error
      }

      if (error) {
        return { success: false, error: projectTableErrorMessage(error) }
      }
    } else {
      let inserted: { id: string } | null = null
      const { data: primaryInserted, error: primaryError } = await supabase
        .from('projects')
        .insert({
          ...payload,
          created_at: now,
          updated_at: now,
        })
        .select('id')
        .single()

      inserted = primaryInserted
      let error = primaryError

      if (isMissingColumnError(error, 'tenant_id')) {
        const fallback = await supabase
          .from('projects')
          .insert({
            ...payload,
            created_at: now,
            updated_at: now,
          })
          .select('id')
          .single()

        inserted = fallback.data
        error = fallback.error
      }

      if (error) {
        return { success: false, error: projectTableErrorMessage(error) }
      }

      if (!inserted?.id) {
        return { success: false, error: 'Project kon niet worden opgeslagen.' }
      }

      savedId = inserted.id
    }

    revalidateProjectPaths(slug)
    return { success: true, id: savedId }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Opslaan mislukt.' }
  }
}

export async function deleteProject(id: string, slug?: string): Promise<ActionResult> {
  try {
    await requireAuthenticatedUser()

    if (!isPersistedProjectId(id)) {
      return {
        success: false,
        error: 'Dit project staat nog niet in de database. Sla het eerst een keer op.',
      }
    }

    const supabase = await createServerSupabaseClient()
    let { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('tenant_id', getTenantId())

    if (isMissingColumnError(error, 'tenant_id')) {
      const fallback = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      error = fallback.error
    }

    if (error) {
      return { success: false, error: projectTableErrorMessage(error) }
    }

    revalidateProjectPaths(slug)
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Verwijderen mislukt.' }
  }
}
