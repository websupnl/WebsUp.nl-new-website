export const revalidate = 3600

import { Metadata } from 'next'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import HeroSection from '@/components/site/HeroSection'
import SolutionsSection from '@/components/site/SolutionsSection'
import BentoSection from '@/components/site/BentoSection'
import WhySection from '@/components/site/WhySection'
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
  const footerNavItems = allNavItems.filter((i) => i.location === 'footer')
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
        {/* 1. Hero — Stripe two-panel + logo carousel */}
        <HeroSection />

        {/* 3. Solutions — 3 alternating sections */}
        <SolutionsSection />

        {/* 4. Use cases — bento grid */}
        <BentoSection />

        {/* 5. Why WebsUp — sticky left + testimonial cards */}
        <WhySection testimonials={testimonials.map((t) => ({
          name: t.name,
          role: t.role ?? undefined,
          content: t.content,
        }))} />

        {/* 6. CTA boven footer */}
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
