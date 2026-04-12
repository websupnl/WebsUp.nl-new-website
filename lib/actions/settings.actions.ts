'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getTenantId } from '@/lib/tenant'
import type { SiteSettingsRow, SeoSettingsRow, NavigationItemRow, FormFieldDef } from '@/types/database.types'
import { requireAdminUser, requireAuthenticatedUser } from '@/lib/auth/admin'
import {
  assert,
  getBase64ByteLength,
  isAllowedImageMimeType,
  isSafeUrl,
  isValidEmail,
  normalizeText,
  sanitizeFilename,
  validateLength,
} from '@/lib/security/validation'

type ActionResult = { success: true } | { success: false; error: string }

// ─── Site settings ───────────────────────────────────────────

export async function saveSiteSettings(
  data: Partial<Omit<SiteSettingsRow, 'id' | 'tenant_id' | 'updated_at'>>
): Promise<ActionResult> {
  try {
    await requireAdminUser()
    if (data.email) assert(isValidEmail(data.email), 'E-mailadres is ongeldig.')
    if (data.logo_url) assert(isSafeUrl(data.logo_url), 'Logo-URL is ongeldig.')
    if (data.logo_dark_url) assert(isSafeUrl(data.logo_dark_url), 'Donker logo-URL is ongeldig.')
    if (data.favicon_url) assert(isSafeUrl(data.favicon_url), 'Favicon-URL is ongeldig.')
    if (data.linkedin_url) assert(isSafeUrl(data.linkedin_url), 'LinkedIn-URL is ongeldig.')
    if (data.og_image_url) assert(isSafeUrl(data.og_image_url), 'OG image-URL is ongeldig.')
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
      .from('site_settings')
      .upsert(
        { ...data, tenant_id: getTenantId(), updated_at: new Date().toISOString() },
        { onConflict: 'tenant_id' }
      )
    if (error) return { success: false, error: error.message }
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Opslaan mislukt.' }
  }
}

// ─── SEO settings ────────────────────────────────────────────

export async function saveSeoSettings(
  data: Partial<Omit<SeoSettingsRow, 'id' | 'tenant_id' | 'updated_at'>>
): Promise<ActionResult> {
  try {
    await requireAdminUser()
    if (data.canonical_url) assert(isSafeUrl(data.canonical_url), 'Canonical URL is ongeldig.')
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
      .from('seo_settings')
      .upsert(
        { ...data, tenant_id: getTenantId(), updated_at: new Date().toISOString() },
        { onConflict: 'tenant_id' }
      )
    if (error) return { success: false, error: error.message }
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Opslaan mislukt.' }
  }
}

// ─── Navigation ──────────────────────────────────────────────

export async function saveNavigationItems(
  items: Array<Omit<NavigationItemRow, 'id' | 'tenant_id' | 'created_at'> & { id?: string }>
): Promise<ActionResult> {
  try {
    await requireAdminUser()
    for (const item of items) {
      assert(validateLength(normalizeText(item.label), 60), 'Navigatielabel is te lang.')
      assert(validateLength(normalizeText(item.url), 255), 'Navigatie-URL is te lang.')
      if (item.type === 'external') {
        assert(isSafeUrl(item.url), 'Externe navigatie-URL is ongeldig.')
      } else {
        assert(item.url.startsWith('/'), 'Interne navigatie-URL moet met een / beginnen.')
      }
    }
    const supabase = await createServerSupabaseClient()
    const tenantId = getTenantId()

    // Delete all existing items for this tenant, then insert fresh
    const { error: delError } = await supabase
      .from('navigation_items')
      .delete()
      .eq('tenant_id', tenantId)
    if (delError) return { success: false, error: delError.message }

    if (items.length > 0) {
      const { error: insError } = await supabase.from('navigation_items').insert(
        items.map((item, idx) => ({
          ...item,
          tenant_id: tenantId,
          order_index: idx,
        }))
      )
      if (insError) return { success: false, error: insError.message }
    }

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Opslaan mislukt.' }
  }
}

// ─── Modules ─────────────────────────────────────────────────

export async function saveModules(
  modules: Array<{ key: string; enabled: boolean; label?: string }>
): Promise<ActionResult> {
  try {
    await requireAdminUser()
    const supabase = await createServerSupabaseClient()
    const tenantId = getTenantId()
    const { error } = await supabase.from('modules').upsert(
      modules.map((m) => ({
        tenant_id: tenantId,
        key: m.key,
        enabled: m.enabled,
        label: m.label ?? null,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: 'tenant_id,key' }
    )
    if (error) return { success: false, error: error.message }
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Opslaan mislukt.' }
  }
}

// ─── Forms ───────────────────────────────────────────────────

export async function saveForms(forms: Array<{
  id?: string
  name: string
  email_to: string
  fields: FormFieldDef[]
}>): Promise<ActionResult> {
  try {
    await requireAdminUser()
    const supabase = await createServerSupabaseClient()
    const tenantId = getTenantId()

    // Upsert each form
    for (const form of forms) {
      assert(validateLength(normalizeText(form.name), 120), 'Formuliernaam is te lang.')
      assert(!form.email_to || isValidEmail(form.email_to), 'Ontvangst-e-mailadres is ongeldig.')
      assert(form.fields.length <= 30, 'Een formulier mag maximaal 30 velden bevatten.')

      form.fields.forEach((field, index) => {
        assert(validateLength(normalizeText(field.id), 80), `Veld ${index + 1} heeft een ongeldige id.`)
        assert(validateLength(normalizeText(field.label), 120), `Veld ${index + 1} heeft een te lang label.`)
        assert(validateLength(normalizeText(field.placeholder), 200), `Veld ${index + 1} heeft een te lange placeholder.`)
      })

      const payload = {
        tenant_id: tenantId,
        name: form.name,
        email_to: form.email_to,
        fields: form.fields,
        updated_at: new Date().toISOString(),
      }
      if (form.id) {
        const { error } = await supabase
          .from('forms')
          .update(payload)
          .eq('id', form.id)
          .eq('tenant_id', tenantId)
        if (error) return { success: false, error: error.message }
      } else {
        const { error } = await supabase.from('forms').insert(payload)
        if (error) return { success: false, error: error.message }
      }
    }

    revalidatePath('/admin/instellingen')
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Opslaan mislukt.' }
  }
}

export async function deleteForm(formId: string): Promise<ActionResult> {
  try {
    await requireAdminUser()
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', formId)
      .eq('tenant_id', getTenantId())
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Verwijderen mislukt.' }
  }
}

// ─── Media upload ─────────────────────────────────────────────

export async function uploadMedia(
  base64: string,
  filename: string,
  mimeType: string
): Promise<{ url: string } | { error: string }> {
  try {
    await requireAuthenticatedUser()
    assert(isAllowedImageMimeType(mimeType), 'Bestandstype niet toegestaan.')
    assert(getBase64ByteLength(base64) <= 5 * 1024 * 1024, 'Bestand is te groot.')
    assert(validateLength(filename, 180), 'Bestandsnaam is te lang.')
    const supabase = await createServerSupabaseClient()
    const binaryString = atob(base64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const path = `${getTenantId()}/${Date.now()}-${sanitizeFilename(filename)}`

    const { error } = await supabase.storage
      .from('media')
      .upload(path, bytes, { contentType: mimeType, upsert: true })

    if (error) return { error: error.message }

    const { data } = supabase.storage.from('media').getPublicUrl(path)
    return { url: data.publicUrl }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Upload mislukt.' }
  }
}
