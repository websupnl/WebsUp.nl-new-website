'use client'

import { useEffect, useRef, useState } from 'react'

// Typo: "doorgroeein" — double e, clearly wrong
const TYPO  = 'doorgroeein'
const FIXED = 'doorgroeien'

const WORDS = ['doorgroeien', 'automatiseren', 'opvallen', 'optimaliseren']

const TYPE = 72
const DEL  = 32
const WAIT = 2200

// Larger arrow cursor SVG
const CursorSVG = () => (
  <svg
    width="20" height="30"
    viewBox="0 0 14 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L1 17L4.5 13L7 19.5L9 18.5L6.5 12H12L1 1Z"
      fill="white"
      stroke="rgba(0,0,0,0.65)"
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
  const [showSquiggle,setShowSquiggle]= useState(false)
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
          s(normal, TYPE + Math.random() * 24)
        } else { del = true; s(normal, WAIT) }
      } else {
        if (ci > 0) {
          ci--; setText(w.slice(0, ci))
          s(normal, DEL)
        } else {
          del = false
          wi = (wi + 1) % WORDS.length
          s(normal, 120)
        }
      }
    }

    // ── Fix fase: herstelt de typfout ────────────────────
    let fi = 0
    const typeFix = () => {
      fi++; setText(FIXED.slice(0, fi))
      if (fi < FIXED.length) {
        s(typeFix, TYPE - 10)
      } else {
        s(() => {
          setCursorFade(true)
          s(() => {
            setShowCursor(false); setCursorFade(false)
            s(normal, 400)
          }, 480)
        }, 900)
      }
    }

    // ── Select + fix fase ────────────────────────────────
    const doSelect = () => {
      setShowSquiggle(false)
      setShowCursor(true)
      s(() => {
        setShowSel(true); setShowLabel(true)
        s(() => {
          setShowSel(false); setShowLabel(false)
          setShowCursor(false)
          setText(''); setIsGradient(true); fi = 0
          s(typeFix, 80)
        }, 1100)
      }, 300)
    }

    // ── Type de typo (fout woord) ────────────────────────
    let ti = 0
    const typeTypo = () => {
      ti++; setText(TYPO.slice(0, ti))
      if (ti < TYPO.length) {
        s(typeTypo, TYPE + Math.random() * 30)
      } else {
        // Squiggle verschijnt even, dan cursor
        setShowSquiggle(true)
        s(doSelect, 900)
      }
    }

    s(typeTypo, 700)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  return (
    <span className="relative inline-flex items-baseline">
      <span className="relative inline-block">
        {/* Tekst */}
        <span className={isGradient ? 'gradient-text' : ''}>{text}</span>

        {/* Rode squiggle onderstreping bij typfout */}
        {showSquiggle && (
          <span
            className="pointer-events-none absolute bottom-[-4px] left-0 right-0"
            style={{
              height: '3px',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='3'%3E%3Cpath d='M0 2.5 Q2 0.5 4 2.5 Q6 4.5 8 2.5' stroke='%23ef4444' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: '8px 3px',
              opacity: 0.9,
            }}
          />
        )}

        {/* Gradient selectie overlay — brighter */}
        <span
          className="pointer-events-none absolute inset-y-0 left-0 right-0 rounded-[3px] transition-opacity duration-150"
          style={{
            background: 'linear-gradient(90deg, rgba(249,115,22,0.52), rgba(236,72,153,0.34))',
            opacity: showSel ? 1 : 0,
          }}
        />

        {/* "even fixen..." label */}
        <span
          className="pointer-events-none absolute left-0 whitespace-nowrap font-mono text-[0.5rem] tracking-widest transition-all duration-200"
          style={{
            top: '-2em',
            background: 'rgba(249,115,22,0.10)',
            border: '1px solid rgba(249,115,22,0.22)',
            padding: '2px 8px',
            borderRadius: '4px',
            color: 'rgba(255,255,255,0.62)',
            opacity: showLabel ? 1 : 0,
            transform: showLabel ? 'translateY(0)' : 'translateY(5px)',
          }}
        >
          even fixen...
        </span>

        {/* Mouse cursor — groter */}
        <span
          className="pointer-events-none absolute transition-all duration-350"
          style={{
            bottom: '-0.12em',
            left: '60%',
            opacity: showCursor ? (cursorFade ? 0 : 1) : 0,
            transform: showCursor ? 'translate(0, 0)' : 'translate(14px, -8px)',
            transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
            transitionDuration: '350ms',
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
          transition: cursorFade ? 'opacity 0.48s ease' : undefined,
        }}
      />
    </span>
  )
}
