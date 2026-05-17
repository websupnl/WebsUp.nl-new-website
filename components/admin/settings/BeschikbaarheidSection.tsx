'use client'

import type { SiteSettingsRow } from '@/types/database.types'

interface Props {
  data: Partial<SiteSettingsRow>
  onChange: (patch: Partial<SiteSettingsRow>) => void
}

export default function BeschikbaarheidSection({ data, onChange }: Props) {
  const enabled = data.availability_enabled ?? true
  const slots = data.availability_slots ?? 2
  const label = data.availability_label ?? `Nog ruimte voor ${slots} projecten`
  const detail = data.availability_detail ?? 'deze maand'

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Beschikbaarheid</h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Beheer de availability badge in de sticky navigatie. Houd de tekst kort, zodat hij premium en rustig blijft.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <label className="flex items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-semibold text-gray-900">Badge tonen</span>
            <span className="mt-0.5 block text-xs text-gray-500">Zet uit als je tijdelijk geen capaciteit wilt tonen.</span>
          </span>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onChange({ availability_enabled: e.target.checked })}
            className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-[0.45fr_1fr]">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Aantal plekken
          </label>
          <input
            type="number"
            min={0}
            max={9}
            value={slots}
            onChange={(e) => {
              const nextSlots = Number(e.target.value)
              onChange({
                availability_slots: nextSlots,
                availability_label: data.availability_label ?? `Nog ruimte voor ${nextSlots} projecten`,
              })
            }}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Hoofdtekst
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => onChange({ availability_label: e.target.value })}
            placeholder="Nog ruimte voor 2 projecten"
            maxLength={60}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Subtekst
          </label>
          <input
            type="text"
            value={detail}
            onChange={(e) => onChange({ availability_detail: e.target.value })}
            placeholder="deze maand"
            maxLength={60}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Periode
          </label>
          <input
            type="text"
            value={data.availability_period ?? 'deze maand'}
            onChange={(e) => onChange({ availability_period: e.target.value })}
            placeholder="deze maand"
            maxLength={60}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-[#06040c] p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/35">Preview</p>
        <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.10] bg-white/[0.045] px-3 py-2 shadow-[0_10px_34px_rgba(0,0,0,0.22)]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,#f97316_0%,#ec4899_50%,#a78bfa_100%)] text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(236,72,153,0.24)]">
            {slots}
          </span>
          <span>
            <span className="block text-[0.72rem] font-semibold leading-none text-white/90">{label}</span>
            <span className="mt-1 block text-[0.64rem] font-medium leading-none text-white/42">{detail}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
