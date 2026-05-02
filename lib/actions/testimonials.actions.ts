'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'
import { requireAuthenticatedUser } from '@/lib/auth/admin'
import { assert, isSafeUrl, normalizeText, validateLength } from '@/lib/security/validation'

type ActionResult = { success: true; id?: string } | { success: false; error: string }

function revalidateTestimonialPaths() {
  revalidatePath('/', 'layout')
  revalidatePath('/projecten', 'layout')
  revalidatePath('/admin')
  revalidatePath('/admin/testimonials')
}

export async function saveTestimonial(data: {
  id?: string
  name: string
  role?: string | null
  content: string
  rating: number
  avatar_url?: string | null
  published?: boolean
  project_id?: string | null
}): Promise<ActionResult> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    const tenantId = getTenantId()
    const now = new Date().toISOString()
    let savedId = data.id
    const name = normalizeText(data.name)
    const role = normalizeText(data.role)
    const content = normalizeText(data.content)

    assert(name.length >= 2, 'Naam moet minimaal 2 tekens bevatten.')
    assert(validateLength(name, 100), 'Naam mag maximaal 100 tekens bevatten.')
    assert(validateLength(role, 120), 'Functie of bedrijf mag maximaal 120 tekens bevatten.')
    assert(content.length >= 10, 'Testimonial moet minimaal 10 tekens bevatten.')
    assert(validateLength(content, 1000), 'Testimonial mag maximaal 1000 tekens bevatten.')
    assert(data.rating >= 1 && data.rating <= 5, 'Beoordeling moet tussen 1 en 5 liggen.')
    assert(isSafeUrl(data.avatar_url), 'Avatar-URL is ongeldig.')

    const payload = {
      ...data,
      name,
      role: role || null,
      content,
      avatar_url: normalizeText(data.avatar_url) || null,
      project_id: data.project_id || null,
      tenant_id: tenantId,
    }

    if (data.id) {
      let { error } = await supabase
        .from('testimonials')
        .update(payload)
        .eq('id', data.id)
        .eq('tenant_id', tenantId)

      if (isMissingColumnError(error, 'tenant_id')) {
        const fallback = await supabase
          .from('testimonials')
          .update(payload)
          .eq('id', data.id)
        error = fallback.error
      }

      if (error) return { success: false, error: error.message }
    } else {
      let inserted: { id: string } | null = null
      const { data: primaryInserted, error: primaryError } = await supabase
        .from('testimonials')
        .insert({
          ...payload,
          created_at: now,
        })
        .select('id')
        .single()

      inserted = primaryInserted
      let error = primaryError

      if (isMissingColumnError(error, 'tenant_id')) {
        const fallback = await supabase
          .from('testimonials')
          .insert({
            ...payload,
            created_at: now,
          })
          .select('id')
          .single()

        inserted = fallback.data
        error = fallback.error
      }

      if (error) return { success: false, error: error.message }
      if (!inserted) return { success: false, error: 'Review kon niet worden opgeslagen.' }
      savedId = inserted.id
    }

    revalidateTestimonialPaths()
    return { success: true, id: savedId }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Opslaan mislukt.' }
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    let { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
      .eq('tenant_id', getTenantId())

    if (isMissingColumnError(error, 'tenant_id')) {
      const fallback = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)
      error = fallback.error
    }

    if (error) return { success: false, error: error.message }

    revalidateTestimonialPaths()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Verwijderen mislukt.' }
  }
}
