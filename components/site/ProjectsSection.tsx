'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import type { PortfolioProject } from '@/lib/queries/projects'

interface ProjectsSectionProps {
  projects?: PortfolioProject[]
  limit?: number
}

const preferredProjects = [
  'decorservice-haak',
  'de-poortwacht',
  'prime-animalz',
  'verkeersschool-haak',
  'rottevalle',
]

const projectCopy: Record<string, { title?: string; text: string; bullets: string[] }> = {
  'decorservice-haak': {
    title: 'Decorservice Haak',
    text: 'Een website met een professionele uitstraling, duidelijke structuur en genoeg ruimte om diensten en vakwerk goed te presenteren.',
    bullets: ['Duidelijke presentatie van diensten', 'Rustige en betrouwbare uitstraling', 'Gericht op herkenning en contact'],
  },
  'de-poortwacht': {
    title: 'De Poortwacht',
    text: 'Een overzichtelijke website waarin sfeer, locatie en informatie op een rustige manier samenkomen.',
    bullets: ['Sterke visuele eerste indruk', 'Duidelijke informatie voor bezoekers', 'Passend bij de uitstraling van het bedrijf'],
  },
  'prime-animalz': {
    title: 'Prime AnimalZ',
    text: 'Een webshop waarbij producten, merkgevoel en gebruiksgemak duidelijker samenkomen voor bezoekers.',
    bullets: ['Professionele productpresentatie', 'Duidelijke webshopstructuur', 'Basis voor verdere groei en optimalisatie'],
  },
}

function pickProjects(projects: PortfolioProject[], limit: number) {
  const preferred = preferredProjects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is PortfolioProject => Boolean(p))
  const rest = projects.filter((p) => !preferred.some((item) => item.slug === p.slug))
  return [...preferred, ...rest].slice(0, limit)
}

function ProjectSlot({
  project,
  className = '',
  imageSize = '(max-width: 1024px) 100vw, 50vw',
  delay = 0,
}: {
  project: PortfolioProject
  className?: string
  imageSize?: string
  delay?: number
}) {
  const copy    = projectCopy[project.slug]
  const ref     = useRef<HTMLAnchorElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Link
      ref={ref}
      href={`/projecten/${project.slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-slate-900 ${className}`}
    >
      {/* Image with scroll-driven wipe reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
      >
        <Image
          src={project.image_url || '/hero-bg.png'}
          alt={copy?.title ?? project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes={imageSize}
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Text */}
      <motion.div
        className="absolute inset-x-0 bottom-0 p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (delay / 1000) + 0.55 }}
      >
        <div className="mb-2 text-[0.82rem] font-bold uppercase tracking-[0.12em] text-white/68">
          {project.category || 'Website'}
        </div>
        <h3 className="font-headline text-xl font-bold text-white">
          {copy?.title ?? project.title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Bekijk project <ArrowRight size={13} />
        </div>
      </motion.div>
    </Link>
  )
}

export default function ProjectsSection({ projects = [], limit = 3 }: ProjectsSectionProps) {
  if (projects.length === 0) return null
  const displayed = pickProjects(projects, limit)
  if (displayed.length === 0) return null

  const [featured, ...rest] = displayed

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="overline-badge mb-5 inline-flex">Maatwerk in praktijk</span>
            <h2
              className="max-w-3xl font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)' }}
            >
              Werk dat vertrouwen geeft.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg lg:justify-self-end">
            Geen templates. Elk project gebouwd rond de uitstraling, doelgroep en doelen van de klant.
          </p>
        </Reveal>

        <div className="mt-10">
          {displayed.length === 1 && (
            <ProjectSlot project={featured} className="h-80 lg:h-[480px]" imageSize="(max-width: 1024px) 100vw, 1200px" />
          )}

          {displayed.length === 2 && (
            <div className="grid gap-3 lg:grid-cols-2">
              {displayed.map((p, i) => (
                <ProjectSlot key={p.slug} project={p} className="h-72 lg:h-[420px]" delay={i * 80} />
              ))}
            </div>
          )}

          {displayed.length >= 3 && (
            <div className="grid gap-3 lg:grid-cols-5 lg:grid-rows-2">
              <div className="lg:col-span-3 lg:row-span-2">
                <ProjectSlot
                  project={featured}
                  className="h-64 lg:h-full lg:min-h-[540px]"
                  imageSize="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              {rest.slice(0, 2).map((p, i) => (
                <div key={p.slug} className="lg:col-span-2">
                  <ProjectSlot
                    project={p}
                    className="h-64 lg:h-full"
                    imageSize="(max-width: 1024px) 100vw, 40vw"
                    delay={(i + 1) * 120}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Reveal delay={280}>
          <div className="mt-8 flex flex-col gap-5 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[1rem] leading-relaxed text-slate-500">
              Wil je weten wat er voor jouw bedrijf mogelijk is? Dan kijk ik graag met je mee.
            </p>
            <Link
              href="/projecten"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-orange-200 hover:text-orange-600"
            >
              Bekijk alle projecten
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
