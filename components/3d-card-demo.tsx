'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'

export default function ThreeDCardDemo() {
  return (
    <CardContainer containerClassName="w-full">
      <CardBody className="group/card relative w-full max-w-[30rem] overflow-hidden rounded-[1.75rem] border border-purple-100 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
        <CardItem translateZ="24" className="absolute left-5 top-5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
          Websites op maat
        </CardItem>

        <CardItem translateZ="40" className="relative h-64 w-full">
          <Image
            src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80"
            alt="WebsUp demo kaart"
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 480px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        </CardItem>

        <div className="space-y-5 p-6">
          <CardItem translateZ="44" as="h3" className="font-headline text-2xl font-bold text-slate-900">
            Meer diepte, zonder onrust.
          </CardItem>

          <CardItem
            translateZ="52"
            as="p"
            className="max-w-md text-sm leading-relaxed text-slate-500"
          >
            Een branded 3D-hover effect dat de kaart premium laat aanvoelen, zonder van de inhoud een gimmick te maken.
          </CardItem>

          <div className="flex items-center justify-between">
            <CardItem
              translateZ="36"
              as={Link}
              href="/diensten"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-purple-600"
            >
              Bekijk diensten <ArrowRight size={14} />
            </CardItem>

            <CardItem
              translateZ="48"
              className="rounded-full px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/20"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
            >
              WebsUp
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  )
}
