'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getTenantId } from '@/lib/tenant'
import { AuthorRequest } from '@/types/database.types'
import { requireAuthenticatedUser } from '@/lib/auth/admin'
import { assert, isValidEmail, normalizeText, validateLength } from '@/lib/security/validation'

type ActionResult = { success: true } | { success: false; error: string }

export async function submitAuthorRequest(data: {
  name: string
  company?: string
  email: string
  subject?: string
  message?: string
}): Promise<ActionResult> {
  try {
    const supabase = await createServerSupabaseClient()
    const name = normalizeText(data.name)
    const company = normalizeText(data.company)
    const email = normalizeText(data.email)
    const subject = normalizeText(data.subject)
    const message = normalizeText(data.message)

    assert(name.length >= 2, 'Naam moet minimaal 2 tekens bevatten.')
    assert(validateLength(name, 100), 'Naam mag maximaal 100 tekens bevatten.')
    assert(validateLength(company, 120), 'Bedrijfsnaam mag maximaal 120 tekens bevatten.')
    assert(isValidEmail(email), 'E-mailadres is ongeldig.')
    assert(validateLength(subject, 160), 'Onderwerp mag maximaal 160 tekens bevatten.')
    assert(validateLength(message, 5000), 'Bericht mag maximaal 5000 tekens bevatten.')

    const { error } = await supabase.from('author_requests').insert({
      name,
      company: company || null,
      email,
      subject: subject || null,
      message: message || null,
      tenant_id: getTenantId(),
      status: 'new',
    })
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Verzenden mislukt.' }
  }
}

export async function getAllAuthorRequests(): Promise<AuthorRequest[]> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('author_requests')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return []
    return (data ?? []) as AuthorRequest[]
  } catch {
    return []
  }
}

export async function updateAuthorRequestStatus(
  id: string,
  status: 'new' | 'contacted'
): Promise<ActionResult> {
  try {
    await requireAuthenticatedUser()
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
      .from('author_requests')
      .update({ status })
      .eq('id', id)
      .eq('tenant_id', getTenantId())
    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/auteur-aanvragen')
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Status wijzigen mislukt.' }
  }
}
