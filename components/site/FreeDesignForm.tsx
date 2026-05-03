'use client'

import { useState } from 'react'
import { CheckCircle, Send, Sparkles, Zap } from 'lucide-react'

const projectTypes = [
  'Website',
  'Webshop',
  'App of dashboard',
  'Automatisering',
  'Nog niet zeker',
]

const goals = [
  'Meer aanvragen',
  'Professioneler overkomen',
  'Online verkopen',
  'Processen slimmer maken',
  'Bestaande site vernieuwen',
]

export default function FreeDesignForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    projectType: projectTypes[0],
    goal: goals[0],
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const message = [
      'Aanvraag gratis ontwerp',
      '',
      `Bedrijf: ${form.company || '-'}`,
      `Huidige website: ${form.website || '-'}`,
      `Projecttype: ${form.projectType}`,
      `Belangrijkste doel: ${form.goal}`,
      '',
      'Toelichting:',
      form.message,
    ].join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Gratis ontwerp aanvraag${form.company ? `: ${form.company}` : ''}`,
          message,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Verzenden is niet gelukt. Probeer het later opnieuw.')
        return
      }

      setSent(true)
    } catch {
      setError('Verzenden is niet gelukt. Controleer je internetverbinding.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-green-100 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle size={28} />
        </div>
        <h2 className="mt-5 font-headline text-2xl font-bold text-slate-900">Aanvraag ontvangen</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          Ik neem binnen een werkdag contact met je op met een paar gerichte vragen of een eerste richting.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
      <div className="mb-6">
        <span className="overline-badge mb-4 inline-flex">Aanvraag</span>
        <h2 className="font-headline text-2xl font-bold text-slate-900">Vraag je gratis ontwerp aan</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Deel kort wat je wilt bouwen. Ik kijk mee naar een passende richting voor je website, webshop of digitale systeem.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="free-design-name" className="mb-1.5 block text-sm font-medium text-slate-700">
            Naam <span className="text-orange-500">*</span>
          </label>
          <input
            id="free-design-name"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            placeholder="Jouw naam"
          />
        </div>

        <div>
          <label htmlFor="free-design-email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email <span className="text-orange-500">*</span>
          </label>
          <input
            id="free-design-email"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            placeholder="jij@bedrijf.nl"
          />
        </div>

        <div>
          <label htmlFor="free-design-company" className="mb-1.5 block text-sm font-medium text-slate-700">
            Bedrijf
          </label>
          <input
            id="free-design-company"
            value={form.company}
            onChange={(event) => setForm({ ...form, company: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            placeholder="Bedrijfsnaam"
          />
        </div>

        <div>
          <label htmlFor="free-design-website" className="mb-1.5 block text-sm font-medium text-slate-700">
            Huidige website
          </label>
          <input
            id="free-design-website"
            value={form.website}
            onChange={(event) => setForm({ ...form, website: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">Wat wil je laten maken?</label>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm({ ...form, projectType: type })}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                form.projectType === type
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">Wat is het belangrijkste doel?</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {goals.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => setForm({ ...form, goal })}
              className={`flex min-h-11 items-center gap-2 rounded-lg border px-4 py-2 text-left text-sm font-semibold transition-colors ${
                form.goal === goal
                  ? 'border-orange-200 bg-orange-50 text-orange-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300'
              }`}
            >
              {form.goal === goal ? <Sparkles size={15} /> : <Zap size={15} className="text-slate-300" />}
              {goal}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="free-design-message" className="mb-1.5 block text-sm font-medium text-slate-700">
          Korte toelichting <span className="text-orange-500">*</span>
        </label>
        <textarea
          id="free-design-message"
          required
          rows={5}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          placeholder="Waar loop je tegenaan, wat wil je verbeteren of wat moet de nieuwe site opleveren?"
        />
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Verzenden...' : 'Aanvraag versturen'}
        <Send size={16} />
      </button>
    </form>
  )
}
