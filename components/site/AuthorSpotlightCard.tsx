import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

interface AuthorSpotlightCardProps {
  className?: string
  compact?: boolean
}

export default function AuthorSpotlightCard({ className, compact = false }: AuthorSpotlightCardProps) {
  return (
    <div className={cn('group/card w-full', compact ? 'max-w-3xl' : 'max-w-xs', className)}>
      <div
        className={cn(
          'card backgroundImage relative flex overflow-hidden rounded-[1.5rem] bg-[url("/Daan%20Koolhaas.jpg")] bg-cover bg-center shadow-xl',
          compact ? 'min-h-[18rem] flex-col justify-end p-6 sm:min-h-[15rem]' : 'h-96 flex-col justify-between p-5'
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/92 via-[#06040c]/42 to-[#06040c]/8 transition duration-300 group-hover/card:from-[#06040c]/96" />

        <div className="relative z-10 flex items-center gap-3">
          <img
            height="100"
            width="100"
            alt="Daan Koolhaas"
            src="/Daan Koolhaas.jpg"
            className="h-11 w-11 rounded-full border-2 border-white/70 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-white">Daan Koolhaas</p>
            <p className="text-xs text-white/58">Websites, apps en automatisering</p>
          </div>
        </div>

        <div className="relative z-10 mt-12">
          <h2 className={cn('font-headline font-bold leading-tight text-white', compact ? 'text-2xl md:text-3xl' : 'text-2xl')}>
            Praktisch advies, direct uit de bouwpraktijk
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/68">
            Ik schrijf over keuzes die ik vaak met klanten bespreek: wat maakt een site duidelijker, sneller of slimmer gekoppeld aan je proces?
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-200 transition-colors hover:text-white"
          >
            Stel je vraag
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
