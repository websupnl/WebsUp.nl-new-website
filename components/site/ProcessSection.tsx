import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'

interface ProcessSectionProps {
  data?: typeof siteConfig.process
}

export default function ProcessSection({ data = siteConfig.process }: ProcessSectionProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Werkwijze
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{data.heading}</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">{data.subheading}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Verbindingslijn (desktop) */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

          {data.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 100}>
              <div className="relative flex flex-col items-center text-center p-6">
                {/* Nummer cirkel */}
                <div className="relative w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-600/20">
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
