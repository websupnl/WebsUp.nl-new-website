import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllLegalPages } from '@/lib/queries/legal'
import { FileText, ChevronRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Juridisch — Admin' }

const DOCS = [
  {
    slug: 'algemene-voorwaarden' as const,
    title: 'Algemene Voorwaarden',
    description: 'Spelregels voor opdrachten, aansprakelijkheid en betaling.',
  },
  {
    slug: 'privacybeleid' as const,
    title: 'Privacybeleid',
    description: 'Hoe persoonsgegevens worden verzameld en verwerkt (AVG).',
  },
  {
    slug: 'cookiebeleid' as const,
    title: 'Cookiebeleid',
    description: 'Welke cookies worden geplaatst en waarvoor.',
  },
]

export default async function JuridischPage() {
  const saved = await getAllLegalPages()
  const savedMap = Object.fromEntries(saved.map((p) => [p.slug, p]))

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Juridische documenten</h1>
        <p className="mt-1 text-sm text-slate-500">
          Beheer de teksten van je algemene voorwaarden, privacybeleid en cookiebeleid.
        </p>
      </div>

      <div className="space-y-3">
        {DOCS.map((doc) => {
          const saved = savedMap[doc.slug]
          return (
            <Link
              key={doc.slug}
              href={`/admin/juridisch/${doc.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-orange-300 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <FileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900">{doc.title}</p>
                <p className="mt-0.5 text-sm text-slate-500">{doc.description}</p>
                {saved && (
                  <p className="mt-1 text-xs text-slate-400">
                    Opgeslagen versie: {saved.version || '—'} · {new Date(saved.updated_at).toLocaleDateString('nl-NL')}
                  </p>
                )}
                {!saved && (
                  <p className="mt-1 text-xs text-orange-400">Nog niet bewerkt — toont huidige statische tekst</p>
                )}
              </div>
              <ChevronRight size={16} className="flex-shrink-0 text-slate-300" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
