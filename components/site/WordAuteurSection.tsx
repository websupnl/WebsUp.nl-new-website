import Link from 'next/link'
import { siteConfig } from '@/config/site.config'
import { Eye, Award, BookOpenCheck, ArrowRight } from 'lucide-react'

const iconMap = { Eye, Award, BookOpenCheck }

interface WordAuteurSectionProps {
  heading?: string
  subheading?: string
  benefits?: typeof siteConfig.wordAuteur.benefits
  ctaLabel?: string
  ctaHref?: string
}

export default function WordAuteurSection({
  heading = siteConfig.wordAuteur.heading,
  subheading = siteConfig.wordAuteur.subheading,
  benefits = siteConfig.wordAuteur.benefits,
  ctaLabel = siteConfig.wordAuteur.ctaLabel,
  ctaHref = siteConfig.wordAuteur.ctaHref,
}: WordAuteurSectionProps) {
  return (
    <section className="bg-gray-900 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Tekst */}
          <div>
            <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
              Word auteur
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {heading}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {subheading}
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:-translate-y-px active:translate-y-0"
            >
              {ctaLabel}
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Voordelen */}
          <div className="space-y-5">
            {benefits.map((benefit, i) => {
              const Icon = iconMap[benefit.icon as keyof typeof iconMap] ?? Eye
              return (
                <div key={i} className="flex gap-4 bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div className="flex-shrink-0 w-11 h-11 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
