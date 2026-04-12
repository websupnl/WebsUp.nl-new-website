import Link from 'next/link'
import { Monitor, ShoppingCart, LayoutDashboard, Zap, CheckCircle, ArrowRight, LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  ShoppingCart,
  LayoutDashboard,
  Zap,
}

interface ServicesSectionProps {
  services?: typeof siteConfig.services
  title?: string
  subtitle?: string
}

export default function ServicesSection({
  services = siteConfig.services,
  title = 'Wat we bouwen',
  subtitle = 'Van simpele website tot complex systeem — wij bouwen wat jouw bedrijf nodig heeft.',
}: ServicesSectionProps) {
  return (
    <section id="diensten" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Diensten
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Zap
            return (
              <Reveal key={service.title} delay={index * 80}>
                <div
                  id={service.href.split('#')[1]}
                  className="group relative flex flex-col h-full border border-gray-100 rounded-2xl p-8 hover:border-blue-100 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                    <Icon size={22} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-8 flex-1">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <CheckCircle size={15} className="text-blue-500 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link"
                  >
                    Meer informatie
                    <ArrowRight size={15} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
