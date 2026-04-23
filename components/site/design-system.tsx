import Image from 'next/image'
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'brand' | 'dark' | 'outline' | 'ghost' | 'darkGhost'
type SectionTone = 'white' | 'surface' | 'dark'

const buttonClass: Record<ButtonVariant, string> = {
  brand: 'btn-brand',
  dark: 'btn-dark',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  darkGhost: 'btn-dark-ghost',
}

const sectionToneClass: Record<SectionTone, string> = {
  white: 'bg-white',
  surface: 'bg-[var(--surface)]',
  dark: 'bg-[var(--night)] text-white',
}

export interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant
}

export function ButtonLink({
  className,
  variant = 'dark',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClass[variant], 'px-6 py-3', className)} {...props}>
      {children}
    </Link>
  )
}

export function ButtonAnchor({
  className,
  variant = 'outline',
  children,
  ...props
}: ComponentPropsWithoutRef<'a'> & { variant?: ButtonVariant }) {
  return (
    <a className={cn(buttonClass[variant], 'px-6 py-3', className)} {...props}>
      {children}
    </a>
  )
}

export function SectionLayout({
  overline,
  title,
  highlight,
  description,
  tone = 'white',
  children,
  actions,
  className,
  innerClassName,
}: {
  overline?: string
  title?: string
  highlight?: string
  description?: string
  tone?: SectionTone
  children: ReactNode
  actions?: ReactNode
  className?: string
  innerClassName?: string
}) {
  return (
    <section className={cn(sectionToneClass[tone], 'py-20 lg:py-28', className)}>
      <div className={cn('mx-auto max-w-7xl px-6 lg:px-8', innerClassName)}>
        {(overline || title || description || actions) && (
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              {overline && <span className="overline-badge mb-4 inline-flex">{overline}</span>}
              {title && (
                <h2 className={cn('max-w-3xl font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] md:text-5xl', tone === 'dark' ? 'text-white' : 'text-slate-900')}>
                  {title}
                  {highlight && (
                    <>
                      {' '}
                      <span className="gradient-text">{highlight}</span>
                    </>
                  )}
                </h2>
              )}
            </div>
            {(description || actions) && (
              <div className="lg:justify-self-end">
                {description && (
                  <p className={cn('max-w-xl text-base leading-relaxed md:text-lg', tone === 'dark' ? 'text-white/62' : 'text-slate-500')}>
                    {description}
                  </p>
                )}
                {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export function SiteCard({
  children,
  className,
  as: Comp = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
}) {
  return <Comp className={cn('surface-card', className)}>{children}</Comp>
}

export function StatStrip({
  items,
  className,
}: {
  items: Array<{ value: string; label: string }>
  className?: string
}) {
  return (
    <div className={cn('border-b border-[var(--rule)] bg-white', className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-[var(--rule)] md:grid-cols-4">
          {items.map((stat) => (
            <div key={stat.label} className="px-4 py-7 text-center">
              <div className="font-headline text-xl font-extrabold text-[var(--ink)] md:text-2xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium text-[var(--muted-2)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PageHero({
  badge,
  title,
  highlight,
  subtitle,
  actions,
  meta,
  side,
  heightClass = 'min-h-[58vh]',
}: {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  actions?: ReactNode
  meta?: Array<{ label: string; value: string }>
  side?: ReactNode
  heightClass?: string
}) {
  return (
    <section className={cn('relative flex flex-col justify-end overflow-hidden bg-[var(--night)] text-white', heightClass)}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-wave-bg absolute inset-[-8%]">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={88}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(6,4,12,0.96) 0%, rgba(6,4,12,0.78) 45%, rgba(6,4,12,0.40) 75%, rgba(6,4,12,0.15) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-36 lg:px-8 lg:pb-16 lg:pt-44">
        <div className={cn('grid gap-12', side ? 'lg:grid-cols-[1.35fr_0.65fr] lg:items-end' : '')}>
          <div>
            {badge && (
              <span className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/55">
                <span className="h-2 w-2 rounded-full bg-[var(--brand-orange)]" />
                {badge}
              </span>
            )}
            <h1
              className="font-headline font-extrabold leading-none tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2.625rem, 6.8vw, 5.5rem)' }}
            >
              {title}
              {highlight && (
                <>
                  {' '}
                  <span className="gradient-text">{highlight}</span>
                </>
              )}
            </h1>
            {subtitle && (
              <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-white/70 md:text-lg">
                {subtitle}
              </p>
            )}
            {actions && <div className="mt-10 flex flex-wrap gap-3">{actions}</div>}
            {meta && meta.length > 0 && (
              <dl className="mt-12 grid grid-cols-2 gap-x-7 gap-y-5 border-t border-white/10 pt-7 md:grid-cols-4">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs text-white/45">{item.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          {side && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              {side}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8" />
    </section>
  )
}

export function TextArrow({ children = 'Meer bekijken' }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-orange-500">
      {children}
      <ArrowRight size={14} />
    </span>
  )
}
