export const revalidate = 3600

import { Metadata } from 'next'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import HeroSection from '@/components/site/HeroSection'
import AboutMeSection from '@/components/site/AboutMeSection'
import TestimonialsSection from '@/components/site/TestimonialsSection'
import StarterCTASection from '@/components/site/StarterCTASection'
import WhySection from '@/components/site/WhySection'
import VoorWieSection from '@/components/site/VoorWieSection'
import CTASection from '@/components/site/CTASection'
import CookieBanner from '@/components/site/CookieBanner'
import { getTestimonials } from '@/lib/queries/testimonials'
import { getMergedSiteSettings, getMergedSeoSettings, getNavigationItems } from '@/lib/queries/site-settings'
import { siteConfig } from '@/config/site.config'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getMergedSeoSettings()
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
    },
  }
}

export default async function HomePage() {
  const [testimonials, settings, allNavItems] = await Promise.all([
    getTestimonials(),
    getMergedSiteSettings(),
    getNavigationItems(),
  ])

  const headerNavItems = allNavItems.filter((i) => i.location === 'header')
  const activeHeaderNav = headerNavItems.length >= siteConfig.nav.length ? headerNavItems : []

  return (
    <>
      <Navbar
        siteName={settings.site_name}
        primaryColor={settings.primary_color ?? undefined}
        logoUrl={settings.logo_url ?? undefined}
        navItems={activeHeaderNav}
      />
      <main className="page-shell flex-1">
        <HeroSection />
        <AboutMeSection />
        <WhySection />
        <VoorWieSection />
        <StarterCTASection />
        <TestimonialsSection testimonials={testimonials} />
        <CTASection />
      </main>
      <Footer
        siteName={settings.site_name}
        email={settings.email ?? undefined}
        phone={settings.phone ?? undefined}
        address={settings.address ?? undefined}
        linkedinUrl={settings.linkedin_url ?? undefined}
        logoUrl={settings.logo_url ?? undefined}
        footerLinks={siteConfig.footer.links}
      />
      <CookieBanner />
    </>
  )
}
