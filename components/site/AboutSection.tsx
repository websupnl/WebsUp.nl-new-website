import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site.config'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

interface AboutSectionProps {
  badge?: string
  heading?: string
  body?: string
  highlights?: string[]
  ctaLabel?: string
  ctaHref?: string
  image?: string
}

export default function AboutSection({
  badge = siteConfig.about.badge,
  heading = siteConfig.about.heading,
  body = siteConfig.about.body,
  highlights = siteConfig.about.highlights,
  ctaLabel = siteConfig.about.ctaLabel,
  ctaHref = siteConfig.about.ctaHref,
  image = siteConfig.about.image,
}: AboutSectionProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <Reveal>
            <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full">
              {badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {heading}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 text-lg">
              {body}
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle size={18} className="text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all text-sm"
            >
              {ctaLabel}
              <ArrowRight size={16} />
            </Link>
          </Reveal>

          {/* Image */}
          <Reveal delay={120} className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={image}
              alt="Over ons"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
