'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { Check, Cookie, X } from 'lucide-react'

type CookieConsent = 'accepted' | 'declined'

const CONSENT_KEY = 'cookie-consent'

function readStoredConsent(): CookieConsent | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY)
    return stored === 'accepted' || stored === 'declined' ? stored : null
  } catch {
    return null
  }
}

function writeStoredConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent)
  } catch {
    // If storage is unavailable, the in-memory state still controls this visit.
  }
}

function getValidAnalyticsId(id?: string | null) {
  const value = id?.trim()
  return value && /^G-[A-Z0-9]+$/i.test(value) ? value : null
}

function GoogleAnalyticsScripts({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id={`gtag-init-${measurementId}`} strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}

export default function CookieBanner({ analyticsId }: { analyticsId?: string | null }) {
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [consent, setConsent] = useState<CookieConsent | null>(null)

  const measurementId = getValidAnalyticsId(analyticsId)

  useEffect(() => {
    const storedConsent = readStoredConsent()
    setConsent(storedConsent)
    setVisible(storedConsent === null)
    setReady(true)
  }, [])

  const accept = () => {
    writeStoredConsent('accepted')
    setConsent('accepted')
    setVisible(false)
  }

  const decline = () => {
    writeStoredConsent('declined')
    setConsent('declined')
    setVisible(false)
  }

  if (!ready) return null

  return (
    <>
      {consent === 'accepted' && measurementId ? (
        <GoogleAnalyticsScripts measurementId={measurementId} />
      ) : null}

      {visible ? (
        <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-6" role="region" aria-label="Cookie melding">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-[#06040c] text-white shadow-2xl shadow-slate-950/30">
            <div className="h-1 bg-[linear-gradient(135deg,#f97316_0%,#ec4899_50%,#a78bfa_100%)]" />
            <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <div className="flex min-w-0 flex-1 gap-3">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-orange-500/20 bg-orange-500/10 text-orange-500">
                  <Cookie size={19} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-headline text-sm font-bold text-white">
                    Cookies op <span className="gradient-text">WebsUp.nl</span>
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    We gebruiken noodzakelijke cookies voor de site. Analytische cookies plaatsen we alleen na toestemming.{' '}
                    <Link href="/cookies" className="font-semibold text-white underline decoration-orange-500/70 underline-offset-4 transition-colors hover:text-orange-500">
                      Cookiebeleid
                    </Link>
                  </p>
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-shrink-0">
                <button
                  type="button"
                  onClick={decline}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-orange-500/40 hover:text-white"
                >
                  <X size={16} aria-hidden="true" />
                  Weigeren
                </button>
                <button
                  type="button"
                  onClick={accept}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  <Check size={16} aria-hidden="true" />
                  Accepteren
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
