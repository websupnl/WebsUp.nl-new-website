'use client'

import { useState } from 'react'
import { siteConfig } from '@/config/site.config'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  MessageCircle,
  Zap,
  Clock,
  Shield,
} from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import { createWhatsAppHref } from '@/lib/utils'
import { finalTrustItems } from '@/lib/homepage-content'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Er is iets misgegaan. Probeer het opnieuw.')
        return
      }

      setSent(true)
    } catch {
      setError('Er is iets misgegaan. Controleer je internetverbinding.')
    } finally {
      setLoading(false)
    }
  }

  const projectTypes = [
    'Website',
    'Webshop',
    'App / Dashboard',
    'Automatisering',
    'Nog niet helemaal zeker',
  ]

  const whatsappHref = createWhatsAppHref(
    siteConfig.phone,
    'Hoi, ik wil graag even vrijblijvend sparren over mijn website of digitale systeem.'
  )

  return (
    <div>
      <WavePageHeader
        badge="Contact"
        title="Laten we"
        titleHighlight="kennismaken."
        subtitle="Vertel kort waar je mee bezig bent of waar je op vastloopt. Ik reageer binnen een werkdag met een eerlijk en vrijblijvend antwoord."
      >
        <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-2xl">
          {finalTrustItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 border-l border-white/14 bg-white/[0.025] px-5 py-4 backdrop-blur-sm transition-colors hover:border-orange-400/60 hover:bg-white/[0.045]"
              >
                <Icon size={18} className="shrink-0 text-white/62" />
                <span className="text-[1rem] font-medium text-white/84">{item.label}</span>
              </div>
            )
          })}
        </div>
      </WavePageHeader>

      <section className="relative overflow-hidden bg-[#f8f9fc] py-20 lg:py-28">
        <div className="pointer-events-none absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-orange-400/10 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-10 right-[10%] h-64 w-64 rounded-full bg-violet-400/10 blur-[80px]" />

        <Reveal className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">

            {/* Form card */}
            <div
              className="rounded-2xl p-7 md:p-9"
              style={{
                background: 'rgba(12,10,22,0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #f97316 30%, #ec4899 60%, #a78bfa 90%, transparent 100%)',
                  opacity: 0.3,
                  position: 'absolute',
                }}
              />

              {sent ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center gap-5 text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.30)' }}
                  >
                    <CheckCircle size={32} style={{ color: '#a78bfa' }} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-white">Bericht ontvangen!</h3>
                    <p className="text-white/50">Bedankt voor je bericht. Ik neem binnen een werkdag contact met je op.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-[1rem] font-medium text-white/60">
                      Waar gaat het ongeveer over?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setForm({ ...form, type })}
                          className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
                          style={form.type === type ? {
                            background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
                            border: '1px solid transparent',
                            color: '#fff',
                          } : {
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(255,255,255,0.55)',
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-[1rem] font-medium text-white/60">
                        Naam <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-2 focus:ring-orange-400/50"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                        placeholder="Jouw naam"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-[1rem] font-medium text-white/60">
                        Email <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-2 focus:ring-orange-400/50"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                        placeholder="jouw@email.nl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-[1rem] font-medium text-white/60">
                      Onderwerp
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-2 focus:ring-orange-400/50"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                      placeholder="Bijv. website voor mijn installatiebedrijf"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-[1rem] font-medium text-white/60">
                      Vertel kort wat er speelt <span className="text-orange-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-2 focus:ring-orange-400/50"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                      placeholder="Wat wil je maken, waar loop je nu tegenaan of waar wil je graag even over sparren?"
                    />
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <button type="submit" disabled={loading} className="btn-brand-gradient disabled:opacity-50">
                    {loading ? <><Zap size={16} className="animate-pulse" />Verzenden…</> : <>Stuur vrijblijvend een bericht<Send size={16} /></>}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {[
                { icon: Zap, label: 'Binnen 1 werkdag reactietijd', glow: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.22)' },
                { icon: MessageCircle, label: 'Vrijblijvend sparren, geen verplichtingen', glow: 'rgba(236,72,153,0.10)', border: 'rgba(236,72,153,0.20)' },
                { icon: CheckCircle, label: 'Eerlijk advies, altijd transparant', glow: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.20)' },
              ].map(({ icon: Icon, label, glow, border }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl px-5 py-4"
                  style={{ background: glow, border: `1px solid ${border}`, backdropFilter: 'blur(12px)' }}
                >
                  <Icon size={17} className="flex-shrink-0" style={{ color: '#f97316' }} />
                  <span className="text-[1rem] font-medium text-white/80">{label}</span>
                </div>
              ))}

              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/35 transition-colors hover:text-white/70">
                  <MessageCircle size={15} className="flex-shrink-0" />
                  <span className="text-sm">WhatsApp</span>
                </a>
                <a href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-white/35 transition-colors hover:text-white/70">
                  <Mail size={15} className="flex-shrink-0" />
                  <span className="text-sm">{siteConfig.email}</span>
                </a>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white/35 transition-colors hover:text-white/70">
                  <Phone size={15} className="flex-shrink-0" />
                  <span className="text-sm">{siteConfig.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-white/25">
                  <MapPin size={15} className="flex-shrink-0" />
                  <span className="text-sm">{siteConfig.address}</span>
                </div>
              </div>

              <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/25">Wat kun je verwachten?</p>
                <ul className="space-y-2.5">
                  {[
                    'Vrijblijvend eerste gesprek of appcontact',
                    'Eerlijke inschatting van wat slim is',
                    'Ook prima als je nog niet precies weet wat je nodig hebt',
                    'Direct persoonlijk contact',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[1rem] text-white/45">
                      <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-orange-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
