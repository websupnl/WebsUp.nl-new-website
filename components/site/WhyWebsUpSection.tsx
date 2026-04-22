import { User, Code2, TrendingUp, Layers, LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'
import GradientIcon from '@/components/site/GradientIcon'

const iconMap: Record<string, LucideIcon> = {
  User,
  Code2,
  TrendingUp,
  Layers,
}

interface WhyWebsUpSectionProps {
  data?: typeof siteConfig.whyWebsUp
}

export default function WhyWebsUpSection({
  data = siteConfig.whyWebsUp,
}: WhyWebsUpSectionProps) {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — tekst */}
          <Reveal>
            <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              {data.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {data.heading}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              {data.subheading}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { value: '5+', label: 'Tevreden klanten' },
                { value: '100%', label: 'Maatwerk code' },
                { value: 'Next.js', label: 'Tech stack' },
                { value: '1 aanspreekpunt', label: 'Altijd direct contact' },
              ].map((stat) => (
                <div key={stat.label} className="border border-gray-200 rounded-xl p-4 bg-white">
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right — voordelen */}
          <div className="grid grid-cols-1 gap-4">
            {data.items.map((item, index) => {
              const Icon = iconMap[item.icon] ?? User
              return (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all duration-300">
                    <GradientIcon icon={Icon} size="sm" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
