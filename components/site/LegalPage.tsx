import Link from 'next/link'
import type { ReactNode } from 'react'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'

interface LegalSection {
  title: string
  paragraphs?: string[]
  list?: string[]
  note?: ReactNode
}

interface LegalPageProps {
  badge: string
  title: string
  subtitle: string
  updatedLabel: string
  sections: LegalSection[]
}

export default function LegalPage({
  badge,
  title,
  subtitle,
  updatedLabel,
  sections,
}: LegalPageProps) {
  return (
    <div>
      <WavePageHeader badge={badge} title={title} subtitle={subtitle} heightClass="min-h-[48vh]">
        <div className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/70">
          Laatst bijgewerkt: {updatedLabel}
        </div>
      </WavePageHeader>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="legal-content space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.note && <div className="mt-4 text-sm leading-relaxed text-slate-500">{section.note}</div>}
                </section>
              ))}

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold text-slate-900">Twijfel je ergens over?</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Neem gerust contact op via{' '}
                  <Link href="/contact" className="font-semibold text-slate-900 underline underline-offset-4">
                    de contactpagina
                  </Link>
                  . Juridische teksten moeten altijd aansluiten op je exacte werkwijze, tools en
                  afspraken met klanten.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
