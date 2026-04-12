'use client'

import type { SeoSettingsRow } from '@/types/database.types'

interface Props {
  data: Partial<SeoSettingsRow>
  onChange: (patch: Partial<SeoSettingsRow>) => void
}

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value?.length ?? 0
  const over = len > max
  return (
    <span className={`text-xs ${over ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
      {len}/{max}
    </span>
  )
}

export default function SeoSection({ data, onChange }: Props) {
  const set = (key: keyof SeoSettingsRow, val: string) =>
    onChange({ [key]: val })

  return (
    <div className="space-y-5">
      {/* Meta title */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-gray-700">Meta title</label>
          <CharCount value={data.meta_title ?? ''} max={60} />
        </div>
        <input
          type="text"
          value={data.meta_title ?? ''}
          onChange={(e) => set('meta_title', e.target.value)}
          placeholder="Uw bedrijfsnaam — Tagline"
          maxLength={80}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <p className="text-xs text-gray-400 mt-1">Aanbevolen: max 60 tekens</p>
      </div>

      {/* Meta description */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-gray-700">Meta description</label>
          <CharCount value={data.meta_description ?? ''} max={160} />
        </div>
        <textarea
          value={data.meta_description ?? ''}
          onChange={(e) => set('meta_description', e.target.value)}
          placeholder="Korte beschrijving van uw website voor zoekmachines..."
          rows={3}
          maxLength={200}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">Aanbevolen: 120–160 tekens</p>
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Keywords
        </label>
        <input
          type="text"
          value={data.keywords ?? ''}
          onChange={(e) => set('keywords', e.target.value)}
          placeholder="zakelijke publicaties, management, financiën"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <p className="text-xs text-gray-400 mt-1">Komma-gescheiden</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Open Graph
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              OG title
            </label>
            <input
              type="text"
              value={data.og_title ?? ''}
              onChange={(e) => set('og_title', e.target.value)}
              placeholder="Zelfde als meta title of aangepast"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              OG description
            </label>
            <textarea
              value={data.og_description ?? ''}
              onChange={(e) => set('og_description', e.target.value)}
              placeholder="Beschrijving voor social media previews..."
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Analytics
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Google Analytics ID
          </label>
          <input
            type="text"
            value={data.google_analytics_id ?? ''}
            onChange={(e) => set('google_analytics_id', e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
    </div>
  )
}
