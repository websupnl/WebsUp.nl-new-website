'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { PublicationBlock } from '@/types/database.types'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'
import { requireAuthenticatedUser } from '@/lib/auth/admin'
import { assert, isSafeUrl, isValidSlug, normalizeText, validateLength } from '@/lib/security/validation'

type ActionResult = { success: true } | { success: false; error: string }

export type BlockInput = Pick<PublicationBlock, 'type' | 'title' | 'content' | 'order_index'>

type SavePublicationResult =
  | { success: true; id: string }
  | { success: false; error: string }

function revalidatePublicationPaths(slug?: string) {
  revalidatePath('/', 'layout')
  revalidatePath('/publicaties')
  revalidatePath('/admin')
  revalidatePath('/admin/publicaties')
  if (slug) {
    revalidatePath(`/publicaties/${slug}`)
  }
}

export async function savePublication(data: {
  id?: string
  title: string
  slug: string
  excerpt?: string | null
  label?: string | null
  flip_url?: string | null
  image_url?: string | null
  published?: boolean
}): Promise<SavePublicationResult> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    const tenantId = getTenantId()
    const now = new Date().toISOString()
    let savedId = data.id
    const title = normalizeText(data.title)
    const slug = normalizeText(data.slug)
    const excerpt = normalizeText(data.excerpt)
    const label = normalizeText(data.label)
    const flipUrl = normalizeText(data.flip_url)

    assert(title.length >= 3, 'Titel moet minimaal 3 tekens bevatten.')
    assert(validateLength(title, 160), 'Titel mag maximaal 160 tekens bevatten.')
    assert(isValidSlug(slug), 'Slug mag alleen kleine letters, cijfers en koppeltekens bevatten.')
    assert(validateLength(slug, 120), 'Slug is te lang.')
    assert(validateLength(excerpt, 320), 'Samenvatting mag maximaal 320 tekens bevatten.')
    assert(validateLength(label, 60), 'Label mag maximaal 60 tekens bevatten.')
    assert(isSafeUrl(data.image_url), 'Afbeeldings-URL is ongeldig.')
    assert(isSafeUrl(flipUrl || null), 'Flipbook-URL is ongeldig.')

    const payload = {
      ...data,
      title,
      slug,
      excerpt: excerpt || null,
      label: label || null,
      flip_url: flipUrl || null,
      image_url: normalizeText(data.image_url) || null,
      tenant_id: tenantId,
    }

    if (data.id) {
      let { error } = await supabase
        .from('publications')
        .update({ ...payload, updated_at: now })
        .eq('id', data.id)
        .eq('tenant_id', tenantId)

      if (isMissingColumnError(error, 'tenant_id')) {
        const fallback = await supabase
          .from('publications')
          .update({ ...payload, updated_at: now })
          .eq('id', data.id)
        error = fallback.error
      }

      if (error) return { success: false, error: error.message }
    } else {
      let inserted: { id: string } | null = null
      const { data: primaryInserted, error: primaryError } = await supabase
        .from('publications')
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
          .from('publications')
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

      if (error) return { success: false, error: error.message }
      if (!inserted) return { success: false, error: 'Publicatie kon niet worden opgeslagen.' }
      savedId = inserted.id
    }

    revalidatePublicationPaths(data.slug)
    return { success: true, id: savedId! }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Opslaan mislukt.' }
  }
}

export async function deletePublication(id: string, slug?: string): Promise<ActionResult> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    let { error } = await supabase
      .from('publications')
      .delete()
      .eq('id', id)
      .eq('tenant_id', getTenantId())

    if (isMissingColumnError(error, 'tenant_id')) {
      const fallback = await supabase
        .from('publications')
        .delete()
        .eq('id', id)
      error = fallback.error
    }

    if (error) return { success: false, error: error.message }

    revalidatePublicationPaths(slug)
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Verwijderen mislukt.' }
  }
}

export async function savePublicationBlocks(
  publicationId: string,
  blocks: BlockInput[]
): Promise<ActionResult> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    const tenantId = getTenantId()
    const { data: publication, error: publicationError } = await supabase
      .from('publications')
      .select('id, slug')
      .eq('id', publicationId)
      .eq('tenant_id', tenantId)
      .single()

    if (publicationError || !publication) {
      return { success: false, error: 'Publicatie niet gevonden of niet toegankelijk.' }
    }

    for (const block of blocks) {
      const title = normalizeText(block.title)
      const content = normalizeText(block.content)

      assert(validateLength(title, 120), 'Bloktitel mag maximaal 120 tekens bevatten.')
      assert(validateLength(content, 5000), 'Blokinhoud mag maximaal 5000 tekens bevatten.')
    }

    // Delete all existing blocks for this publication
    const { error: deleteError } = await supabase
      .from('publication_blocks')
      .delete()
      .eq('publication_id', publicationId)

    if (deleteError) return { success: false, error: deleteError.message }

    // Insert new blocks (only if there are any)
    if (blocks.length > 0) {
      const rows = blocks.map((b, i) => ({
        publication_id: publicationId,
        type: b.type,
        title: b.title || null,
        content: b.content || null,
        order_index: i,
      }))

      const { error: insertError } = await supabase
        .from('publication_blocks')
        .insert(rows)

      if (insertError) return { success: false, error: insertError.message }
    }

    revalidatePublicationPaths(publication.slug)
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Blokken opslaan mislukt.' }
  }
}
