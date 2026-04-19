export const revalidate = 3600

import type { Metadata } from 'next'
import HeroSection from '@/components/site/HeroSection'
import AboutMeSection from '@/components/site/AboutMeSection'
import WhySection from '@/components/site/WhySection'
import VoorWieSection from '@/components/site/VoorWieSection'
import TestimonialsSection from '@/components/site/TestimonialsSection'
import FAQSection from '@/components/site/FAQSection'
import KennisbankPreviewSection from '@/components/site/KennisbankPreviewSection'
import CTASection from '@/components/site/CTASection'
import SiteFrame from '@/components/site/SiteFrame'
import HomeProjectsSection from '@/components/site/HomeProjectsSection'
import { getTestimonials } from '@/lib/queries/testimonials'
import { getLatestNewsArticles } from '@/lib/queries/news'
import { getMergedSeoSettings } from '@/lib/queries/site-settings'
import { getProjects } from '@/lib/queries/projects'

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
  const [testimonials, latestArticles, projects] = await Promise.all([
    getTestimonials(),
    getLatestNewsArticles(3),
    getProjects(),
  ])

  return (
    <SiteFrame>
      <HeroSection />
      <AboutMeSection />
      <WhySection />
      <HomeProjectsSection projects={projects} />
      <VoorWieSection />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection limit={5} />
      <KennisbankPreviewSection articles={latestArticles} />
      <CTASection />
    </SiteFrame>
  )
}
