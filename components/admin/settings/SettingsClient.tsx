'use client'

import { useState, useTransition, useCallback } from 'react'
import {
  saveSiteSettings,
  saveSeoSettings,
  saveNavigationItems,
  saveModules,
  saveForms,
} from '@/lib/actions/settings.actions'
import { useToast } from '@/hooks/useToast'

import BrandingSection from '@/components/admin/settings/BrandingSection'
import BedrijfsinfoSection from '@/components/admin/settings/BedrijfsinfoSection'
import SeoSection from '@/components/admin/settings/SeoSection'
import NavigatieSection from '@/components/admin/settings/NavigatieSection'
import ModulesSection from '@/components/admin/settings/ModulesSection'
import FormBuilderSection from '@/components/admin/settings/FormBuilderSection'

import {
  Palette, Building2, Search, Navigation, ToggleLeft, FileText, Save, AlertTriangle,
} from 'lucide-react'

import type {
  SiteSettingsRow, SeoSettingsRow, NavigationItemRow, ModuleRow, FormRow,
} from '@/types/database.types'

const TABS = [
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'bedrijf', label: 'Bedrijfsinfo', icon: Building2 },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'navigatie', label: 'Navigatie', icon: Navigation },
  { id: 'modules', label: 'Modules', icon: ToggleLeft },
  { id: 'formulieren', label: 'Formulieren', icon: FileText },
] as const

type TabId = typeof TABS[number]['id']
type NavItemDraft = Omit<NavigationItemRow, 'created_at'> & { id: string }
type FormDraft = Omit<FormRow, 'tenant_id' | 'created_at' | 'updated_at'>
type ModuleDraft = Pick<ModuleRow, 'key' | 'enabled' | 'label'>

interface Props {
  initialSiteSettings: Partial<SiteSettingsRow>
  initialSeoSettings: Partial<SeoSettingsRow>
  initialNavItems: NavItemDraft[]
  initialModules: ModuleDraft[]
  initialForms: FormDraft[]
  unavailableTables: string[]
}

export default function SettingsClient({
  initialSiteSettings,
  initialSeoSettings,
  initialNavItems,
  initialModules,
  initialForms,
  unavailableTables,
}: Props) {
  const { show } = useToast()
  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useState<TabId>('branding')

  const [siteSettings, setSiteSettings] = useState<Partial<SiteSettingsRow>>(initialSiteSettings)
  const [seoSettings, setSeoSettings] = useState<Partial<SeoSettingsRow>>(initialSeoSettings)
  const [navItems, setNavItems] = useState<NavItemDraft[]>(initialNavItems)
  const [modules, setModules] = useState<ModuleDraft[]>(initialModules)
  const [forms, setForms] = useState<FormDraft[]>(initialForms)

  const handleSave = useCallback(() => {
    startTransition(async () => {
      let result: { success: boolean; error?: string }

      switch (tab) {
        case 'branding':
        case 'bedrijf':
          result = await saveSiteSettings(siteSettings)
          break
        case 'seo':
          result = await saveSeoSettings(seoSettings)
          break
        case 'navigatie':
          result = await saveNavigationItems(navItems.map((item) => ({
            label: item.label,
            url: item.url,
            type: item.type,
            location: item.location,
            order_index: item.order_index,
          })))
          break
        case 'modules':
          result = await saveModules(
            modules.map((m) => ({ key: m.key, enabled: m.enabled, label: m.label ?? undefined }))
          )
          break
        case 'formulieren':
          result = await saveForms(forms.map((f) => ({ ...f, email_to: f.email_to ?? '' })))
          break
        default:
          return
      }

      if (result.success) {
        show('Instellingen succesvol opgeslagen.')
      } else {
        show(`Opslaan mislukt: ${result.error}`, 'error')
      }
    })
  }, [forms, modules, navItems, seoSettings, show, siteSettings, tab])

  return (
    <div className="mx-auto max-w-4xl pb-24">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instellingen</h1>
          <p className="mt-0.5 text-sm text-gray-400">
            Beheer branding, SEO, navigatie en modules per klant.
          </p>
        </div>
      </div>

      {unavailableTables.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
            <div>
              <p className="font-semibold">Een deel van de instellingen-tabellen is niet beschikbaar.</p>
              <p className="mt-1 leading-6">
                Ontbrekend of niet bereikbaar: {unavailableTables.join(', ')}. De pagina blijft nu wel bruikbaar,
                maar voor volledig werkende instellingen moet `supabase/schema_v2.sql` op de gekoppelde database zijn toegepast.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex gap-1.5 overflow-x-auto pb-1">
        {TABS.map((item) => {
          const Icon = item.icon
          const active = tab === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                active ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={14} />
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {tab === 'branding' && (
          <BrandingSection
            data={siteSettings}
            onChange={(patch) => setSiteSettings((prev) => ({ ...prev, ...patch }))}
          />
        )}
        {tab === 'bedrijf' && (
          <BedrijfsinfoSection
            data={siteSettings}
            onChange={(patch) => setSiteSettings((prev) => ({ ...prev, ...patch }))}
          />
        )}
        {tab === 'seo' && (
          <SeoSection
            data={seoSettings}
            onChange={(patch) => setSeoSettings((prev) => ({ ...prev, ...patch }))}
          />
        )}
        {tab === 'navigatie' && <NavigatieSection items={navItems} onChange={setNavItems} />}
        {tab === 'modules' && <ModulesSection modules={modules} onChange={setModules} />}
        {tab === 'formulieren' && <FormBuilderSection forms={forms} onChange={setForms} />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-gray-100 bg-white/90 px-6 py-3 backdrop-blur-sm">
        <p className="text-xs text-gray-400">
          Wijzigingen in &ldquo;{TABS.find((item) => item.id === tab)?.label}&rdquo; worden opgeslagen.
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:bg-blue-300"
        >
          <Save size={15} />
          {isPending ? 'Opslaan...' : 'Opslaan'}
        </button>
      </div>
    </div>
  )
}