'use client'

import Image from 'next/image'
import { siteConfig } from '@/config/site.config'
import { createWhatsAppHref } from '@/lib/utils'

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.224-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884'

export default function WhatsAppButton() {
  const whatsappHref = createWhatsAppHref(
    siteConfig.phone,
    'Hoi Daan, ik heb een vraag over mijn website of digitale systeem.'
  )

  return (
    <div className="group fixed bottom-5 right-5 z-30">

      {/* Hover card — verschijnt boven de button */}
      <div
        className="pointer-events-none absolute bottom-[72px] right-0 w-64 translate-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-4 opacity-0 shadow-[0_18px_50px_rgba(15,23,42,0.16)] transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/70 to-transparent" />

        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-slate-200">
            <Image src="/Daan Koolhaas.jpg" alt="Daan Koolhaas" fill className="object-cover object-top" sizes="44px" />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.98rem] font-semibold leading-tight text-slate-900">Daan Koolhaas</p>
            <p className="mt-1 flex items-center gap-1.5 text-[0.82rem] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Meestal snel reactie
            </p>
          </div>
        </div>

        <p className="mt-3 text-[0.92rem] leading-relaxed text-slate-600">
          Stuur je vraag of idee. Dan kijk ik persoonlijk even met je mee.
        </p>

        <div className="mt-3 flex items-center gap-2 text-[0.88rem] font-semibold text-slate-900">
          <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" style={{ fill: '#25D366' }} aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          Open WhatsApp
        </div>
      </div>

      {/* WhatsApp bubble */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat met Daan via WhatsApp"
        className="whatsapp-sticky-label flex items-center gap-2.5 rounded-full px-4 py-2.5 active:scale-[0.98]"
      >
        <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem] flex-shrink-0" style={{ fill: '#25D366' }} aria-hidden="true">
          <path d={WA_PATH} />
        </svg>
        <span className="whitespace-nowrap text-[0.9rem] font-semibold text-slate-900">Vraag of idee? Stuur een appje</span>
      </a>
    </div>
  )
}
