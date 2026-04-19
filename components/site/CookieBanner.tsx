'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!localStorage.getItem('cookie-consent')) {
        setVisible(true)
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-[#06040c] px-5 py-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.24)] sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-white/70">
          WebsUp gebruikt functionele cookies voor een goed werkende website en beperkte analytics om te zien wat beter kan.
          Meer weten? Lees het{' '}
          <Link href="/cookies" className="font-semibold text-white underline underline-offset-4 transition-colors hover:text-orange-300">
            cookiebeleid
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={decline}
            className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
          >
            Weigeren
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  )
}
