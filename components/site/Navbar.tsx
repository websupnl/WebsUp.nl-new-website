'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Monitor, ShoppingCart, LayoutDashboard, Zap, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
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

/* Diensten mega menu items */
const DIENSTEN = [
  {
    title: 'Websites',
    desc: 'Een sterke online basis die duidelijk uitlegt en vertrouwen wekt.',
    href: '/diensten/websites',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=75',
    icon: Monitor,
  },
  {
    title: 'Webshops',
    desc: 'Shopify of WooCommerce met een logische flow naar afrekenen.',
    href: '/diensten/webshops',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=75',
    icon: ShoppingCart,
  },
  {
    title: 'Apps & Dashboards',
    desc: 'Portalen, dashboards en interne tools die dagelijks gebruikt worden.',
    href: '/diensten/apps-dashboards',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=75',
    icon: LayoutDashboard,
  },
  {
    title: 'Automatisering',
    desc: 'Slimme koppelingen en workflows die handmatig werk verminderen.',
    href: '/diensten/automatisering',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5734c3d0?auto=format&fit=crop&w=900&q=75',
    icon: Zap,
  },
]

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
  const megaRef = useRef<HTMLDivElement>(null)
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height)
      }
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)

    const resizeObserver = typeof ResizeObserver !== 'undefined' && headerRef.current
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

  // Close navigation after route changes without cascading renders inside the effect.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setMegaOpen(false)
      setMobileOpen(false)
    }, 0)

    return () => window.clearTimeout(id)
  }, [pathname])

  // Lock body scroll when side drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
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
  const nonContactItems = items

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || megaOpen
            ? 'bg-white/95 backdrop-blur-xl backdrop-saturate-150 shadow-sm border-b border-slate-900/6'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="flex min-h-[6.25rem] items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-24 w-auto" />
              ) : (
                <img
                  src={scrolled || megaOpen ? '/WebsUp.nl logo zwart.png' : '/WebsUp.nl logo wit.png'}
                  alt={siteName}
                  className="h-24 w-auto transition-opacity duration-300"
                />
              )}
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {nonContactItems.map((item) => {
                const isDiensten = item.url === '/diensten'
                if (isDiensten) {
                  return (
                    <div
                      key={item.id}
                      ref={megaRef}
                      onMouseEnter={openMega}
                      onMouseLeave={closeMega}
                      className="relative"
                    >
                      <button
                        className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                          scrolled || megaOpen
                            ? isActive(item.url)
                              ? 'text-slate-900 bg-slate-100'
                              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-900/5'
                            : isActive(item.url)
                              ? 'text-white bg-white/15'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
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
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      scrolled || megaOpen
                        ? isActive(item.url)
                          ? 'text-slate-900 bg-slate-100'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-900/5'
                        : isActive(item.url)
                          ? 'text-white bg-white/15'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/gratis-ontwerp"
                className="inline-flex items-center gap-1.5 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-px shadow-lg hover:shadow-orange-500/25 text-white"
                style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
              >
                Gratis ontwerp
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/15'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </nav>
      </header>

      {/* Mega menu panel */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        className={`fixed left-0 right-0 z-40 origin-top transition-all duration-300 ease-out ${
          megaOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        style={{ top: `${headerHeight}px`, willChange: 'opacity, transform' }}
      >
        <div className="border-t border-slate-200/70 bg-white/98 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
          <div className="mx-auto max-w-screen-xl px-6 py-7 lg:px-10">

            <div className="grid gap-7 lg:grid-cols-[0.9fr_1.5fr]">

              <Link
                href="/diensten"
                onClick={() => setMegaOpen(false)}
                className="group relative min-h-[19rem] overflow-hidden rounded-[1.35rem] bg-slate-950"
              >
                <img
                  src="/hero-bg.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/62 to-slate-950/12" />
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <span className="mb-4 w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/72 backdrop-blur-sm">
                    Digitale basis
                  </span>
                  <h3 className="max-w-sm font-headline text-2xl font-extrabold leading-tight">
                    Kies wat nu het meeste verschil maakt.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/62">
                    Websites, shops, dashboards en automatisering horen bij elkaar. Ik help kiezen wat logisch is.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Bekijk alle diensten <ArrowRight size={14} />
                  </span>
                </div>
              </Link>

              <div>
                <div className="mb-4 flex items-end justify-between gap-6">
                  <div>
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Diensten
                    </div>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-500">
                      Vier ingangen, dezelfde aanpak: persoonlijk, technisch sterk en zonder onnodige tussenlagen.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    onClick={() => setMegaOpen(false)}
                    className="hidden shrink-0 items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-900 md:inline-flex"
                  >
                    Advies vragen <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {DIENSTEN.map((dienst) => (
                    <Link
                      key={dienst.href}
                      href={dienst.href}
                      onClick={() => setMegaOpen(false)}
                      className="group grid min-h-[8.2rem] grid-cols-[8.2rem_1fr] overflow-hidden rounded-[1.1rem] border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/7"
                    >
                      <div className="relative overflow-hidden bg-slate-100">
                        <img
                          src={dienst.image}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-950/10" />
                      </div>
                      <div className="flex min-w-0 flex-col justify-between p-4">
                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-headline text-lg font-bold leading-tight text-slate-900">
                              {dienst.title}
                            </span>
                            <ArrowRight size={14} className="shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-900" />
                          </div>
                          <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                            {dienst.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mega overlay (klik buiten sluit) */}
      {megaOpen && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={() => setMegaOpen(false)}
        />
      )}

      {/* Mobile side drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[#06040c]/70 backdrop-blur-sm transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile side drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-[300px] flex flex-col bg-[#06040c] border-l border-white/8 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8 flex-shrink-0">
          <img src="/WebsUp.nl logo wit.png" alt={siteName} className="h-14 w-auto" />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Menu sluiten"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {/* Diensten accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 transition-colors"
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
              <div className="mt-1 ml-3 space-y-0.5 border-l border-white/10 pl-3 pb-1">
                {DIENSTEN.map((d) => {
                  const Icon = d.icon
                  return (
                    <Link
                      key={d.href}
                      href={d.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Icon size={14} className="text-white/35 flex-shrink-0" />
                      {d.title}
                    </Link>
                  )
                })}
                <Link
                  href="/diensten"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs text-white/35 hover:text-white/60 transition-colors"
                >
                  Alle diensten <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>

          {/* Other nav items */}
          {items.filter((i) => i.url !== '/diensten').map((item) => (
            <Link
              key={item.id}
              href={item.url}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(item.url)
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/8'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Drawer footer, CTA */}
        <div className="px-4 py-5 border-t border-white/8 flex-shrink-0 space-y-3">
          <Link
            href="/gratis-ontwerp"
            onClick={() => setMobileOpen(false)}
            className="block text-center font-semibold text-sm px-4 py-3 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
          >
            Gratis ontwerp
          </Link>
        </div>
      </div>
    </>
  )
}
