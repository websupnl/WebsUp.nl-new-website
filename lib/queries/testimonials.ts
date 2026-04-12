import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { Testimonial } from '@/types/database.types'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'

// ─── Public queries (ISR-safe, no cookies) ────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createPublicSupabaseClient()
  let { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('tenant_id', getTenantId())
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    data = fallback.data
    error = fallback.error
  }

  if (error) return []
  return data ?? []
}

// ─── Admin queries (require auth context) ────────────────────

export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  const supabase = await createAdminSupabaseClient()
  let { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('tenant_id', getTenantId())
    .order('created_at', { ascending: false })

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    data = fallback.data
    error = fallback.error
  }

  if (error) return []
  return data ?? []
}
