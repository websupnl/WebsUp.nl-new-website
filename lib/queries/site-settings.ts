import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { getTenantId } from '@/lib/tenant'
import { siteConfig } from '@/config/site.config'
import type { SiteSettingsRow, SeoSettingsRow, NavigationItemRow, ModuleRow } from '@/types/database.types'

// ─── Site settings ───────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettingsRow | null> {
  try {
    const supabase = createPublicSupabaseClient()
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .eq('tenant_id', getTenantId())
      .single()
    return data ?? null
  } catch {
    return null
  }
}

/** Merged: DB values with config.ts as fallback */
export async function getMergedSiteSettings() {
  const db = await getSiteSettings()
  return {
    site_name:       db?.site_name       ?? siteConfig.name,
    tagline:         db?.tagline         ?? siteConfig.footer.tagline,
    logo_url:        db?.logo_url        ?? null,
    logo_dark_url:   db?.logo_dark_url   ?? null,
    favicon_url:     db?.favicon_url     ?? null,
    primary_color:   db?.primary_color   ?? siteConfig.brand.primary,
    secondary_color: db?.secondary_color ?? siteConfig.brand.primaryHover,
    font_family:     db?.font_family     ?? 'Inter',
    email:           db?.email           ?? siteConfig.email,
    phone:           db?.phone           ?? siteConfig.phone,
    address:         db?.address         ?? siteConfig.address,
    linkedin_url:    db?.linkedin_url    ?? siteConfig.social.linkedin,
    og_image_url:    db?.og_image_url    ?? siteConfig.seo.ogImage,
  }
}

// ─── SEO settings ────────────────────────────────────────────

export async function getSeoSettings(): Promise<SeoSettingsRow | null> {
  try {
    const supabase = createPublicSupabaseClient()
    const { data } = await supabase
      .from('seo_settings')
      .select('*')
      .eq('tenant_id', getTenantId())
      .single()
    return data ?? null
  } catch {
    return null
  }
}

export async function getMergedSeoSettings() {
  const db = await getSeoSettings()
  return {
    meta_title:          db?.meta_title          ?? siteConfig.seo.defaultTitle,
    meta_description:    db?.meta_description    ?? siteConfig.seo.defaultDescription,
    keywords:            db?.keywords            ?? '',
    canonical_url:       db?.canonical_url       ?? siteConfig.url,
    og_title:            db?.og_title            ?? siteConfig.seo.defaultTitle,
    og_description:      db?.og_description      ?? siteConfig.seo.defaultDescription,
    google_analytics_id: db?.google_analytics_id ?? siteConfig.seo.googleAnalyticsId,
  }
}

// ─── Navigation ──────────────────────────────────────────────

export async function getNavigationItems(location?: 'header' | 'footer'): Promise<NavigationItemRow[]> {
  try {
    const supabase = createPublicSupabaseClient()
    let query = supabase
      .from('navigation_items')
      .select('*')
      .eq('tenant_id', getTenantId())
      .order('order_index', { ascending: true })

    if (location) query = query.eq('location', location)

    const { data } = await query
    return data ?? []
  } catch {
    // Fallback to config nav
    return siteConfig.nav.map((item, i) => ({
      id: String(i),
      tenant_id: getTenantId(),
      label: item.label,
      url: item.href,
      type: 'internal' as const,
      location: 'header' as const,
      order_index: i,
      created_at: '',
    }))
  }
}

// ─── Modules ─────────────────────────────────────────────────

export async function getModules(): Promise<ModuleRow[]> {
  try {
    const supabase = createPublicSupabaseClient()
    const { data } = await supabase
      .from('modules')
      .select('*')
      .eq('tenant_id', getTenantId())
    return data ?? []
  } catch {
    return []
  }
}

export async function isModuleEnabled(key: string): Promise<boolean> {
  const modules = await getModules()
  const mod = modules.find((m) => m.key === key)
  return mod?.enabled ?? true
}
