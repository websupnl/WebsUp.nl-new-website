import Link from 'next/link'
import { Mail, Phone, MapPin, FileText, Receipt } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import type { NavigationItemRow } from '@/types/database.types'

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  )
}

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

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
  const navColumns = [
    {
      heading: 'Diensten',
      links: [
        { label: 'Websites', href: '/diensten/websites' },
        { label: 'Webshops', href: '/diensten/webshops' },
        { label: 'Apps en dashboards', href: '/diensten/apps-dashboards' },
        { label: 'Automatisering', href: '/diensten/automatisering' },
        { label: 'Onderhoud en optimalisatie', href: '/diensten' },
      ],
    },
    {
      heading: 'Bedrijf',
      links: [
        { label: 'Over Daan', href: '/over-ons' },
        { label: 'Projecten', href: '/projecten' },
        { label: 'Reviews', href: '/projecten' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ]

  const instagramUrl = siteConfig.social.instagram
  const facebookUrl = siteConfig.social.facebook
  const kvk = siteConfig.kvk
  const btw = siteConfig.btw

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-5">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-24 w-auto" />
              ) : (
                <img src="/WebsUp.nl logo zwart.png" alt={siteName} className="h-24 w-auto" />
              )}
            </Link>
            <p className="max-w-[320px] text-sm font-semibold leading-relaxed text-slate-700">
              WebsUp helpt bedrijven met websites, webshops en maatwerk systemen die professioneel ogen en praktisch werken.
            </p>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <h6 className="font-bold text-slate-900 text-xs uppercase tracking-[0.08em] mb-5">{col.heading}</h6>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-500 hover:text-accent-600 text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h6 className="font-bold text-slate-900 text-xs uppercase tracking-[0.08em] mb-5">Contact</h6>
            <ul className="space-y-3">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="flex items-start gap-2 text-slate-500 hover:text-accent-600 text-sm transition-colors">
                    <Mail size={14} className="mt-0.5 shrink-0" />
                    <span>{email}</span>
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-start gap-2 text-slate-500 hover:text-accent-600 text-sm transition-colors">
                    <Phone size={14} className="mt-0.5 shrink-0" />
                    <span>{phone}</span>
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-2 text-slate-500 text-sm">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  <span>{address}</span>
                </li>
              )}
              {kvk && (
                <li className="flex items-start gap-2 text-slate-500 text-sm">
                  <FileText size={14} className="mt-0.5 shrink-0" />
                  <span>KVK {kvk}</span>
                </li>
              )}
              {btw && (
                <li className="flex items-start gap-2 text-slate-500 text-sm">
                  <Receipt size={14} className="mt-0.5 shrink-0" />
                  <span>BTW {btw}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-slate-400 text-xs">
            © {new Date().getFullYear()} WebsUp.nl. Alle rechten voorbehouden.
          </span>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-accent-600 text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full text-slate-400 hover:text-accent-600 hover:bg-accent-400/10 transition-colors"
              >
                <LinkedinIcon />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full text-slate-400 hover:text-accent-600 hover:bg-accent-400/10 transition-colors"
              >
                <InstagramIcon />
              </a>
            )}
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full text-slate-400 hover:text-accent-600 hover:bg-accent-400/10 transition-colors"
              >
                <FacebookIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
