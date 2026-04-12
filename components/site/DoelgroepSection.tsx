import { siteConfig } from '@/config/site.config'
import { Target, Users, TrendingUp, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = { Target, Users, TrendingUp }

interface DoelgroepSectionProps {
  heading?: string
  subheading?: string
  blocks?: typeof siteConfig.doelgroep.blocks
}

export default function DoelgroepSection({
  heading = siteConfig.doelgroep.heading,
  subheading = siteConfig.doelgroep.subheading,
  blocks = siteConfig.doelgroep.blocks,
}: DoelgroepSectionProps) {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full">
            Adverteren
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{heading}</h2>
          {subheading && (
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">{subheading}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blocks.map((block, i) => {
            const Icon = iconMap[block.icon] ?? Target
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md transition-all hover:-translate-y-0.5 text-center"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{block.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{block.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
