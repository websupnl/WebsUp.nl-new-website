import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/site/LegalPage'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Hoe WebsUp omgaat met persoonsgegevens, contactaanvragen en websitegegevens.',
}

export default function PrivacybeleidPage() {
  return (
    <LegalPage
      badge="Privacy"
      title="Privacybeleid"
      subtitle="Duidelijk overzicht van welke persoonsgegevens WebsUp verwerkt, waarom dat gebeurt en welke rechten je daarbij hebt."
      updatedLabel="19 april 2026"
      sections={[
        {
          title: '1. Wie is verantwoordelijk voor de verwerking?',
          paragraphs: [
            `WebsUp.nl is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven op deze pagina. WebsUp is het bedrijf van Daan Koolhaas, gevestigd in ${siteConfig.address}.`,
            `Voor vragen over privacy of gegevensverwerking kun je contact opnemen via ${siteConfig.email}.`,
          ],
        },
        {
          title: '2. Welke gegevens kunnen worden verwerkt?',
          paragraphs: [
            'WebsUp verwerkt alleen gegevens die nodig zijn om contact te beantwoorden, een opdracht uit te voeren of de website veilig en bruikbaar te houden.',
          ],
          list: [
            'Naam, e-mailadres en telefoonnummer wanneer je contact opneemt',
            'Bedrijfsnaam en projectinformatie die je zelf doorstuurt',
            'Factuur- en administratieve gegevens als er een samenwerking ontstaat',
            'Technische gegevens zoals IP-adres, browserinformatie en beveiligingslogs voor misbruikpreventie',
          ],
        },
        {
          title: '3. Waarvoor worden die gegevens gebruikt?',
          list: [
            'Om contactverzoeken, vragen en offerteaanvragen te beantwoorden',
            'Om projecten, websites, webshops of maatwerktrajecten uit te voeren',
            'Om facturatie en administratie correct af te handelen',
            'Om de website technisch veilig, stabiel en bruikbaar te houden',
            'Om te voldoen aan wettelijke verplichtingen',
          ],
        },
        {
          title: '4. Op welke grondslag gebeurt dat?',
          paragraphs: [
            'Gegevens worden verwerkt op basis van toestemming, uitvoering van een overeenkomst, wettelijke verplichtingen of een gerechtvaardigd belang zoals beveiliging, communicatie en normale bedrijfsvoering.',
          ],
        },
        {
          title: '5. Hoe lang worden gegevens bewaard?',
          paragraphs: [
            'Contactverzoeken worden niet langer bewaard dan nodig is om het gesprek op te volgen of een aanvraag af te handelen.',
            'Administratieve gegevens, zoals facturen, worden bewaard zolang de wet dat verplicht. Projectbestanden of communicatie kunnen langer worden bewaard zolang dat logisch is voor support, nazorg of vervolgwerk.',
          ],
        },
        {
          title: '6. Worden gegevens gedeeld met derden?',
          paragraphs: [
            'Alleen als dat nodig is voor de dienstverlening of technische werking van de website. Denk aan hosting, e-mailverzending, analytics of softwareleveranciers die onderdeel zijn van het proces.',
            'WebsUp verkoopt geen persoonsgegevens aan derden.',
          ],
        },
        {
          title: '7. Cookies en voorkeuropslag',
          paragraphs: [
            'De website gebruikt functionele opslag voor basisvoorkeuren, zoals cookiekeuze, en kan technische meet- of beveiligingsopslag gebruiken als dat nodig is.',
          ],
          note: (
            <>
              Meer informatie staat in het{' '}
              <Link href="/cookies" className="font-semibold text-slate-900 underline underline-offset-4">
                cookiebeleid
              </Link>
              .
            </>
          ),
        },
        {
          title: '8. Jouw rechten',
          paragraphs: [
            'Je hebt het recht om je persoonsgegevens in te zien, te laten corrigeren, te laten verwijderen of bezwaar te maken tegen bepaalde verwerkingen.',
            `Wil je daarvan gebruikmaken, stuur dan een bericht naar ${siteConfig.email}. Als je vindt dat er niet goed met je gegevens wordt omgegaan, kun je ook een klacht indienen bij de Autoriteit Persoonsgegevens.`,
          ],
        },
        {
          title: '9. Beveiliging',
          paragraphs: [
            'WebsUp neemt passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik of onbevoegde toegang.',
          ],
        },
      ]}
    />
  )
}
