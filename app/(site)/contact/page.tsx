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
import GradientIcon from '@/components/site/GradientIcon'
import GlassStatGrid from '@/components/site/GlassStatGrid'
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
    'Hoi Daan, ik wil graag even vrijblijvend sparren over mijn website of digitale systeem.'
  )

  return (
    <div>
      <WavePageHeader
        badge="Contact"
        title="Laten we kennismaken."
        subtitle="Vertel kort waar je mee bezig bent of waar je op vastloopt. Ik reageer binnen een werkdag met een eerlijk en vrijblijvend antwoord."
      >
        <GlassStatGrid
          items={[
            { icon: Clock, value: 'Binnen 1 werkdag', label: 'reactietijd' },
            { icon: MessageCircle, value: 'Vrijblijvend sparren', label: 'geen verplichtingen' },
            { icon: Shield, value: 'Eerlijk advies', label: 'altijd transparant' },
          ]}
        />
      </WavePageHeader>

      <section className="bg-slate-50 py-16 lg:py-24">
        <Reveal className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#06040c] p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
                <span className="overline-badge mb-4 inline-flex">Direct contact</span>
                <h2 className="text-xl font-bold text-white">Contactgegevens</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Kort schakelen, eerlijk advies en direct contact met degene die bouwt.
                </p>

                <div className="mt-8 space-y-5">
                  {[
                    {
                      icon: MessageCircle,
                      label: 'WhatsApp',
                      value: 'Stuur gerust een berichtje',
                      href: whatsappHref,
                    },
                    {
                      icon: Mail,
                      label: 'E-mail',
                      value: siteConfig.email,
                      href: `mailto:${siteConfig.email}`,
                    },
                    {
                      icon: Phone,
                      label: 'Telefoon',
                      value: siteConfig.phone,
                      href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
                    },
                    {
                      icon: MapPin,
                      label: 'Locatie',
                      value: siteConfig.address,
                      href: null,
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <GradientIcon icon={Icon} size="sm" />
                      <div>
                        <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-white/40">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            target={label === 'WhatsApp' ? '_blank' : undefined}
                            rel={label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                            className="text-sm font-medium text-white/85 transition-colors hover:text-orange-400"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-white/85">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12 hover:border-white/22"
                  >
                    <MessageCircle size={15} />
                    Stuur bericht via WhatsApp
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/25 px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-black/35 hover:text-white"
                  >
                    <Mail size={15} />
                    Stuur een mail
                  </a>
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <h3 className="mb-4 text-sm font-semibold text-white">Wat kun je verwachten?</h3>
                  <ul className="space-y-3">
                    {[
                      'Vrijblijvend eerste gesprek of appcontact',
                      'Eerlijke inschatting van wat slim is',
                      'Ook prima als je nog niet precies weet wat je nodig hebt',
                      'Direct contact met de developer',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/65">
                        <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-orange-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {sent ? (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-5 rounded-[1.75rem] bg-green-50 p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">Bericht ontvangen!</h3>
                    <p className="text-gray-500">
                      Bedankt voor je bericht. Ik neem binnen een werkdag contact met je op.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 rounded-[1.75rem] border border-slate-100 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <div>
                    <span className="overline-badge mb-4 inline-flex">Vrijblijvend contact</span>
                    <h2 className="text-2xl font-bold text-slate-900">Vertel kort waar je over wilt sparren</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
                      Nog niet alles scherp? Geen probleem. Een ruwe vraag of half idee is genoeg om het gesprek te starten.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
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
                              ? 'border-transparent bg-slate-900 text-white'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Naam <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Jouw naam"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="jouw@email.nl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Onderwerp
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Bijv. website voor mijn installatiebedrijf"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Vertel kort wat er speelt <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Wat wil je maken, waar loop je nu tegenaan of waar wil je graag even over sparren?"
                    />
                  </div>

                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-slate-800 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Zap size={16} className="animate-pulse" />
                        Verzenden...
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
          </div>
        </Reveal>
      </section>
    </div>
  )
}
