'use client'

import Link from 'next/link'
import Image from 'next/image'
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

/* ── Diensten mega-menu items ─────────────────────────── */
const DIENSTEN = [
  {
    title: 'Websites',
    desc: 'Snel, modern en conversiegericht. WordPress, Shopify of Next.js.',
    href: '/diensten/websites',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=60',
    color: 'from-orange-400/20 to-pink-400/10',
  },
  {
    title: 'Webshops',
    desc: 'WooCommerce of Shopify. iDEAL, Mollie en slimme orderverwerking.',
    href: '/diensten/webshops',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=60',
    color: 'from-pink-400/20 to-orange-400/10',
  },
  {
    title: 'Apps & Dashboards',
    desc: 'Klantportalen, interne tools en realtime dashboards op maat.',
    href: '/diensten/apps-dashboards',
    icon: LayoutDashboard,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60',
    color: 'from-pink-400/20 to-orange-400/10',
  },
  {
    title: 'Automatisering',
    desc: 'Koppel je tools. Elimineer handmatig werk met n8n en API-koppelingen.',
    href: '/diensten/automatisering',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5734c3d0?auto=format&fit=crop&w=600&q=60',
    color: 'from-orange-400/20 to-pink-400/10',
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
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex min-h-[6.25rem] items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-30 w-auto" />
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

      {/* ── Mega menu panel ───────────────────────────────────── */}
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
        {/* Backdrop blur border */}
        <div className="border-t border-slate-900/6" />

        <div className="bg-white/98 backdrop-blur-2xl shadow-2xl shadow-slate-900/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="grid grid-cols-12 gap-6">

              {/* Left: service cards — 8 cols */}
              <div className="col-span-8 grid grid-cols-2 gap-3">
                {DIENSTEN.map((dienst) => {
                  const Icon = dienst.icon
                  return (
                    <Link
                      key={dienst.href}
                      href={dienst.href}
                      onClick={() => setMegaOpen(false)}
                      className="group flex gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                        <Image
                          src={dienst.image}
                          alt={dienst.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="80px"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${dienst.color}`} />
                      </div>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="font-semibold text-sm text-slate-900 group-hover:text-orange-500 transition-colors">
                            {dienst.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {dienst.desc}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Right: featured highlight — 4 cols */}
              <div className="col-span-4">
                <div className="relative h-full min-h-[200px] rounded-2xl overflow-hidden bg-[#06040c]">
                  <Image
                    src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=600&q=60"
                    alt="Werk van WebsUp"
                    fill
                    className="object-cover opacity-50"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06040c] via-[#06040c]/40 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
                      Gratis kennismaking
                    </span>
                    <p className="text-white font-bold text-base leading-snug mb-4">
                      Niet zeker welke dienst past?<br />Ik adviseer eerlijk.
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setMegaOpen(false)}
                      className="inline-flex items-center gap-1.5 bg-white text-slate-900 font-semibold text-xs px-4 py-2 rounded-full hover:bg-white/90 transition-colors self-start"
                    >
                      Plan een gesprek <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom: alle diensten link */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/diensten"
                onClick={() => setMegaOpen(false)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Bekijk alle diensten
                <ArrowRight size={14} />
              </Link>
              <span className="text-xs text-slate-400">
                Persoonlijk advies · Direct contact met Daan · Friesland
              </span>
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

      {/* ── Mobile side drawer backdrop ─────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-[#06040c]/70 backdrop-blur-sm transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile side drawer ──────────────────────────────────── */}
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

        {/* Drawer footer — CTA */}
        <div className="px-4 py-5 border-t border-white/8 flex-shrink-0 space-y-3">
          <Link
            href="/gratis-ontwerp"
            onClick={() => setMobileOpen(false)}
            className="block text-center font-semibold text-sm px-4 py-3 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
          >
            Gratis ontwerp
          </Link>
          <p className="text-center text-xs text-white/25">
            Persoonlijk advies · Direct contact met Daan
          </p>
        </div>
      </div>
    </>
  )
}
