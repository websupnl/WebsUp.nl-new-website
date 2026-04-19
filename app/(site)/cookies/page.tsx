import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/site/LegalPage'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Cookiebeleid',
  description: 'Overzicht van welke cookies en voorkeuropslag WebsUp gebruikt op de website.',
}

export default function CookiesPage() {
  return (
    <LegalPage
      badge="Cookies"
      title="Cookiebeleid"
      subtitle="Welke opslag de website gebruikt, waarom dat gebeurt en hoe je daar zelf invloed op houdt."
      updatedLabel="19 april 2026"
      sections={[
        {
          title: '1. Wat zijn cookies en voorkeuropslag?',
          paragraphs: [
            'Cookies en vergelijkbare opslagvormen helpen om een website technisch goed te laten werken en instellingen te onthouden. Dat kan via browsercookies, localStorage of vergelijkbare technieken.',
          ],
        },
        {
          title: '2. Welke opslag gebruikt WebsUp nu?',
          list: [
            'Functionele opslag voor basisvoorkeuren, zoals je keuze in de cookiebanner',
            'Technische opslag die nodig kan zijn voor beveiliging, sessiegedrag of correcte werking van formulieren',
          ],
          paragraphs: [
            'De site is bewust licht gehouden. Er worden geen onnodige trackinglagen toegevoegd alleen om data te verzamelen.',
          ],
        },
        {
          title: '3. Analytische of aanvullende cookies',
          paragraphs: [
            'Als WebsUp later analytische of andere niet-noodzakelijke cookies inzet, gebeurt dat alleen op een manier die past bij de wet en na duidelijke toestemming waar dat nodig is.',
          ],
        },
        {
          title: '4. Hoe kun je dit beheren?',
          list: [
            'Je kunt eerder gegeven toestemming aanpassen via je browserinstellingen of door opgeslagen sitegegevens te verwijderen',
            'Je kunt cookies blokkeren of verwijderen via de instellingen van je browser',
            'Houd er rekening mee dat bepaalde functies dan minder goed kunnen werken',
          ],
        },
        {
          title: '5. Vragen over cookies of privacy',
          paragraphs: [
            `Voor vragen over cookies, voorkeuropslag of privacy kun je contact opnemen via ${siteConfig.email}.`,
          ],
          note: (
            <>
              Lees ook het{' '}
              <Link href="/privacybeleid" className="font-semibold text-slate-900 underline underline-offset-4">
                privacybeleid
              </Link>
              .
            </>
          ),
        },
      ]}
    />
  )
}
