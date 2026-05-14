'use client'

import { useEffect, useRef, useState } from 'react'

// Debug: type de typo, cursor verschijnt, selecteert, herstelt
const TYPO  = 'doorgroeein'   // dubbele e als subtiele type-fout
const FIXED = 'doorgroeien'

// Daarna normale rotatie
const WORDS = ['doorgroeien', 'automatiseren', 'opvallen', 'optimaliseren']

const TYPE = 68
const DEL  = 30
const WAIT = 1950

// SVG mouse cursor (standaard pijltje)
const CursorSVG = () => (
  <svg
    width="14" height="21"
    viewBox="0 0 14 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L1 17L4.5 13L7 19.5L9 18.5L6.5 12H12L1 1Z"
      fill="white"
      stroke="rgba(0,0,0,0.55)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
)

export default function HeroRotatingWord() {
  const [text,        setText]        = useState('')
  const [isGradient,  setIsGradient]  = useState(false)
  const [showCursor,  setShowCursor]  = useState(false)
  const [showSel,     setShowSel]     = useState(false)
  const [showLabel,   setShowLabel]   = useState(false)
  const [cursorFade,  setCursorFade]  = useState(false)
  const timer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const s = (fn: () => void, ms: number) => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(fn, ms)
    }

    // ── Normale rotatie ──────────────────────────────────
    let wi = 0, ci = FIXED.length, del = false
    const normal = () => {
      const w = WORDS[wi]
      if (!del) {
        if (ci < w.length) {
          ci++; setText(w.slice(0, ci))
          s(normal, TYPE + Math.random() * 20)
        } else { del = true; s(normal, WAIT) }
      } else {
        if (ci > 0) {
          ci--; setText(w.slice(0, ci))
          s(normal, DEL)
        } else {
          del = false
          wi = (wi + 1) % WORDS.length
          s(normal, 110)
        }
      }
    }

    // ── Debug: fix fase ──────────────────────────────────
    let fi = 0
    const typeFix = () => {
      fi++; setText(FIXED.slice(0, fi))
      if (fi < FIXED.length) {
        s(typeFix, TYPE - 12)
      } else {
        s(() => {
          setCursorFade(true)
          s(() => {
            setShowCursor(false); setCursorFade(false)
            s(normal, 350)
          }, 420)
        }, 800)
      }
    }

    // ── Debug: selectie fase (cursor in beeld) ───────────
    const doSelect = () => {
      // Cursor verschijnt eerst
      setShowCursor(true)
      s(() => {
        // Dan selectie + label
        setShowSel(true); setShowLabel(true)
        s(() => {
          setShowSel(false); setShowLabel(false)
          setShowCursor(false)
          setText(''); setIsGradient(true); fi = 0
          s(typeFix, 70)
        }, 900)
      }, 260)
    }

    // ── Debug: type de typo ──────────────────────────────
    let ti = 0
    const typeTypo = () => {
      ti++; setText(TYPO.slice(0, ti))
      if (ti < TYPO.length) {
        s(typeTypo, TYPE + Math.random() * 28)
      } else {
        s(doSelect, 720)
      }
    }

    s(typeTypo, 600)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  return (
    <span className="relative inline-flex items-baseline">
      <span className="relative inline-block">
        {/* Tekst */}
        <span className={isGradient ? 'gradient-text' : ''}>{text}</span>

        {/* Gradient selectie overlay */}
        <span
          className="pointer-events-none absolute inset-y-0 left-0 right-0 rounded-[3px] transition-opacity duration-150"
          style={{
            background: 'linear-gradient(90deg, rgba(249,115,22,0.38), rgba(236,72,153,0.25))',
            opacity: showSel ? 1 : 0,
          }}
        />

        {/* "even fixen..." label */}
        <span
          className="pointer-events-none absolute left-0 whitespace-nowrap font-mono text-[0.48rem] tracking-widest transition-all duration-200"
          style={{
            top: '-1.8em',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            padding: '2px 7px',
            borderRadius: '4px',
            color: 'rgba(255,255,255,0.42)',
            opacity: showLabel ? 1 : 0,
            transform: showLabel ? 'translateY(0)' : 'translateY(4px)',
          }}
        >
          even fixen...
        </span>

        {/* Mouse cursor */}
        <span
          className="pointer-events-none absolute transition-all duration-300"
          style={{
            bottom: '-0.05em',
            left: '62%',
            opacity: showCursor ? (cursorFade ? 0 : 1) : 0,
            transform: showCursor ? 'translate(0, 0)' : 'translate(10px, -6px)',
            transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
            zIndex: 10,
          }}
        >
          <CursorSVG />
        </span>
      </span>

      {/* Knipperende cursor */}
      <span
        className="hero-cursor ml-[2px] inline-block w-[0.1em] rounded-[1px] align-middle"
        style={{
          height: '0.82em',
          background: 'linear-gradient(180deg, #f97316 0%, #ec4899 100%)',
          opacity: cursorFade ? 0 : undefined,
          transition: cursorFade ? 'opacity 0.42s ease' : undefined,
        }}
      />
    </span>
  )
}
