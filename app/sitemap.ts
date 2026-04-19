import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site.config'
import { getAllNewsSlugs } from '@/lib/queries/news'
import { getAllProjectSlugs } from '@/lib/queries/projects'
import { services } from '@/lib/site/services'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/diensten`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/projecten`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/kennisbank`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/over-ons`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: `${base}/veelgestelde-vragen`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/voor-starters`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { url: `${base}/privacybeleid`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    {
      url: `${base}/algemene-voorwaarden`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/diensten/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const [projectSlugs, articleSlugs] = await Promise.all([getAllProjectSlugs(), getAllNewsSlugs()])

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${base}/projecten/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${base}/kennisbank/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...articleRoutes]
}
