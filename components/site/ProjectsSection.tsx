import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

export interface Project {
  id: string
  title: string
  client: string
  description: string
  tags: string[]
  result?: string
  href?: string
  color?: string
}

// Statische demo-projecten — later vervangbaar via CMS
const DEMO_PROJECTS: Project[] = [
  {
    id: 'bp-uitgevers',
    title: 'BP Uitgevers website',
    client: 'Business Publicatie Uitgevers',
    description:
      'Volledige website met CMS, nieuwsbeheer, publicatiemodule en admin dashboard gebouwd op Next.js + Supabase.',
    tags: ['Next.js', 'Supabase', 'Admin CMS', 'TypeScript'],
    result: 'Live website met volledig beheerbaar CMS',
    color: '#2563EB',
  },
  {
    id: 'weso-narrowcasting',
    title: 'Weso NarrowCasting platform',
    client: 'Weso',
    description:
      'SaaS-platform voor digital signage beheer. Schermen, playlists en content centraal beheren via een modern dashboard.',
    tags: ['Next.js', 'SaaS', 'Dashboard', 'Real-time'],
    result: 'Volledig functioneel multi-tenant platform',
    color: '#7C3AED',
  },
  {
    id: 'thuisbatterijen',
    title: 'Thuisbatterijen Friesland',
    client: 'Thuisbatterijen Friesland',
    description:
      'SEO-landingspagina gericht op lokaal ranken voor thuisbatterijen, EMS en laadpalen. Gebouwd in React + Vite + Cloudflare Pages.',
    tags: ['React', 'Vite', 'SEO', 'Cloudflare Pages'],
    result: 'Lokale SEO-leads genereren',
    color: '#059669',
  },
]

interface ProjectsSectionProps {
  projects?: Project[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
  limit?: number
}

export default function ProjectsSection({
  projects = DEMO_PROJECTS,
  title = 'Recente projecten',
  subtitle = 'Wat we al gebouwd hebben voor klanten en onszelf.',
  showViewAll = true,
  limit,
}: ProjectsSectionProps) {
  const displayed = limit ? projects.slice(0, limit) : projects

  return (
    <section className="bg-gray-900 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
              Projecten
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h2>
            <p className="text-gray-400 text-lg max-w-xl">{subtitle}</p>
          </div>
          {showViewAll && (
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
            >
              Alle projecten
              <ArrowRight size={16} />
            </Link>
          )}
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <div className="group relative flex flex-col h-full bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                {/* Kleur accent */}
                <div
                  className="w-10 h-1.5 rounded-full mb-5"
                  style={{ backgroundColor: project.color ?? '#2563EB' }}
                />

                <div className="mb-1 text-xs text-gray-500 font-medium">{project.client}</div>
                <h3 className="text-lg font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-gray-700/60 text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Resultaat */}
                {project.result && (
                  <div className="text-xs text-green-400 font-medium border-t border-gray-700 pt-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {project.result}
                  </div>
                )}

                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-white"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
