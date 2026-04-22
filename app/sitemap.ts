import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site.config'
import { getAllNewsSlugs } from '@/lib/queries/news'
import { getAllPublicationSlugs } from '@/lib/queries/publications'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/diensten`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/projecten`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gratis-ontwerp`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacybeleid`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/algemene-voorwaarden`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const [newsSlugs, publicationSlugs] = await Promise.all([
    getAllNewsSlugs(),
    getAllPublicationSlugs(),
  ])

  const newsRoutes: MetadataRoute.Sitemap = newsSlugs.map((slug) => ({
    url: `${base}/nieuws/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const publicationRoutes: MetadataRoute.Sitemap = publicationSlugs.map((slug) => ({
    url: `${base}/publicaties/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...newsRoutes, ...publicationRoutes]
}
