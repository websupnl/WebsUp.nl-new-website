'use client'

import type { SiteSettingsRow } from '@/types/database.types'

interface Props {
  data: Partial<SiteSettingsRow>
  onChange: (patch: Partial<SiteSettingsRow>) => void
}

const fields: Array<{
  key: keyof SiteSettingsRow
  label: string
  type: string
  placeholder: string
}> = [
  { key: 'site_name',    label: 'Bedrijfsnaam',      type: 'text',  placeholder: 'Business Publicatie Uitgevers' },
  { key: 'tagline',      label: 'Tagline',            type: 'text',  placeholder: 'Zakelijke kennis op niveau.' },
  { key: 'email',        label: 'E-mailadres',        type: 'email', placeholder: 'info@uw-bedrijf.nl' },
  { key: 'phone',        label: 'Telefoonnummer',     type: 'text',  placeholder: '+31 123 456 789' },
  { key: 'address',      label: 'Adres',              type: 'text',  placeholder: 'Straat 10, 1234 AB Stad' },
  { key: 'linkedin_url', label: 'LinkedIn URL',       type: 'url',   placeholder: 'https://linkedin.com/company/...' },
]

export default function BedrijfsinfoSection({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {field.label}
          </label>
          <input
            type={field.type}
            value={(data[field.key] as string) ?? ''}
            onChange={(e) => onChange({ [field.key]: e.target.value })}
            placeholder={field.placeholder}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>
      ))}
    </div>
  )
}
