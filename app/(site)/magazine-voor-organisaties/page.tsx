import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight, Building2, Landmark, Users, Network, Target, TrendingUp, Eye, BookOpen } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Magazine voor organisaties',
  description: 'Vergroot de zichtbaarheid van uw organisatie met een professioneel magazine. Bereik uw doelgroep, versterk uw autoriteit en bouw aan uw merk.',
}

const voordelen = [
  'Professionele uitstraling voor uw organisatie',
  'Bereik uw leden, klanten en stakeholders',
  'Positioneer uzelf als autoriteit in uw sector',
  'Volledige redactionele en grafische begeleiding',
  'Digitale én print versie beschikbaar',
  'Meetbaar resultaat en bereikrapportage',
]

const doelgroepen = [
  { icon: Building2, label: 'Bedrijven & MKB' },
  { icon: Landmark, label: 'Brancheorganisaties' },
  { icon: Users, label: 'Verenigingen' },
  { icon: Network, label: 'Zakelijke netwerken' },
]

const stappen = [
  {
    nr: '01',
    title: 'Intake gesprek',
    desc: 'We bespreken uw doelen, doelgroep en gewenste inhoud. Volledig vrijblijvend.',
  },
  {
    nr: '02',
    title: 'Concept & opzet',
    desc: 'Ons team ontwikkelt een aanpak op maat: format, thema\'s en distributieplan.',
  },
  {
    nr: '03',
    title: 'Redactie & productie',
    desc: 'Wij verzorgen de teksten, vormgeving en eindredactie. U behoudt controle.',
  },
  {
    nr: '04',
    title: 'Publicatie & verspreiding',
    desc: 'Uw magazine bereikt uw doelgroep: digitaal, via e-mail of in print.',
  },
]

export default function MagazineVoorOrganisatiesPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gray-900 text-white py-24 lg:py-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt="Magazine voor organisaties"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/30" />
        <Reveal className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
            Voor organisaties
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Zichtbaar in business, met uw eigen magazine
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl leading-relaxed mb-8">
            Een professioneel magazine positioneert uw organisatie als dé autoriteit in uw sector. Wij verzorgen alles, van concept tot distributie.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all hover:shadow-lg"
            >
              Plan een vrijblijvend gesprek
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/publicaties"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full transition-all"
            >
              Bekijk voorbeelden
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Stats balk */}
      <div className="bg-blue-600 py-8">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, value: '500+', label: 'Publicaties verzorgd' },
              { icon: Users, value: '1.200+', label: 'Lezers per editie' },
              { icon: TrendingUp, value: '15+', label: 'Jaar ervaring' },
              { icon: Target, value: '100%', label: 'Zakelijke doelgroep' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white leading-none">{value}</div>
                  <div className="text-blue-200 text-xs mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Wat levert het op */}
      <section className="bg-white py-16 lg:py-24">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full">
                Waarom een magazine?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Meer dan een publicatie: een strategisch instrument
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Een eigen magazine versterkt uw merk, vergroot uw bereik en bouwt vertrouwen bij uw doelgroep. Het is de meest effectieve manier om complexe kennis toegankelijk te maken.
              </p>
              <ul className="space-y-3 mb-8">
                {voordelen.map((v) => (
                  <li key={v} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{v}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-sm transition-all hover:shadow-md"
              >
                Neem contact op
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Eye, value: '1.200+', label: 'Bereik per editie', color: 'bg-blue-50 text-blue-600' },
                { icon: Target, value: '100%', label: 'Zakelijke doelgroep', color: 'bg-indigo-50 text-indigo-600' },
                { icon: TrendingUp, value: '15+', label: 'Jaar ervaring', color: 'bg-purple-50 text-purple-600' },
                { icon: CheckCircle, value: '500+', label: 'Publicaties verzorgd', color: 'bg-green-50 text-green-600' },
              ].map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={22} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Voor wie */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Geschikt voor elke organisatievorm
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Of u nu een bedrijf, vereniging of netwerk bent: wij hebben de expertise om uw verhaal professioneel te vertellen.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {doelgroepen.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Stappenplan */}
      <section className="bg-white py-16 lg:py-24">
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full">
              Hoe werkt het?
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Van idee tot publicatie</h2>
          </div>
          <div className="space-y-6">
            {stappen.map((stap) => (
              <div key={stap.nr} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{stap.nr}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{stap.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{stap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Klaar om zichtbaar te worden?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Plan vandaag nog een vrijblijvend gesprek. Wij denken graag met u mee over de mogelijkheden.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all hover:shadow-lg"
            >
              Plan een gesprek
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
