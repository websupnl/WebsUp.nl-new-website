import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
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

const passthroughLoader = ({ src }: { src: string }) => src

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
        { label: 'Apps & dashboards', href: '/diensten/apps-dashboards' },
        { label: 'Automatisering', href: '/diensten/automatisering' },
      ],
    },
    {
      heading: 'Informatie',
      links: [
        { label: 'Projecten', href: '/projecten' },
        { label: 'Kennisbank', href: '/kennisbank' },
        { label: 'Over mij', href: '/over-ons' },
        { label: 'Veelgestelde vragen', href: '/veelgestelde-vragen' },
      ],
    },
    {
      heading: 'Contact',
      links: [{ label: 'Neem contact op', href: '/contact' }],
    },
    {
      heading: 'Juridisch',
      links: footerLinks,
    },
  ]

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1.85fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-block">
              {logoUrl ? (
                <Image
                  loader={passthroughLoader}
                  unoptimized
                  src={logoUrl}
                  alt={siteName}
                  width={320}
                  height={110}
                  className="h-16 w-auto"
                />
              ) : (
                <Image
                  src="/WebsUp.nl logo zwart.png"
                  alt={siteName}
                  width={320}
                  height={110}
                  className="h-20 w-auto"
                />
              )}
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-500">
              {siteConfig.footer.tagline}
            </p>

            <div className="mt-8 space-y-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-orange-500"
                >
                  <Mail size={14} className="shrink-0" />
                  {email}
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-orange-500"
                >
                  <Phone size={14} className="shrink-0" />
                  {phone}
                </a>
              )}
              {address && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={14} className="shrink-0" />
                  {address}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((column) => (
              <div key={column.heading}>
                <h6 className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                  {column.heading}
                </h6>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-orange-500"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
          <span className="text-xs text-slate-400">
            Copyright {new Date().getFullYear()} WebsUp.nl - Alle rechten voorbehouden.
          </span>
          <div className="flex items-center gap-6">
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-orange-500"
              >
                LinkedIn
                <ArrowUpRight size={11} />
              </a>
            )}
            <Link
              href="/privacybeleid"
              className="text-xs text-slate-400 transition-colors hover:text-orange-500"
            >
              Privacy
            </Link>
            <Link
              href="/algemene-voorwaarden"
              className="text-xs text-slate-400 transition-colors hover:text-orange-500"
            >
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
