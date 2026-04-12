import Link from 'next/link'
import { Building2, Landmark, Users, Network, ArrowRight } from 'lucide-react'

const doelgroepen = [
  {
    icon: Building2,
    title: 'Bedrijven',
    desc: 'Van MKB tot corporate — vergroot uw zichtbaarheid en positioneer uw organisatie als kennisleider in uw sector.',
  },
  {
    icon: Landmark,
    title: 'Organisaties',
    desc: 'Brancheorganisaties en non-profits die hun leden willen informeren en hun impact willen vergroten.',
  },
  {
    icon: Users,
    title: 'Verenigingen',
    desc: 'Verenigingen die hun leden professioneel willen bereiken met relevante vakinhoud en nieuws.',
  },
  {
    icon: Network,
    title: 'Netwerken',
    desc: 'Zakelijke netwerken die waarde willen bieden aan hun achterban via kwalitatieve publicaties.',
  },
]

export default function VoorWieSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full">
            Doelgroep
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Voor wie is dit?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Business Publicatie Uitgevers werkt met organisaties die zichtbaar willen zijn, kennis willen delen en autoriteit willen opbouwen.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {doelgroepen.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-gray-50 hover:bg-blue-600 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
            >
              <div className="w-12 h-12 bg-white group-hover:bg-blue-500 rounded-xl flex items-center justify-center mb-4 transition-colors shadow-sm">
                <Icon size={22} className="text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-white text-lg mb-2 transition-colors">
                {title}
              </h3>
              <p className="text-gray-500 group-hover:text-blue-100 text-sm leading-relaxed transition-colors">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/magazine-voor-organisaties"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Meer over publiceren voor uw organisatie
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
