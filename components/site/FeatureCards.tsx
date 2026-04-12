import { siteConfig } from '@/config/site.config'
import {
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Globe,
  LayoutDashboard,
  Zap,
  LucideIcon,
} from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const iconMap: Record<string, LucideIcon> = {
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Globe,
  LayoutDashboard,
  Zap,
}

interface FeatureCardsProps {
  features?: typeof siteConfig.features
  variant?: 'light' | 'dark'
}

export default function FeatureCards({
  features = siteConfig.features,
  variant = 'dark',
}: FeatureCardsProps) {
  if (variant === 'dark') {
    return (
      <section className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] ?? CheckCircle
              return (
                <Reveal key={feature.title} delay={index * 90}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-transform duration-300 hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <Icon size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? CheckCircle
            return (
              <Reveal key={feature.title} delay={index * 90}>
                <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Icon size={22} className="text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
