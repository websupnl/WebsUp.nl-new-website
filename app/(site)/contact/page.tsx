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
import { GlassCard } from '@/components/site/GlassCard'
import { createWhatsAppHref } from '@/lib/utils'

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
        <div className="grid gap-3 sm:grid-cols-3 max-w-2xl">
          <GlassCard padding="px-4 py-3" className="flex items-center gap-2">
            <Clock size={16} className="text-orange-400" />
            <span className="text-sm text-white/85">Binnen 1 werkdag</span>
          </GlassCard>
          <GlassCard padding="px-4 py-3" className="flex items-center gap-2">
            <MessageCircle size={16} className="text-orange-400" />
            <span className="text-sm text-white/85">Vrijblijvend sparren</span>
          </GlassCard>
          <GlassCard padding="px-4 py-3" className="flex items-center gap-2">
            <Shield size={16} className="text-orange-400" />
            <span className="text-sm text-white/85">Eerlijk advies</span>
          </GlassCard>
        </div>
      </WavePageHeader>

      <section className="bg-white py-20 lg:py-28">
        <Reveal className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left — formulier */}
            <div>
              {sent ? (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-5 rounded-2xl border border-green-100 bg-green-50 p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">Bericht ontvangen!</h3>
                    <p className="text-slate-500">
                      Bedankt voor je bericht. Ik neem binnen een werkdag contact met je op.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Waar gaat het ongeveer over?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setForm({ ...form, type })}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                            form.type === type
                              ? 'border-transparent bg-orange-500 text-white'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-500'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Naam <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Jouw naam"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                        E-mail <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="jouw@email.nl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Onderwerp
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Bijv. website voor mijn installatiebedrijf"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Vertel kort wat er speelt <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Wat wil je maken, waar loop je nu tegenaan of waar wil je graag even over sparren?"
                    />
                  </div>

                  {error && <p className="text-sm text-orange-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-brand-gradient disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Zap size={16} className="animate-pulse" />
                        Verzenden…
                      </>
                    ) : (
                      <>
                        Stuur vrijblijvend een bericht
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right — sidebar */}
            <div className="space-y-5">
              <GlassCard variant="orange" padding="px-5 py-4" className="flex items-center gap-3 !bg-orange-500/[0.06]">
                <Zap size={18} className="flex-shrink-0 text-orange-500" />
                <span className="text-sm font-medium text-slate-900">Binnen 1 werkdag reactietijd</span>
              </GlassCard>
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 flex items-center gap-3">
                <MessageCircle size={18} className="flex-shrink-0 text-orange-500" />
                <span className="text-sm font-medium text-slate-900">Vrijblijvend sparren — geen verplichtingen</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 flex items-center gap-3">
                <CheckCircle size={18} className="flex-shrink-0 text-orange-500" />
                <span className="text-sm font-medium text-slate-900">Eerlijk advies — altijd transparant</span>
              </div>

              {/* Contactgegevens — plain */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 hover:text-orange-500 transition-colors"
                >
                  <MessageCircle size={16} className="flex-shrink-0" />
                  <span className="text-sm">WhatsApp</span>
                </a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-slate-600 hover:text-orange-500 transition-colors">
                  <Mail size={16} className="flex-shrink-0" />
                  <span className="text-sm">{siteConfig.email}</span>
                </a>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-slate-600 hover:text-orange-500 transition-colors">
                  <Phone size={16} className="flex-shrink-0" />
                  <span className="text-sm">{siteConfig.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-slate-500">
                  <MapPin size={16} className="flex-shrink-0" />
                  <span className="text-sm">{siteConfig.address}</span>
                </div>
              </div>

              {/* Wat kun je verwachten */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-slate-400">
                  Wat kun je verwachten?
                </h3>
                <ul className="space-y-3">
                  {[
                    'Vrijblijvend eerste gesprek of appcontact',
                    'Eerlijke inschatting van wat slim is',
                    'Ook prima als je nog niet precies weet wat je nodig hebt',
                    'Direct persoonlijk contact',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-orange-500" />
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
