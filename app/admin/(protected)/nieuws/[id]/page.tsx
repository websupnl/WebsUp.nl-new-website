import { notFound } from 'next/navigation'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import NewsForm from '@/components/admin/NewsForm'
import { NewsArticle } from '@/types/database.types'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'

interface Props {
  params: Promise<{ id: string }>
}

export default async function NieuwsEditPage({ params }: Props) {
  const { id } = await params
  const supabase = await createAdminSupabaseClient()

  const { data: article, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('id', id)
    .eq('tenant_id', getTenantId())
    .single()

  let finalArticle = article

  if (!finalArticle && isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', id)
      .single()
    finalArticle = fallback.data
  }

  if (!finalArticle) notFound()

  return <NewsForm article={finalArticle as NewsArticle} mode="edit" />
}
