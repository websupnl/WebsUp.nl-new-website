'use client'

import MediaUploader from '@/components/admin/MediaUploader'
import type { SiteSettingsRow } from '@/types/database.types'

const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Raleway',
  'Poppins', 'Source Sans 3', 'Nunito', 'Playfair Display', 'Merriweather',
  'PT Sans', 'Ubuntu', 'Mulish', 'Barlow', 'DM Sans',
]

interface Props {
  data: Partial<SiteSettingsRow>
  onChange: (patch: Partial<SiteSettingsRow>) => void
}

export default function BrandingSection({ data, onChange }: Props) {
  const set = (key: keyof SiteSettingsRow, val: string) =>
    onChange({ [key]: val })

  return (
    <div className="space-y-6">
      {/* Logos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MediaUploader
          label="Logo (licht)"
          value={data.logo_url ?? ''}
          onChange={(url) => set('logo_url', url)}
        />
        <MediaUploader
          label="Logo (donker)"
          value={data.logo_dark_url ?? ''}
          onChange={(url) => set('logo_dark_url', url)}
        />
        <MediaUploader
          label="Favicon"
          value={data.favicon_url ?? ''}
          accept="image/x-icon,image/png,image/svg+xml"
          onChange={(url) => set('favicon_url', url)}
        />
      </div>

      {/* Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Primaire kleur
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.primary_color ?? '#2563EB'}
              onChange={(e) => set('primary_color', e.target.value)}
              className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white"
            />
            <input
              type="text"
              value={data.primary_color ?? '#2563EB'}
              onChange={(e) => set('primary_color', e.target.value)}
              placeholder="#2563EB"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
              maxLength={7}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Secundaire kleur
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.secondary_color ?? '#1E293B'}
              onChange={(e) => set('secondary_color', e.target.value)}
              className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white"
            />
            <input
              type="text"
              value={data.secondary_color ?? '#1E293B'}
              onChange={(e) => set('secondary_color', e.target.value)}
              placeholder="#1E293B"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
              maxLength={7}
            />
          </div>
        </div>
      </div>

      {/* Color preview */}
      <div className="flex gap-3 items-center">
        <div
          className="h-8 flex-1 rounded-xl flex items-center justify-center text-white text-xs font-semibold shadow-inner"
          style={{ backgroundColor: data.primary_color ?? '#2563EB' }}
        >
          Primair
        </div>
        <div
          className="h-8 flex-1 rounded-xl flex items-center justify-center text-white text-xs font-semibold shadow-inner"
          style={{ backgroundColor: data.secondary_color ?? '#1E293B' }}
        >
          Secundair
        </div>
      </div>

      {/* Font */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Lettertype (Google Fonts)
        </label>
        <select
          value={data.font_family ?? 'Inter'}
          onChange={(e) => set('font_family', e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          {GOOGLE_FONTS.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-1">
          Het geselecteerde lettertype wordt geladen via Google Fonts.
        </p>
      </div>

      {/* OG image */}
      <div>
        <MediaUploader
          label="OG / Social share afbeelding"
          value={data.og_image_url ?? ''}
          onChange={(url) => set('og_image_url', url)}
        />
        <p className="text-xs text-gray-400 mt-1">Aanbevolen: 1200×630px</p>
      </div>
    </div>
  )
}
