import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site.config'
import { getAllNewsSlugs } from '@/lib/queries/news'
import { getProjects } from '@/lib/queries/projects'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/diensten`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/diensten/websites`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/diensten/webshops`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/diensten/apps-dashboards`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/diensten/automatisering`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/projecten`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/over-ons`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/kennisbank`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/voor-starters`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/gratis-ontwerp`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/veelgestelde-vragen`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacybeleid`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/algemene-voorwaarden`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const [newsSlugs, projects] = await Promise.all([
    getAllNewsSlugs(),
    getProjects(),
  ])

  const newsRoutes: MetadataRoute.Sitemap = newsSlugs.map((slug) => ({
    url: `${base}/kennisbank/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projecten/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...newsRoutes, ...projectRoutes]
}
