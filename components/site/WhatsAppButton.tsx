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
        className="pointer-events-none absolute bottom-[72px] right-0 w-60 opacity-0 translate-y-2.5 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
        style={{
          background: 'rgba(8,6,16,0.84)',
          backdropFilter: 'blur(36px) saturate(200%)',
          WebkitBackdropFilter: 'blur(36px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '14px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.03) inset',
        }}
      >
        {/* Top ambient line */}
        <div className="absolute inset-x-0 top-0 h-px rounded-t-[14px]"
          style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(37,211,102,0.20) 50%, transparent 90%)' }} />

        <div className="p-3.5">
          {/* Avatar + name */}
          <div className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
              <Image src="/Daan Koolhaas.jpg" alt="Daan" fill className="object-cover object-top" sizes="36px" />
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-[11px] w-[11px] items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative h-[7px] w-[7px] rounded-full border border-[#08060f] bg-emerald-400" />
              </span>
            </div>
            <div>
              <p className="text-[0.82rem] font-semibold leading-none text-white">Daan Koolhaas</p>
              <p className="mt-[5px] flex items-center gap-1 text-[0.72rem] text-white/80">
                <span className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-emerald-400/90" />
                Nu beschikbaar
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-3 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />

          {/* Body */}
          <p className="mt-2.5 text-[0.8rem] leading-relaxed text-white/85">
            Persoonlijk bereikbaar voor vragen, ideeën of advies.
          </p>

          {/* WhatsApp hint */}
          <div className="mt-2.5 flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-shrink-0" style={{ fill: '#25D366' }} aria-hidden="true">
              <path d={WA_PATH} />
            </svg>
            <span className="text-[0.72rem] text-white/70">Klik om te openen in WhatsApp</span>
          </div>
        </div>
      </div>

      {/* WhatsApp button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat met Daan via WhatsApp"
        className="flex h-14 items-center gap-0 overflow-hidden rounded-full border border-white/20 bg-[#25D366] shadow-[0_8px_32px_rgba(37,211,102,0.30)] transition-all duration-500 ease-out hover:pr-4 hover:shadow-[0_12px_40px_rgba(37,211,102,0.40)] active:scale-95"
        style={{ width: '56px', paddingLeft: '0' }}
      >
        {/* Glans overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)' }} />

        {/* Icoon */}
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.654 4.824 1.797 6.84L2 30l7.36-1.77A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.89-1.61l-.42-.25-4.37 1.05 1.08-4.26-.28-.44A11.56 11.56 0 0 1 4.4 16C4.4 9.596 9.596 4.4 16 4.4S27.6 9.596 27.6 16 22.404 27.6 16 27.6zm6.34-8.66c-.35-.175-2.06-1.016-2.38-1.132-.32-.116-.553-.175-.786.175s-.9 1.132-1.104 1.365c-.204.234-.407.262-.757.087-.35-.175-1.478-.545-2.814-1.737-1.04-.927-1.741-2.073-1.945-2.423-.204-.35-.022-.54.153-.714.157-.157.35-.408.525-.611.175-.204.233-.35.35-.582.116-.233.058-.437-.029-.611-.087-.175-.786-1.893-1.077-2.592-.284-.68-.572-.587-.786-.598l-.669-.012a1.284 1.284 0 0 0-.932.437c-.32.35-1.222 1.194-1.222 2.911s1.251 3.376 1.426 3.609c.175.234 2.462 3.76 5.965 5.271.834.36 1.485.575 1.992.736.837.266 1.599.228 2.201.138.672-.1 2.06-.842 2.35-1.656.292-.814.292-1.513.204-1.657-.087-.145-.32-.233-.669-.408z" />
          </svg>
        </span>

        {/* Tekst — schuift in bij hover */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.78rem] font-semibold text-white transition-all duration-500 ease-out group-hover:max-w-[120px]">
          App mij direct
        </span>
      </a>
    </div>
  )
}
