import { createServerSupabaseClient } from '@/lib/supabase/server'
import { requireAdminUser } from '@/lib/auth/admin'

export async function POST(req: Request) {
  try {
    void req
    await requireAdminUser()
    const supabase = await createServerSupabaseClient()

    // Migrate published=true to status='published'
    const { data, error } = await supabase
      .from('news_articles')
      .update({ status: 'published' })
      .eq('published', true)
      .select('id, title, status, published')

    if (error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    // Verify
    const { data: allArticles } = await supabase
      .from('news_articles')
      .select('id, status')

    const counts = {
      draft: allArticles?.filter((a) => a.status === 'draft').length || 0,
      published: allArticles?.filter((a) => a.status === 'published').length || 0,
      total: allArticles?.length || 0,
    }

    return Response.json(
      {
        success: true,
        message: `Migrated ${data?.length || 0} articles to status='published'`,
        updated: data || [],
        counts,
      },
      { status: 200 }
    )
  } catch (err) {
    return Response.json(
      { success: false, error: err instanceof Error ? err.message : 'Migratie mislukt.' },
      { status: err instanceof Error && err.message === 'Onvoldoende rechten.' ? 403 : 500 }
    )
  }
}
