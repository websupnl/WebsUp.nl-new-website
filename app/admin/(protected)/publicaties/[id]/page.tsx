import { notFound } from 'next/navigation'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import PublicationForm from '@/components/admin/PublicationForm'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'

interface Props {
  params: Promise<{ id: string }>
}

export default async function BewerkenPublicatiePage({ params }: Props) {
  const { id } = await params
  const supabase = await createAdminSupabaseClient()

  const { data: publication, error } = await supabase
    .from('publications')
    .select('*')
    .eq('id', id)
    .eq('tenant_id', getTenantId())
    .single()

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('publications')
      .select('*')
      .eq('id', id)
      .single()

    if (fallback.error || !fallback.data) notFound()

    return <PublicationForm publication={fallback.data} mode="edit" />
  }

  if (error || !publication) notFound()

  return <PublicationForm publication={publication} mode="edit" />
}
