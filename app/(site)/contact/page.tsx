'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Shield,
} from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/config/site.config'

const projectTypes = [
  'Website',
  'Webshop',
  'App of dashboard',
  'Automatisering',
  'Nog niet helemaal scherp',
]

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error ?? 'Er ging iets mis. Probeer het nog eens.')
        return
      }

      setSent(true)
    } catch {
      setError('Verzenden lukt nu even niet. Probeer het later opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <WavePageHeader
        badge="Contact"
        title="Vertel kort wat je wilt"
        titleHighlight="bouwen."
        subtitle="Geen intakecircus en geen verkooppraatje. Gewoon een helder gesprek over wat slim is voor jouw situatie, hoe groot of klein de vraag ook is."
      >
        <div className="mt-7 flex flex-wrap gap-2">
          {['Reactie binnen 1 werkdag', 'Direct contact met Daan', 'Eerlijk advies zonder ruis'].map(
            (item) => (
              <span
                key={item}
                className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/72"
              >
                {item}
              </span>
            )
          )}
        </div>
      </WavePageHeader>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Contact opnemen</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Kort schakelen werkt hier beter dan een lang formulier.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Vertel waar je tegenaan loopt, wat je ongeveer wilt bouwen en hoe ver je al bent. Dan
              krijg je een duidelijk antwoord terug: wat logisch is, wat niet nodig is en hoe we het
              slim kunnen aanpakken.
            </p>

            <div className="mt-10 space-y-5 border-t border-slate-200 pt-6">
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
                  icon: MessageCircle,
                  label: 'Locatie',
                  value: siteConfig.address,
                  href: '',
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--surface-2)] text-orange-500">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 inline-block text-base font-semibold text-slate-900 transition-colors hover:text-orange-500"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="mt-1 text-base font-semibold text-slate-900">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-4 border-t border-slate-200 pt-6">
              {[
                'Je krijgt direct contact met degene die ook echt bouwt.',
                'Als iets niet de juiste route is, zeg ik dat ook gewoon.',
                'Een compacte vraag is net zo welkom als een groter traject.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[1.75rem] bg-[#06040c] p-7 text-white">
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-white/44">
                Liever direct sparren?
              </div>
              <p className="mt-3 max-w-md text-base leading-relaxed text-white/68">
                Stuur gewoon je idee door. Ook als het nog niet helemaal scherp is. Dan kijken we
                samen wat de slimste eerste stap is.
              </p>
              <div className="mt-6">
                <Link href="/voor-starters" className="btn-dark-ghost inline-flex items-center gap-2">
                  Voor starters en eerste trajecten
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            {sent ? (
              <div className="rounded-[2rem] bg-[#06040c] p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white/10 text-orange-400">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="mt-6 font-headline text-3xl font-extrabold">Bericht ontvangen.</h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/68">
                  Dank voor je bericht. Ik kom er binnen een werkdag op terug met een inhoudelijke
                  reactie.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="surface-card rounded-[2rem] p-7 lg:p-9">
                <div>
                  <span className="overline-badge mb-4 inline-flex">Projectvraag</span>
                  <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900">
                    Waar gaat je vraag ongeveer over?
                  </h2>
                </div>

                <div className="mt-8">
                  <label className="text-sm font-semibold text-slate-700">Type project</label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projectTypes.map((type) => {
                      const active = form.type === type

                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setForm((current) => ({ ...current, type }))}
                          className={
                            active
                              ? 'rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white'
                              : 'rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-500'
                          }
                        >
                          {type}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                      Naam
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, name: event.target.value }))
                      }
                      className="mt-2 w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400"
                      placeholder="Jouw naam"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, email: event.target.value }))
                      }
                      className="mt-2 w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400"
                      placeholder="jij@bedrijf.nl"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700">
                    Onderwerp
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, subject: event.target.value }))
                    }
                    className="mt-2 w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400"
                    placeholder="Bijvoorbeeld: nieuwe website voor mijn bedrijf"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
                    Vertel kort wat je nodig hebt
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={7}
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, message: event.target.value }))
                    }
                    className="mt-2 w-full resize-none rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 outline-none transition-colors focus:border-orange-400"
                    placeholder="Wat wil je bouwen, waar loop je nu tegenaan en wanneer wil je ongeveer live?"
                  />
                </div>

                {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-brand inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Verzenden...' : 'Verstuur bericht'}
                    <Send size={14} />
                  </button>

                  <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <Shield size={15} className="text-orange-500" />
                    Je bericht komt direct bij WebsUp terecht.
                  </div>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
