import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ConnectBannerProps {
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
}

/**
 * Brede banner met ConnectBentoBackground.webp als achtergrond.
 * Titel links boven op de afbeelding. Terugkomend op meerdere pagina's.
 */
export default function ConnectBanner({
  title = 'Klaar om te starten?',
  subtitle = 'Plan een gratis kennismaking. Geen verplichtingen.',
  ctaLabel = 'Neem contact op',
  ctaHref = '/contact',
}: ConnectBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] mx-6 lg:mx-8 my-16">
      {/* Background */}
      <Image
        src="/connect-bg.webp"
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      {/* Subtle white overlay zodat tekst leesbaar is */}
      <div className="absolute inset-0 bg-white/15" />

      {/* Content */}
      <div className="relative px-8 py-12 lg:px-14 lg:py-16 max-w-xl">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">WebsUp</p>
        <h2
          className="font-headline font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.1] mb-4"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
        >
          {title}
        </h2>
        <p className="text-slate-600 text-base leading-relaxed mb-7">{subtitle}</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-slate-800 hover:-translate-y-px transition-all duration-150 shadow-sm"
        >
          {ctaLabel}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
