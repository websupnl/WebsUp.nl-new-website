'use client'

import { useEffect, useRef, useState } from 'react'

const WORDS = ['doorgroeien', 'automatiseren', 'opvallen', 'optimaliseren']

export default function HeroRotatingWord() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentWord = WORDS[wordIndex]
    const isComplete = displayText === currentWord
    const isEmpty = displayText.length === 0

    let delay = deleting ? 34 : 58
    if (isComplete && !deleting) delay = 1350
    if (isEmpty && deleting) delay = 240

    timeoutRef.current = setTimeout(() => {
      if (isComplete && !deleting) {
        setDeleting(true)
        return
      }

      if (isEmpty && deleting) {
        setDeleting(false)
        setWordIndex((idx) => (idx + 1) % WORDS.length)
        return
      }

      setDisplayText((text) => {
        if (deleting) return currentWord.slice(0, Math.max(0, text.length - 1))
        return currentWord.slice(0, text.length + 1)
      })
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [deleting, displayText, wordIndex])

  return (
    <span className="relative inline-flex min-w-[9.5ch] items-baseline">
      <span className="gradient-text">{displayText || '\u00a0'}</span>
      <span
        className="ml-[0.08em] inline-block h-[0.86em] w-[0.08em] translate-y-[0.08em] rounded-full"
        style={{
          background: 'linear-gradient(180deg, #f97316 0%, #ec4899 100%)',
          animation: 'hero-cursor-blink 0.92s step-end infinite',
        }}
      />
    </span>
  )
}
