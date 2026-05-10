import type { Metadata } from 'next'
import { Bricolage_Grotesque, Geist } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site.config'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AppFeedbackProvider } from '@/components/ui/AppFeedbackProvider'
import FreeDesignModalProvider from '@/components/site/FreeDesignModalProvider'
import WhatsAppButton from '@/components/site/WhatsAppButton'
import CustomCursor from '@/components/site/CustomCursor'

const headlineFont = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-headline',
  display: 'swap',
})

const bodyFont = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  icons: {
    icon: '/WebsUp favicon.png',
    shortcut: '/WebsUp favicon.png',
    apple: '/WebsUp favicon.png',
  },
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'nl_NL',
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/WebsUp favicon.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: 'customer service',
    availableLanguage: 'Dutch',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Friesland',
    addressCountry: 'NL',
  },
  sameAs: [
    siteConfig.social.linkedin,
  ].filter(Boolean),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${headlineFont.variable} ${bodyFont.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <AppFeedbackProvider>
          {children}
          <CustomCursor />
          <FreeDesignModalProvider />
          <WhatsAppButton />
          <SpeedInsights />
        </AppFeedbackProvider>
      </body>
    </html>
  )
}
