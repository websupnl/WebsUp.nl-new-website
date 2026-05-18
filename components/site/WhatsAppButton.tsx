'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { createWhatsAppHref } from '@/lib/utils'

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.224-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884'

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const whatsappHref = createWhatsAppHref(
    siteConfig.phone,
    'Hoi Daan, ik heb een vraag over mijn website of digitale systeem.'
  )

  // Auto-open na 4 seconden, eenmalig
  useEffect(() => {
    const dismissed = sessionStorage.getItem('wa-dismissed')
    if (dismissed) return
    const t = setTimeout(() => setOpen(true), 4000)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('wa-dismissed', '1')
    setOpen(false)
  }

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">

      {/* Popup card */}
      <div
        className={`relative w-[17rem] rounded-2xl border border-slate-200/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.14)] transition-all duration-300 ease-out ${
          open
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-3 opacity-0 pointer-events-none'
        }`}
      >
        {/* Profielfoto bovenin */}
        <div className="flex justify-center pt-5">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-md ring-2 ring-slate-100">
            <Image
              src="/Daan Koolhaas.jpg"
              alt="Daan Koolhaas"
              fill
              className="object-cover object-top"
              sizes="56px"
            />
          </div>
        </div>

        {/* Sluiten */}
        <button
          onClick={dismiss}
          aria-label="Sluiten"
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
        >
          <X size={13} />
        </button>

        {/* Tekst */}
        <p className="mt-3 px-5 text-center text-[0.92rem] leading-relaxed text-slate-700">
          Vraag over je website, webshop of digitaal project? Stuur een bericht en ik kijk met je mee!
        </p>

        {/* CTA */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
          className="mx-4 mb-4 mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-[0.88rem] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" style={{ fill: '#fff' }} aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          Open WhatsApp
        </a>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat met Daan via WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_28px_rgba(37,211,102,0.40)] transition-all duration-200 hover:scale-105 hover:shadow-[0_12px_32px_rgba(37,211,102,0.50)] active:scale-95"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" style={{ fill: '#ffffff' }} aria-hidden="true">
          <path d={WA_PATH} />
        </svg>
      </button>
    </div>
  )
}
