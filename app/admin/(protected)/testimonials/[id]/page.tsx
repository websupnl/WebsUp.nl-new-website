import { notFound } from 'next/navigation'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import TestimonialForm from '@/components/admin/TestimonialForm'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'

interface Props {
  params: Promise<{ id: string }>
}

export default async function BewerkenTestimonialPage({ params }: Props) {
  const { id } = await params
  const supabase = await createAdminSupabaseClient()

  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .eq('tenant_id', getTenantId())
    .single()

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single()

    if (fallback.error || !fallback.data) notFound()

    return <TestimonialForm testimonial={fallback.data} mode="edit" />
  }

  if (error || !testimonial) notFound()

  return <TestimonialForm testimonial={testimonial} mode="edit" />
}
