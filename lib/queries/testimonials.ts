import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { Testimonial } from '@/types/database.types'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'

export interface TestimonialWithProject extends Testimonial {
  project?: { slug: string; title: string } | null
}

// ─── Public queries (ISR-safe, no cookies) ────────────────────

export async function getTestimonials(): Promise<TestimonialWithProject[]> {
  const supabase = createPublicSupabaseClient()
  // Join: PostgREST embed via FK relation testimonials.project_id → projects.id
  let { data, error } = await supabase
    .from('testimonials')
    .select('*, project:projects(slug, title)')
    .eq('tenant_id', getTenantId())
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (isMissingColumnError(error, 'tenant_id') || isMissingColumnError(error, 'project_id')) {
    const fallback = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    data = fallback.data as never
    error = fallback.error
  }

  if (error) return []
  return (data ?? []) as unknown as TestimonialWithProject[]
}

/** Haal de gepubliceerde review op die aan een specifiek project gekoppeld is. */
export async function getTestimonialByProjectId(projectId: string): Promise<Testimonial | null> {
  const supabase = createPublicSupabaseClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('tenant_id', getTenantId())
    .eq('published', true)
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (isMissingColumnError(error, 'project_id')) return null
  if (error) return null
  return data
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
