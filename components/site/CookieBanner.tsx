'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setVisible(true)
    }
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
      <div className="max-w-3xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-300 flex-1">
          Wij gebruiken cookies voor een goede werking van de website en om uw ervaring te verbeteren.{' '}
          <Link href="/cookies" className="underline hover:text-white transition-colors">
            Meer informatie
          </Link>
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-xl transition-colors"
          >
            Weigeren
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-semibold bg-white text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  )
}
