import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Lees het privacybeleid van WebsUp.nl en hoe wordt omgegaan met persoonsgegevens.',
}

export default function PrivacybeleidPage() {
  return (
    <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <h1 className="font-headline text-4xl font-extrabold text-slate-900 mb-2">Privacybeleid</h1>
      <p className="text-slate-400 text-sm mb-10">Laatst bijgewerkt: januari 2026</p>

      <div className="prose-content space-y-8 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Wie ben ik?</h2>
          <p>
            WebsUp.nl is een eenmanszaak van Daan Koolhaas, gevestigd in Friesland. Ik ben verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.
          </p>
          <p className="mt-2">
            <strong>Contactgegevens:</strong><br />
            WebsUp.nl<br />
            {siteConfig.address}<br />
            {siteConfig.email}{siteConfig.kvk ? <> · KVK {siteConfig.kvk}</> : null}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Welke gegevens verzamel ik?</h2>
          <p>De volgende persoonsgegevens kunnen verwerkt worden:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer</li>
            <li>Bedrijfsnaam</li>
            <li>IP-adres en browsergegevens (via cookies en analytics)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Waarom verwerk ik gegevens?</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Afhandelen van contactverzoeken en aanvragen</li>
            <li>Versturen van gevraagde informatie of offertes</li>
            <li>Uitvoeren van overeenkomsten en projecten</li>
            <li>Verbeteren van de website en dienstverlening</li>
            <li>Voldoen aan wettelijke verplichtingen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Bewaartermijn</h2>
          <p>
            Persoonsgegevens worden niet langer bewaard dan nodig voor de doeleinden waarvoor ze zijn verzameld. Contactgegevens worden maximaal 2 jaar bewaard, tenzij eerder verzocht om verwijdering of zolang fiscale bewaarplicht het vereist.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Delen met derden</h2>
          <p>
            Gegevens worden niet verkocht aan derden. Wel kunnen gegevens worden gedeeld met verwerkers die diensten leveren (zoals hosting, e-mail of analytics), uitsluitend op basis van een verwerkersovereenkomst.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Cookies</h2>
          <p>
            De website gebruikt functionele en analytische cookies. Zie het{' '}
            <a href="/cookies" className="text-orange-500 hover:underline">cookiebeleid</a> voor meer informatie.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">7. Jouw rechten</h2>
          <p>Je hebt het recht om:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Inzage te vragen in jouw persoonsgegevens</li>
            <li>Onjuiste gegevens te laten corrigeren</li>
            <li>Jouw gegevens te laten verwijderen</li>
            <li>Bezwaar te maken tegen de verwerking</li>
            <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
          </ul>
          <p className="mt-3">
            Neem voor het uitoefenen van deze rechten contact op via{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-orange-500 hover:underline">
              {siteConfig.email}
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">8. Beveiliging</h2>
          <p>
            Er worden passende technische en organisatorische maatregelen genomen om persoonsgegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik.
          </p>
        </section>
      </div>
    </Reveal>
  )
}
