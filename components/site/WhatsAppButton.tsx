'use client'

import { siteConfig } from '@/config/site.config'
import { createWhatsAppHref } from '@/lib/utils'

export default function WhatsAppButton() {
  const whatsappHref = createWhatsAppHref(
    siteConfig.phone,
    'Hoi Daan, ik heb een vraag over mijn website of digitale systeem.'
  )

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/85 bg-[#25D366] shadow-[0_16px_40px_rgba(17,24,39,0.18)] transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 fill-white relative z-10"
        aria-hidden="true"
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.654 4.824 1.797 6.84L2 30l7.36-1.77A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.89-1.61l-.42-.25-4.37 1.05 1.08-4.26-.28-.44A11.56 11.56 0 0 1 4.4 16C4.4 9.596 9.596 4.4 16 4.4S27.6 9.596 27.6 16 22.404 27.6 16 27.6zm6.34-8.66c-.35-.175-2.06-1.016-2.38-1.132-.32-.116-.553-.175-.786.175s-.9 1.132-1.104 1.365c-.204.234-.407.262-.757.087-.35-.175-1.478-.545-2.814-1.737-1.04-.927-1.741-2.073-1.945-2.423-.204-.35-.022-.54.153-.714.157-.157.35-.408.525-.611.175-.204.233-.35.35-.582.116-.233.058-.437-.029-.611-.087-.175-.786-1.893-1.077-2.592-.284-.68-.572-.587-.786-.598l-.669-.012a1.284 1.284 0 0 0-.932.437c-.32.35-1.222 1.194-1.222 2.911s1.251 3.376 1.426 3.609c.175.234 2.462 3.76 5.965 5.271.834.36 1.485.575 1.992.736.837.266 1.599.228 2.201.138.672-.1 2.06-.842 2.35-1.656.292-.814.292-1.513.204-1.657-.087-.145-.32-.233-.669-.408z" />
      </svg>
    </a>
  )
}
