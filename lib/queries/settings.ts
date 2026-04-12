import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { getTenantId } from '@/lib/tenant'
import { isMissingTableError } from '@/lib/supabase/schema-helpers'

export type SiteSettings = {
  company_name?: string
  company_tagline?: string
  contact_email?: string
  contact_phone?: string
  contact_address?: string
  social_linkedin?: string
  social_twitter?: string
  social_facebook?: string
  brand_primary_color?: string
}

export async function getSettings(): Promise<SiteSettings> {
  const supabase = createPublicSupabaseClient()
  const { data, error } = await supabase
    .from('settings')
    .select('key, value')

  if (!error && data) {
    return data.reduce<SiteSettings>((acc, { key, value }) => {
      return { ...acc, [key]: value ?? undefined }
    }, {})
  }

  if (!isMissingTableError(error, 'settings')) return {}

  const { data: fallback } = await supabase
    .from('site_settings')
    .select('site_name, tagline, email, phone, address, linkedin_url, primary_color')
    .eq('tenant_id', getTenantId())
    .maybeSingle()

  if (!fallback) return {}

  return {
    company_name: fallback.site_name ?? undefined,
    company_tagline: fallback.tagline ?? undefined,
    contact_email: fallback.email ?? undefined,
    contact_phone: fallback.phone ?? undefined,
    contact_address: fallback.address ?? undefined,
    social_linkedin: fallback.linkedin_url ?? undefined,
    brand_primary_color: fallback.primary_color ?? undefined,
  }
}
