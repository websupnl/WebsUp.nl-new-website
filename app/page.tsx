export const revalidate = 3600

import { Metadata } from 'next'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import HeroSection from '@/components/site/HeroSection'
import GuarantiesSection from '@/components/site/GuarantiesSection'
import ComparisonSection from '@/components/site/ComparisonSection'
import ServicesSection from '@/components/site/ServicesSection'
import ProjectsSection from '@/components/site/ProjectsSection'
import AboutMeSection from '@/components/site/AboutMeSection'
import ReviewsSection from '@/components/site/ReviewsSection'
import CTASection from '@/components/site/CTASection'
import CookieBanner from '@/components/site/CookieBanner'
import ServiceCategoryStrip from '@/components/site/ServiceCategoryStrip'
import FeaturedSystemBanner from '@/components/site/FeaturedSystemBanner'
import CdEcosystemIntro from '@/components/site/cd-ecosystem-intro'
import CdWebsiteRedesign from '@/components/site/cd-website-redesign'
import CdAutomation from '@/components/site/cd-automation'
import CdWorkflow from '@/components/site/cd-workflow'
import CdKennisbankCards from '@/components/site/cd-kennisbank-cards'
import CdNieuwsUpdate from '@/components/site/cd-nieuws-update'
import CdFaq from '@/components/site/cd-faq'

import { getProjects } from '@/lib/queries/projects'
import { getMergedSiteSettings, getMergedSeoSettings } from '@/lib/queries/site-settings'

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
  const [settings, projects, seo] = await Promise.all([
    getMergedSiteSettings(),
    getProjects(),
    getMergedSeoSettings(),
  ])

  return (
    <>
      <Navbar
        siteName={settings.site_name}
        primaryColor={settings.primary_color ?? undefined}
        logoUrl={settings.logo_url ?? undefined}
      />
      <main className="page-shell flex-1">
        <HeroSection />
        <ServiceCategoryStrip />
        <FeaturedSystemBanner />
        <CdEcosystemIntro />
        <CdWebsiteRedesign />
        <CdAutomation />
        <CdWorkflow />
        <CdKennisbankCards />
        <CdNieuwsUpdate />
        <GuarantiesSection />
        <ComparisonSection />
        <ServicesSection />
        <ProjectsSection projects={projects} limit={3} />
        <AboutMeSection />
        <ReviewsSection />
        <CdFaq />
        <CTASection />
      </main>
      <Footer
        siteName={settings.site_name}
        linkedinUrl={settings.linkedin_url ?? undefined}
        logoUrl={settings.logo_url ?? undefined}
      />
      <CookieBanner analyticsId={seo.google_analytics_id} />
    </>
  )
}
