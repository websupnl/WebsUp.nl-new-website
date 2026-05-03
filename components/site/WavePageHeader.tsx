import Image from 'next/image'
import { ReactNode } from 'react'

interface WavePageHeaderProps {
  badge?: string
  title: string
  /** Wordt met oranje roze paars gradient weergegeven */
  titleHighlight?: string
  subtitle?: string
  children?: ReactNode
  heightClass?: string
}

const stripFinalDot = (value: string) => value.replace(/\.+\s*$/, '')

/**
 * Herbruikbare donkere paginaheader met hero-bg.png (Stripe stijl wave).
 * Loopt achter de vaste navbar, geen paddingTop op de sectie zelf.
 */
export default function WavePageHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  children,
  heightClass = 'min-h-[58vh]',
}: WavePageHeaderProps) {
  const displayTitle = stripFinalDot(title)
  const displayTitleHighlight = titleHighlight ? stripFinalDot(titleHighlight) : undefined

  return (
    <div className={`relative bg-[#06040c] overflow-hidden flex flex-col justify-end ${heightClass}`}>

      {/* Wave achtergrond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-wave-bg absolute inset-[-8%]">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={85}
          />
        </div>
        {/* Gradient: links donker voor tekst, rechts open voor wave */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(6,4,12,0.94) 0%, rgba(6,4,12,0.80) 40%, rgba(6,4,12,0.40) 70%, rgba(6,4,12,0.20) 100%)',
          }}
        />
        {/* Vignette bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06040c] to-transparent pointer-events-none" />
      </div>

      {/* Inhoud */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-10 lg:pt-36 lg:pb-12">
        {badge && (
          <span className="overline-badge overline-badge-dark mb-5">
            {badge}
          </span>
        )}

        <h1
          className="font-headline font-extrabold text-white tracking-[-0.03em] leading-[1.08] mb-5"
          style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.4rem)' }}
        >
          {displayTitle}
          {displayTitleHighlight && (
            <>
              {' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ec4899 45%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {displayTitleHighlight}
              </span>
            </>
          )}
        </h1>

        {subtitle && (
          <p className="text-base md:text-lg text-white/55 leading-relaxed max-w-[52ch]">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8 pointer-events-none" />
    </div>
  )
}
