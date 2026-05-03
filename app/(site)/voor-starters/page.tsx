import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, X, Sparkles, Layers, ShieldCheck } from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import { GlassCard } from '@/components/site/GlassCard'

export const metadata: Metadata = {
  title: 'Voor starters',
  description:
    'Serieus starten met een solide digitale basis. Compact maar professioneel, zonder dat je over een half jaar opnieuw moet bouwen.',
}

const forYouIf = [
  'Je een concreet plan hebt maar nog geen website, webshop of digitale aanwezigheid',
  'Je begrijpt dat goedkoop nu duur kan zijn later',
  'Je serieus wil starten en niet elke zes maanden alles opnieuw wil bouwen',
  'Je iemand wil die eerlijk advies geeft over wat je nu nodig hebt, en wat niet',
]

const youGet = [
  'Een professionele website of webshop die past bij je plan en je doelgroep',
  'Duidelijke structuur die later uitbreidbaar is',
  'Basis SEO en technische fundering',
  'Eerlijk advies over wat nu slim is en wat later kan',
]

const iDont = [
  "Standaard thema's over je bedrijf heen plakken",
  'Functies verkopen die je nu niet nodig hebt',
  'Een traject groter maken dan het moet zijn',
]

const steps = [
  { title: 'We beginnen met een gesprek', text: 'Ik wil begrijpen wat je gaat doen, voor wie en wat je website of webshop voor je moet doen.' },
  { title: 'Eerlijk voorstel', text: 'Je krijgt een voorstel dat past bij je fase. Niet te groot, niet te klein. Met duidelijke prijs en planning.' },
  { title: 'We bouwen het samen', text: 'Met jouw input en mijn technische kennis bouwen we iets dat nu goed werkt en later verder kan meegroeien.' },
  { title: 'Na oplevering', text: 'Je staat er niet alleen voor. Als je later wil uitbreiden, is de basis er al.' },
]

export default function VoorStartersPage() {
  return (
    <div>
      <WavePageHeader
        badge="Voor starters"
        title="Serieus starten met"
        titleHighlight="een solide digitale basis."
        subtitle="Sta je aan het begin van een bedrijf of concept? Dan hoeft niet alles groot, maar het moet wel kloppen. Ik help starters die bewust willen beginnen en snappen dat een goede basis later veel gedoe voorkomt."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn-brand-gradient">
            Plan een kennismaking
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/gratis-ontwerp"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20"
          >
            Vraag gratis ontwerp aan
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, label: 'Alleen voor serieuze plannen', color: 'text-orange-400' },
            { icon: Sparkles, label: 'Compact maar professioneel', color: 'text-accent-400' },
            { icon: Layers, label: 'Doorgroeien zonder opnieuw beginnen', color: 'text-violet-300' },
          ].map(({ icon: Icon, label, color }) => (
            <GlassCard key={label} padding="px-4 py-3" className="flex items-center gap-2.5">
              <Icon size={16} className={`flex-shrink-0 ${color}`} />
              <span className="text-sm text-white/85 font-medium">{label}</span>
            </GlassCard>
          ))}
        </div>
      </WavePageHeader>

      {/* Voor wie */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">Voor wie</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Niet voor iedereen. Wel voor jou als…
            </h2>

            <ul className="mt-8 space-y-4">
              {forYouIf.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
                  <ArrowRight size={18} className="mt-1 flex-shrink-0 text-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-lg leading-relaxed text-slate-600">
              Dit is geen kortingsactie voor goedkope sites. Het is een bewuste instap voor plannen met potentie.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Wat ik bied */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">Wat ik bied</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Compact maar niet goedkoop ogend
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Een starterstraject bij WebsUp is geen afgeslankte versie van iets groters. Het is een bewust compacte aanpak die nu het juiste neerzet en later ruimte laat om door te bouwen.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="font-headline text-xl font-bold text-slate-900">Wat je krijgt</h3>
              <div className="mt-5 space-y-3">
                {youGet.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                    <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold text-slate-900">Wat ik niet doe</h3>
              <div className="mt-5 space-y-3">
                {iDont.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <X size={16} className="mt-0.5 flex-shrink-0 text-slate-400" />
                    <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">Werkwijze</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Hoe het werkt voor starters
            </h2>
          </Reveal>

          <ol className="space-y-7">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <li className="flex items-start gap-5">
                  <span className="font-headline brand-gradient-ring flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-bold text-accent-600">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-headline text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        heading="Klaar om serieus te starten?"
        subheading="Plan een vrijblijvend gesprek. Ik kijk eerlijk mee naar jouw situatie en vertel je wat slim is als eerste stap."
      />
    </div>
  )
}
