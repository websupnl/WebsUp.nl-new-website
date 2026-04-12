import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getTenantId } from '@/lib/tenant'
import { requireAuthenticatedAdminPage } from '@/lib/auth/admin'
import SettingsClient from '@/components/admin/settings/SettingsClient'
import type {
  FormRow,
  ModuleRow,
  NavigationItemRow,
  SeoSettingsRow,
  SiteSettingsRow,
} from '@/types/database.types'

type NavItemDraft = Omit<NavigationItemRow, 'created_at'> & { id: string }
type FormDraft = Omit<FormRow, 'tenant_id' | 'created_at' | 'updated_at'>
type ModuleDraft = Pick<ModuleRow, 'key' | 'enabled' | 'label'>

export default async function InstellingenPage() {
  const { role } = await requireAuthenticatedAdminPage()
  if (role !== 'admin') {
    redirect('/admin')
  }

  const supabase = await createServerSupabaseClient()
  const tenantId = getTenantId()
  const unavailableTables: string[] = []

  const [siteRes, seoRes, navRes, modulesRes, formsRes] = await Promise.all([
    supabase.from('site_settings').select('*').eq('tenant_id', tenantId).maybeSingle(),
    supabase.from('seo_settings').select('*').eq('tenant_id', tenantId).maybeSingle(),
    supabase.from('navigation_items').select('*').eq('tenant_id', tenantId).order('order_index'),
    supabase.from('modules').select('*').eq('tenant_id', tenantId),
    supabase.from('forms').select('*').eq('tenant_id', tenantId),
  ])

  if (siteRes.error) unavailableTables.push('site_settings')
  if (seoRes.error) unavailableTables.push('seo_settings')
  if (navRes.error) unavailableTables.push('navigation_items')
  if (modulesRes.error) unavailableTables.push('modules')
  if (formsRes.error) unavailableTables.push('forms')

  return (
    <SettingsClient
      initialSiteSettings={(siteRes.data ?? {}) as Partial<SiteSettingsRow>}
      initialSeoSettings={(seoRes.data ?? {}) as Partial<SeoSettingsRow>}
      initialNavItems={((navRes.data ?? []) as NavigationItemRow[]).map((item) => ({
        ...item,
      })) as NavItemDraft[]}
      initialModules={((modulesRes.data ?? []) as ModuleRow[]).map((item) => ({
        key: item.key,
        enabled: item.enabled,
        label: item.label,
      })) as ModuleDraft[]}
      initialForms={((formsRes.data ?? []) as FormRow[]).map((form) => ({
        id: form.id,
        name: form.name,
        email_to: form.email_to,
        fields: form.fields ?? [],
      })) as FormDraft[]}
      unavailableTables={unavailableTables}
    />
  )
}
