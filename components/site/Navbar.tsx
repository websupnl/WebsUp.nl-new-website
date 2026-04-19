'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  Menu,
  Monitor,
  ShoppingCart,
  X,
  Zap,
} from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { services } from '@/lib/site/services'
import type { NavigationItemRow } from '@/types/database.types'

interface NavbarProps {
  siteName?: string
  primaryColor?: string
  logoUrl?: string
  navItems?: Pick<NavigationItemRow, 'id' | 'label' | 'url' | 'type'>[]
}

const FALLBACK_NAV = siteConfig.nav.map((item) => ({
  id: item.href,
  label: item.label,
  url: item.href,
  type: 'internal' as const,
}))

const iconMap = {
  Monitor,
  ShoppingCart,
  LayoutDashboard,
  Zap,
}

const passthroughLoader = ({ src }: { src: string }) => src

export default function Navbar({
  siteName = siteConfig.name,
  logoUrl,
  navItems = [],
}: NavbarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(96)
  const headerRef = useRef<HTMLElement>(null)
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height)
      }
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && headerRef.current
        ? new ResizeObserver(updateHeaderHeight)
        : null

    if (resizeObserver && headerRef.current) {
      resizeObserver.observe(headerRef.current)
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
      resizeObserver?.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    return () => {
      if (megaTimeout.current) clearTimeout(megaTimeout.current)
    }
  }, [])

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }

  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 180)
  }

  const items = navItems.length > 0 ? navItems : FALLBACK_NAV

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled || megaOpen
            ? 'border-b border-slate-900/6 bg-white/95 shadow-sm backdrop-blur-xl backdrop-saturate-150'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex min-h-[6.25rem] items-center justify-between">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center"
              onClick={() => setMobileOpen(false)}
            >
              {logoUrl ? (
                <Image
                  loader={passthroughLoader}
                  unoptimized
                  src={logoUrl}
                  alt={siteName}
                  width={320}
                  height={120}
                  className="h-24 w-auto"
                />
              ) : (
                <Image
                  src={scrolled || megaOpen ? '/WebsUp.nl logo zwart.png' : '/WebsUp.nl logo wit.png'}
                  alt={siteName}
                  width={320}
                  height={120}
                  className="h-24 w-auto transition-opacity duration-300"
                  priority
                />
              )}
            </Link>

            <div className="hidden items-center gap-0.5 md:flex">
              {items.map((item) => {
                const isServices = item.url === '/diensten'

                if (isServices) {
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={openMega}
                      onMouseLeave={closeMega}
                      className="relative"
                    >
                      <button
                        className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          scrolled || megaOpen
                            ? isActive(item.url)
                              ? 'bg-slate-100 text-slate-900'
                              : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
                            : isActive(item.url)
                              ? 'bg-white/15 text-white'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                        aria-expanded={megaOpen}
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    target={item.type === 'external' ? '_blank' : undefined}
                    rel={item.type === 'external' ? 'noopener noreferrer' : undefined}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      scrolled || megaOpen
                        ? isActive(item.url)
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
                        : isActive(item.url)
                          ? 'bg-white/15 text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/contact?ref=ontwerp"
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-px hover:shadow-orange-500/25"
                style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
              >
                Gratis ontwerp
              </Link>
            </div>

            <button
              className={`rounded-xl p-2 transition-colors md:hidden ${
                scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/15'
              }`}
              onClick={() => setMobileOpen((current) => !current)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <div
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        className={`fixed left-0 right-0 z-40 origin-top transition-all duration-300 ease-out ${
          megaOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
        style={{ top: `${headerHeight}px`, willChange: 'opacity, transform' }}
      >
        <div className="border-t border-slate-900/6" />

        <div className="bg-white/98 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <div className="divide-y divide-slate-100 rounded-[1.75rem] border border-slate-100 bg-slate-50">
                  {services.map((service) => {
                    const Icon = iconMap[service.icon]

                    return (
                      <Link
                        key={service.slug}
                        href={`/diensten/${service.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group flex items-start gap-4 px-5 py-5 transition-colors hover:bg-white"
                      >
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="font-headline text-lg font-bold text-slate-900 transition-colors group-hover:text-orange-500">
                                {service.title}
                              </div>
                              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                                {service.navDescription}
                              </p>
                            </div>
                            <ArrowRight
                              size={16}
                              className="mt-1 flex-shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-orange-500"
                            />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="col-span-4">
                <div className="flex h-full min-h-[240px] flex-col justify-between rounded-[1.75rem] bg-[#06040c] p-6 text-white shadow-[0_22px_60px_rgba(15,23,42,0.18)]">
                  <div>
                    <span className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white/70">
                      Persoonlijk advies
                    </span>
                    <h3 className="mt-5 font-headline text-2xl font-bold leading-tight">
                      Niet zeker welke route het slimst is?
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/62">
                      Dan kijken we gewoon samen wat past. Soms is dat een website, soms juist een
                      koppeling of een stap daarachter.
                    </p>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <Link
                      href="/contact"
                      onClick={() => setMegaOpen(false)}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90"
                    >
                      Plan een gesprek
                      <ArrowRight size={14} />
                    </Link>
                    <p className="mt-4 text-xs text-white/35">
                      Direct contact met Daan - Korte lijnen - Friesland
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <Link
                href="/diensten"
                onClick={() => setMegaOpen(false)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
              >
                Bekijk alle diensten
                <ArrowRight size={14} />
              </Link>
              <span className="text-xs text-slate-400">
                Websites, webshops, systemen en automatisering die op elkaar aansluiten
              </span>
            </div>
          </div>
        </div>
      </div>

      {megaOpen && (
        <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setMegaOpen(false)} />
      )}

      <div
        className={`fixed inset-0 z-40 bg-[#06040c]/70 backdrop-blur-sm transition-all duration-300 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[300px] flex-col border-l border-white/8 bg-[#06040c] shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b border-white/8 px-5 py-5">
          <Image
            src="/WebsUp.nl logo wit.png"
            alt={siteName}
            width={220}
            height={80}
            className="h-14 w-auto"
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-xl p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Menu sluiten"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          <div>
            <button
              onClick={() => setMobileServicesOpen((current) => !current)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
            >
              Diensten
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                mobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-1 ml-3 space-y-0.5 border-l border-white/10 pb-1 pl-3">
                {services.map((service) => {
                  const Icon = iconMap[service.icon]

                  return (
                    <Link
                      key={service.slug}
                      href={`/diensten/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={14} className="flex-shrink-0 text-white/35" />
                      {service.title}
                    </Link>
                  )
                })}
                <Link
                  href="/diensten"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs text-white/35 transition-colors hover:text-white/60"
                >
                  Alle diensten <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>

          {items
            .filter((item) => item.url !== '/diensten')
            .map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.url)
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:bg-white/8 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
        </div>

        <div className="flex-shrink-0 space-y-3 border-t border-white/8 px-4 py-5">
          <Link
            href="/contact?ref=ontwerp"
            onClick={() => setMobileOpen(false)}
            className="block rounded-full px-4 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
          >
            Gratis ontwerp
          </Link>
          <p className="text-center text-xs text-white/25">
            Persoonlijk advies - Direct contact met Daan
          </p>
        </div>
      </div>
    </>
  )
}
