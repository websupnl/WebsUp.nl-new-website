import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { ButtonLink, PageHero } from '@/components/site/design-system'

interface HeroSectionProps {
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

const proofPoints = [
  'Direct contact met de bouwer',
  '5-sterren ervaringen van klanten',
  'Websites, webshops en maatwerk in een lijn',
]

export default function HeroSection({
  ctaLabel = siteConfig.hero.ctaLabel,
  ctaHref = siteConfig.hero.ctaHref,
  secondaryCtaLabel = 'Bekijk projecten',
  secondaryCtaHref = '/projecten',
}: HeroSectionProps) {
  return (
    <PageHero
      badge="Websites en digitale systemen voor ondernemers"
      title="Een website die vertrouwen geeft."
      highlight="Een systeem dat meegroeit"
      subtitle="WebsUp helpt MKB'ers, dienstverleners en technische bedrijven aan een sterke online basis. Eerst duidelijk en professioneel zichtbaar. Daarna uitbreidbaar met webshops, dashboards, koppelingen of automatisering als je bedrijf daarom vraagt."
      heightClass="min-h-screen"
      actions={
        <>
          <ButtonLink href={ctaHref} variant="brand" className="px-7 py-3.5">
            {ctaLabel}
            <ArrowRight size={14} />
          </ButtonLink>
          {secondaryCtaLabel && secondaryCtaHref && (
            <ButtonLink href={secondaryCtaHref} variant="darkGhost" className="px-6 py-3.5">
              {secondaryCtaLabel}
            </ButtonLink>
          )}
        </>
      }
      meta={[
        { label: 'Focus', value: 'MKB en techniek' },
        { label: 'Aanpak', value: 'Ontwerp + bouw' },
        { label: 'Uitbreiding', value: 'Shops, portalen, AI' },
        { label: 'Regio', value: 'Friesland' },
      ]}
      side={
        <div>
          <p className="font-headline text-2xl font-extrabold leading-tight tracking-[-0.02em] text-white">
            Eerst de juiste basis. Daarna alleen uitbreiden waar het iets oplevert.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Geen losse tools of platformkeuze als startpunt, maar een route die past bij je bedrijf en budget.
          </p>
          <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
            {proofPoints.map((point) => (
              <div key={point} className="flex items-start gap-2 text-sm text-white/68">
                <CheckCircle size={15} className="mt-0.5 shrink-0 text-orange-400" />
                <span>{point}</span>
              </div>
            ))}
          </div>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white">
            Sparren over jouw route
            <ArrowRight size={14} />
          </Link>
        </div>
      }
    />
  )
}
