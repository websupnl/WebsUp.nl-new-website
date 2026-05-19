'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ChevronDown, Globe, Zap, BookOpen, FolderOpen, Newspaper, ListChecks } from 'lucide-react'
import { useState } from 'react'

/* ─── FAQ accordion ───────────────────────────────────────── */

const faqs = [
  {
    q: 'Wat kost een website bij WebsUp?',
    a: 'Dat hangt af van wat je nodig hebt. Een eenvoudige zakelijke website zit vaak in een andere prijscategorie dan een webshop of maatwerk module. Na een kennismakingsgesprek krijg je een concreet voorstel met een vaste prijs.',
  },
  { q: 'Kan WebsUp ook mijn bestaande website verbeteren?', a: '' },
  { q: 'Werk je met WordPress, Shopify of maatwerk?', a: '' },
  { q: 'Kan ik ook hosting en onderhoud afnemen?', a: '' },
  { q: 'Hoe snel kan mijn website online?', a: '' },
  { q: 'Kan ik eerst vrijblijvend kennismaken?', a: '' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const hasAnswer = !!a
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => hasAnswer && setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-none ${hasAnswer ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <span className="text-[15px] font-semibold text-[#15181d]">{q}</span>
        {hasAnswer && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <ChevronDown size={17} className="text-slate-400" />
          </motion.span>
        )}
        {!hasAnswer && <ChevronDown size={17} className="shrink-0 text-slate-300" />}
      </button>
      <AnimatePresence initial={false}>
        {open && hasAnswer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[14px] leading-7 text-slate-500">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Nav tiles ───────────────────────────────────────────── */

const navTiles = [
  { label: 'Werkwijze', title: 'Van eerste idee tot livegang.', href: '/diensten', icon: ListChecks },
  { label: 'Cases & voorbeelden', title: 'Werk uit de praktijk.', href: '/projecten', icon: FolderOpen },
  { label: 'Kijk eens naar wat nieuw is', title: 'Praktische artikelen om door te lezen.', href: '/kennisbank', icon: BookOpen },
  { label: 'Het laatste nieuws', title: 'Updates & achtergronden.', href: '/nieuws', icon: Newspaper },
]

/* ─── Gradient label ──────────────────────────────────────── */

function Label({ children, gradient = '#f97316, #ec4899' }: { children: string; gradient?: string }) {
  return (
    <p
      className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em]"
      style={{
        background: `linear-gradient(135deg, ${gradient})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </p>
  )
}

/* ─── Section ─────────────────────────────────────────────── */

export default function ContentHubSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <span className="overline-badge mb-3">Hoe mijn ecosysteem werkt</span>
        </div>

        {/* ── Bento grid: left 2-stack + right tall card ── */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">

          {/* Left: Website + Automatisering stacked */}
          <div className="flex flex-col gap-4">

            {/* WEBSITE REDESIGN */}
            <article className="flex flex-1 flex-col justify-between rounded-2xl border border-slate-200 p-7 shadow-[0_2px_10px_rgba(15,23,42,0.05)] sm:p-8">
              <div>
                <Label>Website redesign</Label>
                <div
                  className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg,#f97316,#ec4899)' }}
                >
                  <Globe size={16} strokeWidth={2} className="text-white" />
                </div>
                <h3 className="text-[21px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#15181d] sm:text-[24px]">
                  Een website moet meer doen dan er goed uitzien.
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-slate-500">
                  Hij moet je verhaal duidelijk maken, vertrouwen wekken en aanvragen opleveren. Ik bouw sites die structuur geven aan wat je doet en bezoekers meenemen richting contact.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Link
                  href="/diensten/websites"
                  className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#15181d] transition-colors hover:text-orange-500"
                >
                  Naar websites <ArrowRight size={14} />
                </Link>
                <Link href="/diensten" className="text-[14px] font-medium text-slate-400 transition-colors hover:text-slate-700">
                  Bekijk werkwijze
                </Link>
              </div>
            </article>

            {/* AUTOMATISERING */}
            <article className="flex flex-1 flex-col justify-between rounded-2xl border border-slate-200 p-7 shadow-[0_2px_10px_rgba(15,23,42,0.05)] sm:p-8">
              <div>
                <Label gradient="#ec4899, #a78bfa">Automatisering</Label>
                <div
                  className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg,#ec4899,#a78bfa)' }}
                >
                  <Zap size={16} strokeWidth={2} className="text-white" />
                </div>
                <h3 className="text-[21px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#15181d] sm:text-[24px]">
                  Laat repeterend werk doen door slimme automatisering.
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-slate-500">
                  Aanvragen die automatisch in je CRM landen. Facturen die zichzelf versturen. Voorraad die meebeweegt met je webshop. Ik koppel de tools die je al gebruikt.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Link
                  href="/diensten/automatisering"
                  className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#15181d] transition-colors hover:text-pink-500"
                >
                  Bekijk integraties <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="text-[14px] font-medium text-slate-400 transition-colors hover:text-slate-700">
                  Even sparren
                </Link>
              </div>
            </article>
          </div>

          {/* Right: OVER WEBSUP — tekst links, foto rechts */}
          <div className="flex overflow-hidden rounded-2xl border border-slate-200 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
            {/* Text */}
            <div className="flex flex-1 flex-col justify-between p-7 sm:p-8 lg:p-10">
              <div>
                <Label gradient="#f97316, #ec4899, #a78bfa">Over WebsUp</Label>
                <h3 className="text-[26px] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#15181d] sm:text-[30px] lg:text-[34px]">
                  Je werkt direct met Daan.
                </h3>
                <p className="mt-5 text-[15px] leading-[1.8] text-slate-500">
                  Geen accountmanager, geen tussenpersonen. Je werkt direct met de developer en designer die ook daadwerkelijk bouwt. Dat zorgt voor korte lijnen, snelle beslissingen en oplossingen die kloppen.
                </p>
                <p className="mt-3 text-[15px] leading-[1.8] text-slate-500">
                  Ik snap techniek én denk praktisch mee. Hoe moeilijker de opdracht, hoe leuker ik het vind. En klanten zijn bij mij geen nummertje.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/over-ons"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 text-[14px] font-bold text-white transition-colors hover:bg-black"
                >
                  Lees mijn verhaal
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-[14px] font-bold text-slate-900 transition-colors hover:border-slate-900"
                >
                  Plan kennismaking
                </Link>
              </div>
            </div>

            {/* Photo — rechts, alleen desktop */}
            <div className="relative hidden w-[40%] shrink-0 lg:block">
              <Image
                src="/Daan Koolhaas.jpg"
                alt="Daan Koolhaas – WebsUp.nl"
                fill
                className="object-cover object-top"
                sizes="(min-width:1024px) 20vw, 0px"
              />
              {/* Soft fade naar links */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-20"
                style={{ background: 'linear-gradient(to right, white, transparent)' }}
              />
            </div>
          </div>
        </div>

        {/* ── Nav tiles ── */}
        <div className="mt-4 grid grid-cols-2 gap-4 lg:mt-5 lg:grid-cols-4">
          {navTiles.map((tile) => {
            const Icon = tile.icon
            return (
              <Link
                key={tile.label}
                href={tile.href}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 p-5 shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition-all duration-200 hover:border-slate-300 hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)] sm:p-6"
              >
                <div>
                  <p className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                    {tile.label}
                  </p>
                  <p className="text-[14px] font-bold leading-snug text-[#15181d] sm:text-[15px]">
                    {tile.title}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <Icon size={15} className="text-slate-300" />
                  <ArrowRight
                    size={15}
                    className="text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500"
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* ── FAQ ── */}
        <div className="mt-10 lg:mt-12">
          <div className="grid gap-8 lg:grid-cols-[256px_1fr] lg:gap-14">
            <div className="pt-1">
              <Label>Veelgestelde vragen</Label>
              <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-[#15181d] sm:text-[22px]">
                Misschien zit je vraag hier al tussen.
              </h3>
            </div>
            <div className="rounded-2xl border border-slate-200 px-6 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Kennismaken CTA ── */}
        <div className="mt-4 rounded-2xl border border-slate-200 px-8 py-12 shadow-[0_2px_10px_rgba(15,23,42,0.05)] sm:px-12 sm:py-14 lg:mt-5 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-[580px] text-center">
            <Label>Kennismaken</Label>
            <h3 className="text-[26px] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#15181d] sm:text-[32px] lg:text-[38px]">
              Even sparren over jouw digitale uitdaging?
            </h3>
            <p className="mx-auto mt-5 max-w-[440px] text-[15px] leading-7 text-slate-500">
              Een kennismakingsgesprek duurt ongeveer 30 minuten. We bespreken waar je tegenaan loopt, wat je doelen zijn en of ik daar de juiste partner voor ben. Geen verkoop, gewoon een gesprek.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-7 text-[15px] font-bold text-white transition-colors hover:bg-black sm:w-auto"
              >
                Plan een kennismakingsgesprek
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-[15px] font-bold text-slate-900 transition-colors hover:border-slate-900 sm:w-auto"
              >
                Stuur eerst een bericht
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
