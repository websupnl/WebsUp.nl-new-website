import Link from 'next/link'
import { Globe, ShoppingCart, Box, Lock, BarChart2 } from 'lucide-react'

const CATS = [
  { icon: Globe,        title: 'Websites',     sub: 'Bedrijfssites',         href: '/diensten/websites' },
  { icon: ShoppingCart, title: 'Webshops',     sub: 'Shopify · WooCommerce', href: '/diensten/webshops' },
  { icon: Box,          title: 'Maatwerk',     sub: 'Modules · Calculators', href: '/diensten/apps-dashboards' },
  { icon: Lock,         title: 'Klantportaal', sub: 'Dossier · Tickets',     href: '/diensten/apps-dashboards' },
  { icon: BarChart2,    title: 'Dashboards',   sub: 'Inzicht · Rapportage',  href: '/diensten/apps-dashboards' },
]

const ICON_BG = 'linear-gradient(135deg, rgba(249,115,22,0.13) 0%, rgba(236,72,153,0.13) 50%, rgba(167,139,250,0.13) 100%)'

export default function ServiceCategoryStrip() {
  return (
    <section className="bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-[1500px] px-8 lg:px-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATS.map(({ icon: Icon, title, sub, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex items-center gap-3.5 rounded-[12px] border border-[#e6e8eb] bg-white px-[18px] py-4 transition-all duration-200 hover:border-[#15181d] hover:bg-[#f6f7f8]"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]"
                style={{
                  background: ICON_BG,
                  border: '1px solid #e6e8eb',
                }}
              >
                <Icon size={22} strokeWidth={1.6} color="#15181d" />
              </div>
              <div>
                <span className="block text-[16px] font-semibold leading-snug text-[#15181d]">
                  {title}
                </span>
                <span className="block text-[13px] text-[#6b7280]">{sub}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
