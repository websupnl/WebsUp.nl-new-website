import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getLegalPage } from '@/lib/queries/legal'
import LegalForm from '@/components/admin/LegalForm'

const VALID_SLUGS = ['algemene-voorwaarden', 'privacybeleid', 'cookiebeleid'] as const
type ValidSlug = typeof VALID_SLUGS[number]

const TITLES: Record<ValidSlug, string> = {
  'algemene-voorwaarden': 'Algemene Voorwaarden',
  privacybeleid: 'Privacybeleid',
  cookiebeleid: 'Cookiebeleid',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const title = TITLES[slug as ValidSlug] ?? slug
  return { title: `${title} bewerken — Admin` }
}

export default async function EditLegalPage({ params }: Props) {
  const { slug } = await params

  if (!VALID_SLUGS.includes(slug as ValidSlug)) notFound()

  const page = await getLegalPage(slug)
  const validSlug = slug as ValidSlug

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/juridisch"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
        >
          <ChevronLeft size={15} />
          Juridisch
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-900">{TITLES[validSlug]}</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{TITLES[validSlug]}</h1>
        {!page && (
          <p className="mt-1 text-sm text-orange-500">
            Nog niet opgeslagen. De publieke pagina toont momenteel de statische fallback-tekst.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <LegalForm page={page} slug={validSlug} />
      </div>
    </div>
  )
}
