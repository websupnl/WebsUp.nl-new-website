'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Phone, Mail, Sparkles } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import type { NavigationItemRow } from '@/types/database.types'

interface NavbarProps {
  siteName?: string
  primaryColor?: string
  logoUrl?: string
  navItems?: Pick<NavigationItemRow, 'id' | 'label' | 'url' | 'type'>[]
  availability?: {
    enabled?: boolean | null
    label?: string | null
    detail?: string | null
    slots?: number | null
    period?: string | null
  }
}

const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Diensten',  href: '/diensten' },
  { label: 'Projecten', href: '/projecten' },
  { label: 'Over Daan', href: '/over-ons' },
  { label: 'Contact',   href: '/contact' },
]

export default function Navbar({ siteName = siteConfig.name, logoUrl, availability }: NavbarProps) {
  const pathname  = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const previousPathname = useRef(pathname)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    queueMicrotask(() => setMenuOpen(false))
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)
  const availabilityEnabled = availability?.enabled ?? siteConfig.availability.enabled
  const availabilityLabel = availability?.label || siteConfig.availability.label
  const availabilityDetail = availability?.detail || availability?.period || siteConfig.availability.detail
  const availabilitySlots = availability?.slots ?? siteConfig.availability.slots

  return (
    <>

      {/* ── Main header ─────────────────────────────────────── */}
      <header
        className={`fixed left-0 right-0 z-[60] transition-all duration-500 ease-out ${
          scrolled && !menuOpen
            ? 'top-4 px-4 md:top-5 md:px-6'
            : 'top-0'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ease-out ${
            scrolled && !menuOpen
              ? 'max-w-6xl rounded-2xl border border-white/[0.09] shadow-[0_12px_48px_rgba(0,0,0,0.36)]'
              : 'max-w-7xl rounded-none border border-transparent shadow-none'
          }`}
          style={{
            background: menuOpen
              ? 'transparent'
              : scrolled
                ? 'rgba(6,4,12,0.82)'
                : 'transparent',
            backdropFilter: scrolled && !menuOpen ? 'blur(28px) saturate(160%)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled && !menuOpen ? 'blur(28px) saturate(160%)' : 'blur(0px)',
            transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
          }}
        >
          {/* Gradient drops in sticky header */}
          {scrolled && !menuOpen && (
            <>
              <div className="pointer-events-none absolute -left-8 top-1/2 h-20 w-32 -translate-y-1/2 rounded-full bg-orange-500/20 blur-2xl" />
              <div className="pointer-events-none absolute left-1/3 top-1/2 h-16 w-24 -translate-y-1/2 rounded-full bg-pink-500/15 blur-2xl" />
              <div className="pointer-events-none absolute right-24 top-1/2 h-20 w-32 -translate-y-1/2 rounded-full bg-violet-500/18 blur-2xl" />
            </>
          )}

          <div
            className={`flex items-center justify-between px-5 transition-all duration-500 ${
              scrolled && !menuOpen ? 'py-3' : 'py-3.5 md:py-4'
            }`}
          >
            {/* Logo */}
            <Link href="/" onClick={() => setMenuOpen(false)} className="relative z-10 flex-shrink-0">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-12 sm:h-16 md:h-24 w-auto" />
              ) : (
                <img src="/WebsUp.nl logo wit.png" alt={siteName} className="h-12 sm:h-16 md:h-24 w-auto" />
              )}
            </Link>

            {availabilityEnabled && (
              <Link
                href="/contact"
                className="availability-badge group relative z-10 hidden items-center gap-3 rounded-full px-3 py-2 transition-all duration-300 md:flex"
              >
                <span className="availability-badge__number">
                  {availabilitySlots}
                </span>
                <span className="min-w-0">
                  <span className="block whitespace-nowrap text-[0.84rem] font-semibold leading-none text-white/92">
                    {availabilityLabel}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-[0.76rem] font-medium leading-none text-white/58">
                    <Sparkles size={12} className="text-orange-300/85" />
                    {availabilityDetail}
                  </span>
                </span>
              </Link>
            )}

            {/* Right controls */}
            <div className="relative z-10 flex items-center gap-3">

              {/* CTA */}
              <Link
                href="/gratis-ontwerp"
                onClick={() => setMenuOpen(false)}
                className="btn-brand-gradient hidden !px-5 !py-2.5 !text-sm sm:inline-flex"
              >
                Gratis ontwerp
              </Link>

              {/* Menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
                aria-expanded={menuOpen}
                className={`menu-toggle group ${menuOpen ? 'menu-toggle-open' : ''}`}
              >
                <span className="hidden text-[0.72rem] font-semibold uppercase tracking-[0.12em] sm:inline">
                  {menuOpen ? 'Sluiten' : 'Menu'}
                </span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Backdrop (click to close) ────────────────────────── */}
      <div
        className={`fixed inset-0 z-[62] transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,0,0,0.32)' }}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Right sidebar ────────────────────────────────────── */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-[65] flex w-[300px] flex-col transition-transform duration-500 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'rgba(6,4,12,0.72)',
          backdropFilter: 'blur(48px) saturate(200%)',
          WebkitBackdropFilter: 'blur(48px) saturate(200%)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '-32px 0 80px rgba(0,0,0,0.45)',
        }}
        aria-hidden={!menuOpen}
      >
        {/* Gradient ambient drops */}
        <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-10 h-36 w-36 rounded-full bg-pink-500/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-20 left-0 h-40 w-40 rounded-full bg-violet-500/[0.18] blur-3xl" />

        {/* ── Top: logo + close ───────────────────────────── */}
        <div className="relative flex items-center justify-between px-7 pt-6 pb-5">
          <img src="/WebsUp.nl logo wit.png" alt="WebsUp" className="h-16 w-auto opacity-90" />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Menu sluiten"
            className="text-white/25 transition-colors hover:text-white/60"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
        </div>

        {/* ── Nav links ───────────────────────────────────── */}
        <nav className="relative flex-1 px-4 pb-4">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`group flex items-center rounded-lg px-3 py-2.5 ${
                isActive(href) ? 'text-white' : 'text-white/30 hover:text-white/80'
              }`}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(18px)',
                transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.15s`,
                transitionDelay: menuOpen ? `${i * 55}ms` : '0ms',
              }}
            >
              <span className="font-headline text-[1.6rem] font-extrabold tracking-[-0.03em]">
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* ── Contact ─────────────────────────────────────── */}
        <div className="relative border-t border-white/[0.05] px-7 py-5">
          <div className="space-y-2.5">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2.5 text-[0.75rem] text-white/30 transition-colors hover:text-white/60"
            >
              <Phone size={12} className="flex-shrink-0" />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2.5 text-[0.75rem] text-white/30 transition-colors hover:text-white/60"
            >
              <Mail size={12} className="flex-shrink-0" />
              {siteConfig.email}
            </a>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────── */}
        <div className="relative px-5 pb-7">
          <Link
            href="/gratis-ontwerp"
            onClick={() => setMenuOpen(false)}
            className="btn-brand-gradient w-full justify-center !py-3 !text-sm"
          >
            Gratis ontwerp aanvragen
            <ArrowRight size={14} />
          </Link>
        </div>
      </aside>
    </>
  )
}
