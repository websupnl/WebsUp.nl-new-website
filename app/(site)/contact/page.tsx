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
      setError('Er is iets misgegaan. Controleer uw internetverbinding.')
    } finally {
      setLoading(false)
    }
  }

  const projectTypes = [
    'Website',
    'Webshop',
    'App / Dashboard',
    'Automatisering',
    'Anders / Weet ik nog niet',
  ]

  return (
    <div>
      <WavePageHeader
        badge="Contact"
        title="Laten we kennismaken."
        subtitle="Vertel me over jouw project. Ik reageer binnen één werkdag."
      >
        <div className="flex flex-wrap gap-5 mt-7">
          {[
            { icon: Clock, value: 'Binnen 1 werkdag', label: 'reactietijd' },
            { icon: MessageCircle, value: 'Gratis gesprek', label: 'geen verplichtingen' },
            { icon: Shield, value: 'Eerlijk advies', label: 'altijd transparant' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-50">
                <Icon size={15} className="text-orange-500" />
              </div>
              <div>
                <div className="text-slate-900 font-semibold text-sm leading-none">{value}</div>
                <div className="text-slate-400 text-xs mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </WavePageHeader>

      {/* Contact sectie */}
      <section className="bg-white py-16 lg:py-24">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Contactgegevens</h2>

              {[
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
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-700 text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Wat kun je verwachten */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Wat kun je verwachten?</h3>
                <ul className="space-y-3">
                  {[
                    'Gratis kennismakingsgesprek',
                    'Concrete aanpak zonder vage offertes',
                    'Eerlijk advies, ook als ik niet de juiste fit ben',
                    'Direct contact met de developer',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Formulier */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-5 text-center bg-green-50 rounded-2xl p-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bericht ontvangen!</h3>
                    <p className="text-gray-500">
                      Bedankt voor je bericht. Ik neem binnen één werkdag contact met je op.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Project type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wat heb je nodig?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setForm({ ...form, type })}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            form.type === type
                              ? 'text-white border-transparent'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300'
                          }`}
                          style={form.type === type ? { background: 'linear-gradient(135deg,#f97316 0%,#ec4899 50%,#a78bfa 100%)' } : undefined}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Naam <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                        placeholder="Jouw naam"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                        placeholder="jouw@email.nl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Onderwerp
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                      placeholder="Bijv. Website voor mijn installatiebedrijf"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Vertel me over jouw project <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none"
                      placeholder="Wat wil je bouwen? Wat is je budget? Wanneer wil je live?"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-full transition-all text-sm disabled:opacity-50 hover:bg-slate-800 hover:-translate-y-px"
                  >
                    {loading ? (
                      <>
                        <Zap size={16} className="animate-pulse" />
                        Verzenden...
                      </>
                    ) : (
                      <>
                        Verstuur bericht
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
