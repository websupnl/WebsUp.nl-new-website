'use client'

import Reveal from '@/components/ui/Reveal'

const clients = [
  { name: 'BP Uitgevers', role: 'Media' },
  { name: 'Weso', role: 'SaaS' },
  { name: 'Thuisbatterijen Friesland', role: 'Energy' },
  { name: 'Bouma Installaties', role: 'Tech' },
  { name: 'OtterMedia', role: 'Digital' },
]

// Duplicate list for seamless loop
const marqueeItems = [...clients, ...clients]

export default function TrustStrip() {
  return (
    <div className="relative bg-white border-b border-slate-100 py-12 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

      <Reveal className="text-center mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.12em]">
          Vertrouwd door
        </p>
      </Reveal>

      {/* Scrolling row */}
      <div className="flex overflow-hidden">
        <div className="flex items-center gap-14 marquee-track" style={{ width: 'max-content' }}>
          {marqueeItems.map((client, i) => (
            <div key={`${client.name}-${i}`} className="flex items-center gap-3 shrink-0">
              {/* Abstract logo placeholder */}
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-200 to-violet-200 opacity-60" />
              <span className="text-sm font-bold font-headline tracking-tight text-slate-800 opacity-35 whitespace-nowrap">
                {client.name}
              </span>
              <span className="text-[0.6rem] font-semibold text-slate-400 uppercase tracking-wider opacity-0 group-hover:opacity-100">
                {client.role}
              </span>
              {/* Divider */}
              {i < marqueeItems.length - 1 && (
                <div className="w-px h-4 bg-slate-200 ml-4 opacity-40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
