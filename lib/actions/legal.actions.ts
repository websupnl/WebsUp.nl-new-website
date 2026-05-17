'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getTenantId } from '@/lib/tenant'
import { requireAdminUser } from '@/lib/auth/admin'

type ActionResult = { success: true } | { success: false; error: string }

export async function saveLegalPage(data: {
  slug: 'algemene-voorwaarden' | 'privacybeleid' | 'cookiebeleid'
  title: string
  content: string
  version: string
}): Promise<ActionResult> {
  try {
    await requireAdminUser()

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
      .from('legal_pages')
      .upsert(
        {
          tenant_id: getTenantId(),
          slug: data.slug,
          title: data.title.trim(),
          content: data.content,
          version: data.version.trim(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'tenant_id,slug' }
      )

    if (error) return { success: false, error: error.message }

    revalidatePath(`/${data.slug}`, 'layout')
    revalidatePath('/admin/juridisch', 'layout')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Onbekende fout' }
  }
}
