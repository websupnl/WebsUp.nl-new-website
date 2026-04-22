export const revalidate = 3600

import { Metadata } from 'next'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import HeroSection from '@/components/site/HeroSection'
import AboutMeSection from '@/components/site/AboutMeSection'
import TestimonialsSection from '@/components/site/TestimonialsSection'
import StarterCTASection from '@/components/site/StarterCTASection'
import ServicesSection from '@/components/site/ServicesSection'
import ProjectsSection from '@/components/site/ProjectsSection'
import VoorWieSection from '@/components/site/VoorWieSection'
import FAQSection from '@/components/site/FAQSection'
import KennisbankPreviewSection from '@/components/site/KennisbankPreviewSection'
import CTASection from '@/components/site/CTASection'
import CookieBanner from '@/components/site/CookieBanner'
import { getTestimonials } from '@/lib/queries/testimonials'
import { getLatestNewsArticles } from '@/lib/queries/news'
import { getProjects } from '@/lib/queries/projects'
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
  const [testimonials, settings, allNavItems, latestArticles, projects, seo] = await Promise.all([
    getTestimonials(),
    getMergedSiteSettings(),
    getNavigationItems(),
    getLatestNewsArticles(3),
    getProjects(),
    getMergedSeoSettings(),
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
        <ProjectsSection projects={projects} limit={3} />
        <ServicesSection />
        <AboutMeSection />
        <VoorWieSection />
        <TestimonialsSection testimonials={testimonials} />
        <StarterCTASection />
        <FAQSection limit={5} />
        <KennisbankPreviewSection articles={latestArticles} />
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
      <CookieBanner analyticsId={seo.google_analytics_id} />
    </>
  )
}
