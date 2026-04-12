import Reveal from '@/components/ui/Reveal'
import { MessageCircle, Eye, Wrench, CheckCircle } from 'lucide-react'

const pillars = [
  {
    Icon: MessageCircle,
    title: 'Eén aanspreekpunt — altijd',
    desc: 'Je praat direct met mij. Geen projectmanager ertussen, geen doorspelen naar collega\'s. Ik ben degene die luistert, denkt en bouwt.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    Icon: Eye,
    title: 'Eerlijk en transparant',
    desc: 'Geen vage offertes of verborgen kosten. Ik zeg wat ik kan maken, wat het kost en wanneer het klaar is. En als iets niet past, zeg ik dat ook gewoon.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
  },
  {
    Icon: Wrench,
    title: 'Technisch én praktisch',
    desc: 'Ik denk mee in systemen en processen, niet alleen in pagina\'s. Of het nu WordPress, Shopify of maatwerk is — ik kies wat het beste bij jou past.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
]

interface WhySectionProps {
  testimonials?: Array<{ name: string; role?: string; content: string }>
}

export default function WhySection({ testimonials = [] }: WhySectionProps) {
  const displayTestimonials = testimonials.length > 0
    ? testimonials.slice(0, 3).map((t, i) => ({
        num: `0${i + 1}`,
        quote: t.content,
        author: t.name,
        role: t.role ?? '',
        offset: i === 1,
      }))
    : [
        {
          num: '01',
          quote: 'Daan denkt verder dan een website. Hij keek meteen hoe hij ons hele systeem kon verbeteren. Dat verschil merk je.',
          author: 'Tevreden klant',
          role: 'Ondernemer',
          offset: false,
        },
        {
          num: '02',
          quote: 'Eindelijk iemand die gewoon eerlijk zegt wat mogelijk is en wat niet. Korte lijnen, snel resultaat.',
          author: 'Opdrachtgever',
          role: 'MKB eigenaar',
          offset: true,
        },
        {
          num: '03',
          quote: 'Na de lancering was Daan nog steeds bereikbaar. Niet via een ticket systeem, gewoon via WhatsApp.',
          author: 'Klant',
          role: 'Dienstverlener',
          offset: false,
        },
      ]

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 lg:gap-28 items-start">

        {/* Left — sticky: Daan als persoon */}
        <Reveal className="lg:sticky lg:top-32">
          <span className="overline-badge mb-6 inline-flex">Waarom WebsUp</span>

          {/* Persoonlijke intro */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-md" style={{ background: 'linear-gradient(135deg,#f97316,#ec4899,#a78bfa)' }}>
              D
            </div>
            <div>
              <div className="font-headline font-bold text-slate-900 text-lg">Daan Koolhaas</div>
              <div className="text-sm text-slate-400">Oprichter &amp; bouwer — WebsUp.nl</div>
            </div>
          </div>

          <h2 className="font-headline text-4xl md:text-[2.75rem] font-extrabold text-slate-900 mb-7 leading-[1.1] tracking-[-0.02em]">
            Geen groot bureau.<br />
            <span className="gradient-text">Gewoon Daan.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-10">
            Bij WebsUp werk je met mij — de persoon die jouw website ontwerpt, bouwt en live zet.
            Geen account managers, geen wachtrijen. Gewoon direct contact met degene die het werk doet.
          </p>

          <div className="space-y-5">
            {pillars.map(({ Icon, title, desc, color, bg, border }) => (
              <div key={title} className="flex gap-4 group">
                <div className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border transition-shadow group-hover:shadow-md ${bg} ${border}`}>
                  <Icon size={17} className={color} />
                </div>
                <div className="pt-0.5">
                  <h5 className="font-headline text-sm font-bold text-slate-900 mb-1">{title}</h5>
                  <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Werkwijze mini-stappen */}
          <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Zo werk ik</div>
            <div className="space-y-3">
              {[
                'Gratis kennismaking — bij jou of telefonisch',
                'Duidelijk voorstel zonder kleine lettertjes',
                'Bouwen met jouw feedback tussendoor',
                'Live — en bereikbaar daarna',
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-sm text-slate-600">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right — testimonial cards */}
        <div className="space-y-5">
          {displayTestimonials.map((t, i) => (
            <Reveal key={t.num} delay={i * 80}>
              <div
                className={`p-7 rounded-[1.25rem] border transition-all duration-300 hover:border-indigo-100 hover:shadow-lg ${
                  t.offset ? 'lg:translate-x-8 bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'
                }`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, k) => (
                    <div key={k} className="w-3.5 h-3.5 rounded-sm bg-amber-400" />
                  ))}
                </div>

                <p className={`text-base leading-relaxed mb-6 ${t.offset ? 'text-indigo-900' : 'text-slate-700'}`}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/60">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: 'linear-gradient(135deg,#f97316,#ec4899)' }}>
                    {t.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{t.author}</div>
                    {t.role && <div className="text-slate-400 text-xs">{t.role}</div>}
                  </div>
                  <div className="ml-auto">
                    <CheckCircle size={16} className="text-emerald-400" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Vertrouwens-signal */}
          <Reveal delay={240}>
            <div className="p-6 bg-slate-900 text-white rounded-[1.25rem]">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">Direct bereikbaar</div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Niet via een ticketsysteem of e-mail die pas na 3 dagen beantwoord wordt.
                Gewoon even appen of bellen met Daan.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                Beschikbaar via WhatsApp · {new Date().getFullYear()}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
