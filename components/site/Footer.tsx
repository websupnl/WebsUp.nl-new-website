import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import type { NavigationItemRow } from '@/types/database.types'

interface FooterProps {
  siteName?: string
  email?: string
  phone?: string
  address?: string
  linkedinUrl?: string
  logoUrl?: string
  navItems?: Pick<NavigationItemRow, 'id' | 'label' | 'url'>[]
  footerLinks?: Array<{ label: string; href: string }>
}

export default function Footer({
  siteName = siteConfig.name,
  email = siteConfig.email,
  phone = siteConfig.phone,
  address = siteConfig.address,
  linkedinUrl = siteConfig.social.linkedin,
  logoUrl,
  footerLinks = siteConfig.footer.links,
}: FooterProps) {
  const columns = [
    {
      heading: 'Diensten',
      links: [
        { label: 'Websites', href: '/diensten/websites' },
        { label: 'Webshops', href: '/diensten/webshops' },
        { label: 'Apps & Dashboards', href: '/diensten/apps-dashboards' },
        { label: 'Automatisering', href: '/diensten/automatisering' },
      ],
    },
    {
      heading: 'Werk',
      links: [
        { label: 'Projecten', href: '/projecten' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      heading: 'Bedrijf',
      links: [
        { label: 'Contact', href: '/contact' },
        ...footerLinks,
      ],
    },
  ]

  return (
    <footer className="bg-white border-t border-slate-100">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-5">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-7 w-auto" />
              ) : (
                <img src="/WebsUp.nl logo zwart.png" alt={siteName} className="h-14 w-auto" />
              )}
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[240px] mb-7">
              {siteConfig.footer.tagline}
            </p>

            {/* Contact block */}
            <div className="space-y-2.5">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-orange-500 text-xs transition-colors group"
                >
                  <Mail size={12} className="shrink-0" />
                  {email}
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-orange-500 text-xs transition-colors"
                >
                  <Phone size={12} className="shrink-0" />
                  {phone}
                </a>
              )}
              {address && (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <MapPin size={12} className="shrink-0" />
                  {address}
                </div>
              )}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h6 className="font-bold text-slate-900 text-xs uppercase tracking-[0.08em] mb-5">{col.heading}</h6>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-500 hover:text-orange-500 text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-7 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-slate-400 text-xs">
            © {new Date().getFullYear()} WebsUp.nl — Alle rechten voorbehouden.
          </span>
          <div className="flex items-center gap-6">
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-orange-500 text-xs transition-colors"
              >
                LinkedIn
                <ArrowUpRight size={11} />
              </a>
            )}
            <Link href="/privacybeleid" className="text-slate-400 hover:text-orange-500 text-xs transition-colors">
              Privacy
            </Link>
            <Link href="/algemene-voorwaarden" className="text-slate-400 hover:text-orange-500 text-xs transition-colors">
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
