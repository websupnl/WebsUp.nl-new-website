import { ReactNode } from 'react'
import Image from 'next/image'

interface WavePageHeaderProps {
  badge?: string
  title: string
  /** Gradient highlight span na de titel */
  titleHighlight?: string
  subtitle?: string
  children?: ReactNode
  heightClass?: string
}

const stripFinalDot = (value: string) => value.replace(/\.+\s*$/, '')

export default function WavePageHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  children,
  heightClass = 'min-h-[52vh]',
}: WavePageHeaderProps) {
  const displayTitle = stripFinalDot(title)
  const displayTitleHighlight = titleHighlight ? stripFinalDot(titleHighlight) : undefined

  return (
    <div className={`relative overflow-hidden flex flex-col justify-end ${heightClass} bg-[#06040c]`}>
      {/* Animated wave background — mobile-safe (geen backgroundAttachment:fixed) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-wave-bg absolute inset-[-8%]">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={80}
          />
        </div>
      </div>

      {/* Dark gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(110deg, rgba(6,4,12,0.97) 0%, rgba(6,4,12,0.88) 40%, rgba(6,4,12,0.60) 70%, rgba(6,4,12,0.38) 100%)',
        }}
      />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06040c] to-transparent" />

      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-8 right-10 hidden items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/25 lg:flex">
        <span className="h-px w-16 bg-gradient-to-r from-orange-400 via-pink-400 to-violet-300" />
        WebsUp
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-10 lg:pt-36 lg:pb-12">
        {badge && (
          <span className="overline-badge overline-badge-dark mb-5 inline-flex">
            {badge}
          </span>
        )}

        <h1
          className="max-w-4xl text-balance font-headline font-extrabold text-white tracking-[-0.035em] leading-[1.04] mb-4"
          style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)' }}
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

        <div className="focus-pulse-line mb-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-violet-300" />

        {subtitle && (
          <p
            className="text-white/72 leading-relaxed max-w-[52ch]"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.125rem)' }}
          >
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06] pointer-events-none" />
    </div>
  )
}
