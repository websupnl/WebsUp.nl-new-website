export const revalidate = 3600

import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import CookieBanner from '@/components/site/CookieBanner'
import { getMergedSiteSettings, getNavigationItems } from '@/lib/queries/site-settings'
import { siteConfig } from '@/config/site.config'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, allNavItems] = await Promise.all([
    getMergedSiteSettings(),
    getNavigationItems(),
  ])

  // Only use DB nav if it has items — otherwise Navbar falls back to siteConfig.nav
  const headerNavItems = allNavItems.filter((i) => i.location === 'header')
  const footerNavItems = allNavItems.filter((i) => i.location === 'footer')
  // If DB nav has fewer items than config, it's stale — pass empty to trigger FALLBACK_NAV
  const activeHeaderNav = headerNavItems.length >= siteConfig.nav.length ? headerNavItems : []

  return (
    <>
      <Navbar
        siteName={settings.site_name}
        primaryColor={settings.primary_color ?? undefined}
        logoUrl={settings.logo_url ?? undefined}
        navItems={activeHeaderNav}
      />
      <main className="page-shell flex-1">{children}</main>
      <Footer
        siteName={settings.site_name}
        email={settings.email ?? undefined}
        phone={settings.phone ?? undefined}
        address={settings.address ?? undefined}
        linkedinUrl={settings.linkedin_url ?? undefined}
        logoUrl={settings.logo_url ?? undefined}
        navItems={footerNavItems.length > 0 ? footerNavItems : headerNavItems}
        footerLinks={siteConfig.footer.links}
      />
      <CookieBanner />
    </>
  )
}
