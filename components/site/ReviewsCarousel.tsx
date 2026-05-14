'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { TestimonialWithProject } from '@/lib/queries/testimonials'

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i < count ? '#FBBC05' : '#E2E8F0'}
          />
        </svg>
      ))}
    </div>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const VISIBLE = 3

interface Props {
  testimonials: TestimonialWithProject[]
}

export default function ReviewsCarousel({ testimonials }: Props) {
  const [offset, setOffset] = useState(0)

  const total = testimonials.length
  const canPrev = offset > 0
  const canNext = offset + VISIBLE < total

  const avg =
    total > 0
      ? (testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0) / total).toFixed(1)
      : '5.0'

  const visible = testimonials.slice(offset, offset + VISIBLE)

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6"
          >
            <Stars count={t.rating ?? 5} />
            <p className="flex-1 text-sm leading-relaxed text-slate-700">
              &ldquo;{t.content}&rdquo;
            </p>
            <div>
              <p className="text-sm font-semibold text-slate-900">{t.name}</p>
              <p className="mt-0.5 text-xs text-slate-400">
                {t.role ?? 'Klant van WebsUp'} &middot; {formatDate(t.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GoogleLogo />
          <div>
            <div className="flex items-center gap-2">
              <Stars count={5} size={14} />
              <span className="text-sm font-semibold text-slate-900">Uitstekend</span>
            </div>
            <p className="mt-0.5 text-xs text-slate-400">
              {avg} &middot; Gebaseerd op {total} Google reviews
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOffset(Math.max(0, offset - 1))}
            disabled={!canPrev}
            aria-label="Vorige"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setOffset(Math.min(total - VISIBLE, offset + 1))}
            disabled={!canNext}
            aria-label="Volgende"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
