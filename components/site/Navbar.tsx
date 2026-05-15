'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { createWhatsAppHref } from '@/lib/utils'
import type { NavigationItemRow } from '@/types/database.types'

interface NavbarProps {
  siteName?: string
  primaryColor?: string
  logoUrl?: string
  navItems?: Pick<NavigationItemRow, 'id' | 'label' | 'url' | 'type'>[]
}

const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Diensten',  href: '/diensten' },
  { label: 'Projecten', href: '/projecten' },
  { label: 'Over Daan', href: '/over-ons' },
  { label: 'Contact',   href: '/contact' },
]

const WA_SVG = (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.224-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
)

export default function Navbar({ siteName = siteConfig.name, logoUrl }: NavbarProps) {
  const pathname  = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const whatsappHref = createWhatsAppHref(
    siteConfig.phone,
    'Hoi Daan, ik wil graag sparren over mijn website.'
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

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

            {/* Right controls */}
            <div className="relative z-10 flex items-center gap-3">

              {/* Daan avatar — premium concierge */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct contact met Daan via WhatsApp"
                className="group relative hidden sm:block"
              >
                {/* Avatar */}
                <div className="relative h-11 w-11 overflow-hidden rounded-full transition-all duration-500 group-hover:shadow-[0_0_0_2px_rgba(249,115,22,0.30),0_0_20px_rgba(249,115,22,0.12)]"
                  style={{ border: '1.5px solid rgba(255,255,255,0.12)' }}>
                  <Image
                    src="/Daan Koolhaas.jpg"
                    alt="Daan Koolhaas"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="44px"
                  />
                </div>
                {/* Online dot — pulsing, groter */}
                <span className="absolute -bottom-[3px] -right-[3px] flex h-[15px] w-[15px] items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-35" />
                  <span className="relative h-[10px] w-[10px] rounded-full border-[1.5px] border-[#06040c] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                </span>

                {/* Premium concierge card */}
                <div
                  className="pointer-events-none absolute right-0 top-[calc(100%+10px)] opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
                  style={{
                    width: '240px',
                    background: 'rgba(8,6,16,0.84)',
                    backdropFilter: 'blur(36px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(36px) saturate(200%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.03) inset',
                  }}
                >
                  {/* Ambient top glow */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[12px]"
                    style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(249,115,22,0.18) 50%, transparent 90%)' }} />

                  <div className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full"
                        style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
                        <Image src="/Daan Koolhaas.jpg" alt="Daan" fill className="object-cover object-top" sizes="32px" />
                      </div>
                      <div>
                        <p className="text-[0.82rem] font-semibold leading-none text-white">Daan Koolhaas</p>
                        <p className="mt-[5px] flex items-center gap-1 text-[0.72rem] text-white/80">
                          <span className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-emerald-400/90" />
                          Nu beschikbaar
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />

                    <p className="mt-2.5 text-[0.8rem] leading-relaxed text-white/85">
                      Persoonlijk bereikbaar voor vragen, ideeën of advies.
                    </p>

                    {/* WhatsApp hint */}
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-shrink-0" style={{ fill: '#25D366' }} aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.224-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                      </svg>
                      <span className="text-[0.72rem] text-white/70">Klik om te openen in WhatsApp</span>
                    </div>
                  </div>
                </div>
              </a>

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
                className={`flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  menuOpen
                    ? 'border-white/[0.18] bg-white/[0.08] text-white'
                    : 'border-white/[0.12] bg-white/[0.04] text-white/65 hover:border-white/[0.22] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Menu</span>
                <div className="relative h-4 w-5">
                  <span className="absolute left-0 top-0 block h-px w-full bg-current origin-center transition-all duration-300"
                    style={{ transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
                  <span className="absolute right-0 top-1/2 block h-px -translate-y-1/2 bg-current transition-all duration-300"
                    style={{ width: '75%', opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }} />
                  <span className="absolute bottom-0 left-0 block h-px w-full bg-current origin-center transition-all duration-300"
                    style={{ transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
                </div>
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
