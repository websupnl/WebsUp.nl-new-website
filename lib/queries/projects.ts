import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { getTenantId } from '@/lib/tenant'
import { getStorageUrl } from '@/lib/utils'
import type { Project } from '@/types/database.types'
import { isMissingColumnError, isMissingTableError } from '@/lib/supabase/schema-helpers'

export interface PortfolioProject {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  content: string
  highlights: string[]
  image_url: string
  screenshot_url: string | null
  website_url: string | null
  featured: boolean
  published: boolean
  sort_order: number
}

function normalizeHighlights(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
}

function mapProjectRow(project: Project): PortfolioProject {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.category ?? '',
    excerpt: project.excerpt ?? '',
    content: project.content ?? '',
    highlights: normalizeHighlights(project.highlights),
    image_url: project.image_url ?? '',
    screenshot_url: project.screenshot_url ?? (project.website_url
      ? getStorageUrl('media', `${getTenantId()}/project-screenshots/${project.slug}-fullpage.png`)
      : null),
    website_url: project.website_url ?? null,
    featured: project.featured,
    published: project.published,
    sort_order: project.sort_order,
  }
}

function sortProjects(projects: PortfolioProject[]) {
  return [...projects].sort((a, b) => {
    if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order
    return a.title.localeCompare(b.title)
  })
}

async function fetchPublicProjectRows(): Promise<Project[]> {
  const supabase = createPublicSupabaseClient()
  let { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('tenant_id', getTenantId())
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    data = fallback.data
    error = fallback.error
  }

  if (isMissingTableError(error, 'projects')) return []
  if (error) return []
  return (data ?? []) as Project[]
}

async function fetchAdminProjectRows(): Promise<Project[]> {
  const supabase = await createAdminSupabaseClient()
  let { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('tenant_id', getTenantId())
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (isMissingColumnError(error, 'tenant_id')) {
    const fallback = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    data = fallback.data
    error = fallback.error
  }

  if (isMissingTableError(error, 'projects')) return []
  if (error) return []
  return (data ?? []) as Project[]
}

export async function getProjects(): Promise<PortfolioProject[]> {
  const rows = await fetchPublicProjectRows()
  return sortProjects(rows.filter((r) => r.published).map(mapProjectRow))
}

export async function getAllProjectsAdmin(): Promise<PortfolioProject[]> {
  const rows = await fetchAdminProjectRows()
  return sortProjects(rows.map(mapProjectRow))
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const projects = await getProjects()
  return projects.find((project) => project.slug === slug) ?? null
}

export async function getProjectById(id: string): Promise<PortfolioProject | null> {
  const projects = await getAllProjectsAdmin()
  return projects.find((project) => project.id === id) ?? null
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getProjects()
  return projects.map((project) => project.slug)
}
