import Link from 'next/link'
import { ArrowRight, Globe, LayoutDashboard, Tv2, Wrench, ShoppingCart, Workflow } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const cases = [
  {
    id: 'webshop',
    title: 'Webshops die verkopen',
    description: 'WordPress WooCommerce, Shopify of maatwerk — met iDEAL, Mollie en slimme orderverwerking.',
    col: 'md:col-span-7',
    dark: false,
    icon: ShoppingCart,
    accent: 'from-orange-400 to-pink-500',
    visual: (
      <div className="mt-6 space-y-2">
        {/* Product card mock */}
        <div className="bg-white rounded-xl border border-slate-100 p-3 flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform duration-300">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="h-2 w-3/4 bg-slate-200 rounded-full mb-1.5" />
            <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
          </div>
          <div className="text-sm font-bold text-indigo-600">€129</div>
        </div>
        {/* Checkout progress */}
        <div className="bg-indigo-600 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <ShoppingCart size={13} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-white rounded-full" />
            </div>
          </div>
          <div className="text-[0.6rem] text-white font-bold">75%</div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          {[{v:'3.2%', l:'Conv. rate'},{v:'€48k', l:'Maand omzet'}].map((s) => (
            <div key={s.l} className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
              <div className="font-bold text-sm text-slate-800">{s.v}</div>
              <div className="text-[0.58rem] text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    href: '/diensten/webshops',
  },
  {
    id: 'dashboard',
    title: 'Klantdashboards',
    description: 'Geef klanten 24/7 inzicht in hun projecten en data.',
    col: 'md:col-span-5',
    dark: true,
    icon: LayoutDashboard,
    accent: 'from-pink-500 to-violet-500',
    visual: (
      <div className="mt-6 bg-white/5 rounded-xl p-4 space-y-3 border border-white/8">
        <div className="flex items-center justify-between">
          <div className="h-2 w-20 bg-white/20 rounded-full" />
          <div className="flex gap-1">
            {['■', '■', '■'].map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-sm ${i < 2 ? 'bg-indigo-400' : 'bg-white/15'}`} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="aspect-[4/3] bg-gradient-to-br from-indigo-600/30 to-violet-600/30 rounded-lg border border-white/8" />
          <div className="space-y-2">
            {[100, 70, 85].map((w, i) => (
              <div key={i} className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400/60 rounded-full" style={{width:`${w}%`}} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <div className="h-1.5 w-24 bg-white/15 rounded-full" />
        </div>
      </div>
    ),
    href: '/diensten/apps-dashboards',
  },
  {
    id: 'narrowcasting',
    title: 'Narrowcasting',
    description: 'Beheer al je fysieke schermen centraal vanuit de cloud.',
    col: 'md:col-span-5',
    dark: true,
    icon: Tv2,
    accent: 'from-slate-700 to-slate-900',
    visual: (
      <div className="mt-6 relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-white/8">
        {/* Scan lines effect */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 4px)'}} />
        {/* Screen content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/60 flex items-center justify-center">
            <Tv2 size={16} className="text-white" />
          </div>
          <div className="h-1.5 w-16 bg-white/20 rounded-full" />
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[0.55rem] text-slate-400 uppercase tracking-widest">Live</span>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-black/60 to-transparent flex items-center px-2.5 gap-1">
          <div className="h-1 w-8 bg-indigo-400/60 rounded-full" />
          <div className="h-1 flex-1 bg-white/10 rounded-full" />
        </div>
      </div>
    ),
    href: '/diensten/apps-dashboards',
  },
  {
    id: 'automatisering',
    title: 'Workflow Automatisering',
    description: 'Koppel je tools aan elkaar. Ik elimineer het handmatige werk dat jou tijd kost.',
    col: 'md:col-span-7',
    dark: false,
    icon: Workflow,
    accent: 'from-orange-400 to-pink-500',
    visual: (
      <div className="mt-5 grid grid-cols-4 gap-2">
        {/* Node connections */}
        {[
          { label: 'CRM', active: true, color: 'bg-indigo-100 text-indigo-600 border-indigo-200' },
          { label: 'n8n', active: true, color: 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-transparent', bold: true },
          { label: 'Email', active: true, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
          { label: 'Slack', active: false, color: 'bg-slate-50 text-slate-400 border-slate-100' },
        ].map((node) => (
          <div key={node.label} className={`aspect-square rounded-2xl flex items-center justify-center text-xs font-bold border ${node.color} shadow-sm`}>
            {node.label}
          </div>
        ))}
        {/* Flow steps */}
        {['Lead binnengehaald', 'Automatisch verwerkt', 'Mail verstuurd'].map((step, i) => (
          <div key={step} className="col-span-4 flex items-center gap-2.5 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${['bg-emerald-400','bg-indigo-400','bg-violet-400'][i]}`} />
            <span className="text-[0.7rem] text-slate-600">{step}</span>
            <ArrowRight size={10} className="text-slate-300 ml-auto" />
          </div>
        ))}
      </div>
    ),
    href: '/diensten/automatisering',
  },
]

export default function BentoSection() {
  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="mb-20">
          <span className="overline-badge mb-5 inline-flex">Wat ik voor jou kan bouwen</span>
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.08] tracking-[-0.02em] max-w-lg">
              Van webshop tot volledig systeem.
            </h2>
            <p className="text-slate-500 text-lg max-w-xs leading-relaxed md:text-right">
              Elk project is anders.<br />Ik pas me aan jou aan.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-4">
          {cases.map((c, index) => {
            const Icon = c.icon
            return (
              <Reveal key={c.id} delay={index * 50} className={c.col}>
                <Link
                  href={c.href}
                  className={`group flex flex-col h-full rounded-[1.5rem] p-7 transition-all duration-300 hover:-translate-y-1 ${
                    c.dark
                      ? 'bg-slate-950 border border-white/5 hover:border-white/10 hover:shadow-2xl'
                      : 'bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br ${c.accent} shadow-sm`}>
                      <Icon size={17} className="text-white" />
                    </div>
                    <ArrowRight
                      size={16}
                      className={`group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200 ${
                        c.dark ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    />
                  </div>
                  <h4 className={`font-headline text-xl font-bold mt-5 mb-2 tracking-tight ${c.dark ? 'text-white' : 'text-slate-900'}`}>
                    {c.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${c.dark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {c.description}
                  </p>
                  {c.visual}
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
