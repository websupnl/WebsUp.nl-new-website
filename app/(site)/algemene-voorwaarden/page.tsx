import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/config/site.config'
import { getLegalPage } from '@/lib/queries/legal'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden',
  description: 'Lees de algemene voorwaarden van WebsUp.nl.',
}

// Bijgewerkt: versie 2.0 — mei 2026
// Wijzig dit via /admin/juridisch wanneer de DB-migratie is uitgevoerd.
const FALLBACK_AV = `
<section>
  <h2>Artikel 1 — Definities</h2>
  <ul>
    <li><strong>WebsUp / Opdrachtnemer:</strong> de eenmanszaak WebsUp.nl van Daan Koolhaas, gevestigd in Friesland, ingeschreven bij de Kamer van Koophandel.</li>
    <li><strong>Opdrachtgever:</strong> de natuurlijke persoon of rechtspersoon die een overeenkomst aangaat met WebsUp voor het afnemen van diensten.</li>
    <li><strong>Diensten:</strong> alle door WebsUp aangeboden en uitgevoerde werkzaamheden, waaronder — maar niet beperkt tot — het ontwerpen en bouwen van websites, webshops, dashboards, apps, koppelingen, automatisering, e-mailmarketing, SEO en aanverwante digitale dienstverlening.</li>
    <li><strong>Technologische infrastructuur:</strong> de externe platforms, frameworks en hulpmiddelen die WebsUp inzet bij de uitvoering van opdrachten. Hieronder vallen onder meer: Vercel (hosting &amp; deployment), Supabase (database, authenticatie &amp; opslag), Cloudflare (DNS, CDN &amp; DDoS-beveiliging), WordPress (CMS), Shopify (e-commerce), WooCommerce, Next.js, open source NPM-packages, en AI-hulpmiddelen zoals Claude Code van Anthropic. Deze lijst is niet uitputtend.</li>
    <li><strong>Schriftelijk:</strong> communicatie per e-mail of andere schriftelijke bevestiging wordt gelijkgesteld aan een schriftelijk document.</li>
  </ul>
</section>

<section>
  <h2>Artikel 2 — Toepasselijkheid</h2>
  <p>Deze algemene voorwaarden zijn van toepassing op alle offertes, aanbiedingen, overeenkomsten en diensten van WebsUp, tenzij schriftelijk uitdrukkelijk anders overeengekomen.</p>
  <p>Afwijkingen zijn slechts geldig indien schriftelijk vastgelegd. De toepasselijkheid van de algemene voorwaarden van de opdrachtgever wordt uitdrukkelijk van de hand gewezen.</p>
  <p>WebsUp behoudt het recht deze voorwaarden te wijzigen. De meest actuele versie is te vinden op websup.nl/algemene-voorwaarden.</p>
</section>

<section>
  <h2>Artikel 3 — Totstandkoming en offertes</h2>
  <p>Een overeenkomst komt tot stand op het moment dat de opdrachtgever een offerte schriftelijk accepteert, of op het moment dat WebsUp aanvangt met de uitvoering van een opdracht.</p>
  <p>Offertes zijn geldig gedurende 30 dagen na dagtekening, tenzij anders vermeld. WebsUp is gerechtigd een opdracht te weigeren zonder opgave van reden.</p>
  <p>Mondelinge afspraken zijn slechts bindend na schriftelijke bevestiging door WebsUp.</p>
</section>

<section>
  <h2>Artikel 4 — Prijzen en betaling</h2>
  <p>Alle prijzen zijn exclusief btw, tenzij uitdrukkelijk anders vermeld. Meerwerk wordt apart geoffreerd en gefactureerd.</p>
  <p>Facturen dienen te worden voldaan binnen 14 dagen na factuurdatum. Bij niet-tijdige betaling is de opdrachtgever van rechtswege in verzuim en is wettelijke handelsrente (artikel 6:119a BW) verschuldigd, alsmede buitengerechtelijke incassokosten conform de wet.</p>
  <p>WebsUp is gerechtigd werkzaamheden op te schorten of toegang tot opgeleverde systemen te beperken totdat openstaande facturen zijn voldaan.</p>
  <p>Abonnementen (hosting, onderhoud, SEO) worden maandelijks of jaarlijks gefactureerd en zijn opzegbaar met een opzegtermijn van één volledige kalendermaand, schriftelijk kenbaar gemaakt vóór de volgende factuurperiode.</p>
</section>

<section>
  <h2>Artikel 5 — Uitvoering van diensten</h2>
  <p>WebsUp voert opdrachten naar beste inzicht en vermogen uit. Opgegeven opleverdata zijn indicatief. Overschrijding hiervan geeft de opdrachtgever geen recht op schadevergoeding of ontbinding, tenzij sprake is van opzet of grove nalatigheid.</p>
  <p>De opdrachtgever is verplicht tijdig de benodigde informatie, teksten, afbeeldingen, toegangen en overige materialen aan te leveren. Bij vertraging door de opdrachtgever schuiven deadlines en opleverdata automatisch op.</p>
  <p>Indien na 30 dagen na opdrachtbevestiging geen of onvoldoende materialen zijn aangeleverd, behoudt WebsUp het recht de opdracht als opgeleverd te beschouwen en het overeengekomen bedrag te factureren.</p>
</section>

<section>
  <h2>Artikel 6 — Wijzigingen en meerwerk</h2>
  <p>Tijdens de uitvoering is een redelijk aantal correctierondes inbegrepen, zoals overeengekomen in de offerte. Wijzigingen buiten de overeengekomen scope worden als meerwerk beschouwd en afzonderlijk gefactureerd op basis van het geldende uurtarief.</p>
  <p>WebsUp zal de opdrachtgever tijdig informeren indien een verzoek tot wijziging leidt tot extra kosten of vertraging.</p>
</section>

<section>
  <h2>Artikel 7 — Intellectueel eigendom</h2>
  <p>Alle door WebsUp vervaardigde ontwerpen, code, content en overige materialen blijven eigendom van WebsUp totdat de volledige factuur is voldaan. Na volledige betaling verkrijgt de opdrachtgever een niet-exclusief gebruiksrecht op het opgeleverde werk, tenzij schriftelijk uitdrukkelijk volledige eigendomsoverdracht is overeengekomen.</p>
  <p>WebsUp behoudt te allen tijde het recht gerealiseerde projecten te vermelden in een portfolio, tenzij de opdrachtgever schriftelijk bezwaar heeft gemaakt.</p>
  <p>Gebruikte licenties van derden (waaronder WordPress-thema's, Shopify-apps, open source NPM-packages en afbeeldingen van stockdiensten) vallen onder de respectievelijke licentievoorwaarden van die derde partijen. De opdrachtgever is zelf verantwoordelijk voor naleving van toepasselijke licenties na overdracht van het project.</p>
</section>

<section>
  <h2>Artikel 8 — Aansprakelijkheid</h2>
  <p>De totale aansprakelijkheid van WebsUp is in alle gevallen beperkt tot het bedrag dat de opdrachtgever heeft betaald voor de desbetreffende opdracht in de drie maanden voorafgaand aan het schadeveroorzakende voorval. WebsUp is nimmer aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste omzet, reputatieschade of verlies van gegevens.</p>
  <p>WebsUp geeft geen garanties met betrekking tot zoekmachineposities, conversieratio's, bezoekersaantallen of andere resultaatgerichte doelstellingen. Dergelijke diensten worden geleverd op basis van een inspanningsverplichting.</p>
  <p>Aansprakelijkheidsclaims vervallen indien deze niet binnen 12 maanden na ontdekking van de schade schriftelijk bij WebsUp zijn ingediend.</p>
</section>

<section>
  <h2>Artikel 9 — Cyberaanvallen, datalekken en digitale veiligheid</h2>
  <p>WebsUp treft redelijke en gangbare technische en organisatorische maatregelen om de veiligheid van opgeleverde systemen te bevorderen. WebsUp is echter <strong>niet aansprakelijk</strong> voor schade die voortvloeit uit:</p>
  <ul>
    <li>cyberaanvallen, hacking, phishing, ransomware, malware of andere vormen van ongeautoriseerde toegang tot systemen;</li>
    <li>DDoS-aanvallen of vergelijkbare verstoringen van de beschikbaarheid;</li>
    <li>datalekken bij derde partijen waarop de dienstverlening rust (waaronder Vercel, Supabase, Cloudflare, WordPress, Shopify of andere technologische infrastructuur);</li>
    <li>kwetsbaarheden in open source software, NPM-packages, CMS-plugins of andere componenten van derden;</li>
    <li>verlies of beschadiging van gegevens als gevolg van bovenstaande incidenten.</li>
  </ul>
  <p>De opdrachtgever is zelf verantwoordelijk voor het gebruik van sterke wachtwoorden, tweefactorauthenticatie en het tijdig updaten van toegangsgegevens. WebsUp adviseert regelmatige back-ups en draagt hiervoor geen verantwoordelijkheid tenzij een onderhoudsabonnement dit uitdrukkelijk omvat.</p>
  <p>Bij een beveiligingsincident zal WebsUp de opdrachtgever zo spoedig mogelijk informeren en naar beste vermogen ondersteuning bieden, maar aansprakelijkheid voor de gevolgen is uitdrukkelijk uitgesloten.</p>
</section>

<section>
  <h2>Artikel 10 — Technologische infrastructuur en derde partijen</h2>
  <p>WebsUp maakt gebruik van technologische platforms van derden voor de uitvoering van opdrachten. De inzet van onderstaande — en vergelijkbare — platforms is inherent aan de dienstverlening en de opdrachtgever gaat hiermee akkoord:</p>
  <ul>
    <li><strong>Vercel</strong> — hosting, deployment en edge-netwerk (vercel.com)</li>
    <li><strong>Supabase</strong> — database, authenticatie en opslag (supabase.com)</li>
    <li><strong>Cloudflare</strong> — DNS, CDN, DDoS-bescherming en beveiligingsdiensten (cloudflare.com)</li>
    <li><strong>WordPress</strong> — content management systeem voor websites en blogs (wordpress.org)</li>
    <li><strong>Shopify / WooCommerce</strong> — e-commerceplatforms voor webshops</li>
    <li><strong>NPM &amp; open source packages</strong> — herbruikbare software-onderdelen met eigen licenties</li>
    <li><strong>AI-hulpmiddelen</strong> — waaronder Claude Code van Anthropic, GitHub Copilot of vergelijkbare tools (zie Artikel 11)</li>
  </ul>
  <p>WebsUp is niet aansprakelijk voor storingen, downtime, dataverlies, beleidswijzigingen of prijsverhogingen bij voornoemde derde partijen. De opdrachtgever erkent dat de beschikbaarheid van de dienstverlening mede afhankelijk is van de werking van deze externe platforms.</p>
  <p>WebsUp sluit waar vereist verwerkersovereenkomsten af met subverwerkers die persoonsgegevens verwerken. Op verzoek verstrekt WebsUp een overzicht van actieve subverwerkers.</p>
</section>

<section>
  <h2>Artikel 11 — AI-hulpmiddelen</h2>
  <p>Bij de ontwikkeling van websites, code en digitale systemen kan WebsUp gebruikmaken van AI-hulpmiddelen zoals Claude Code (Anthropic), GitHub Copilot of vergelijkbare oplossingen. Het gebruik hiervan valt onder de verantwoordelijkheid van WebsUp en de opdrachtgever gaat hiermee akkoord, tenzij schriftelijk uitdrukkelijk anders is overeengekomen.</p>
  <p>WebsUp draagt er zorg voor dat geen vertrouwelijke bedrijfsinformatie of persoonsgegevens van de opdrachtgever zonder toestemming worden ingevoerd in AI-systemen van derden.</p>
</section>

<section>
  <h2>Artikel 12 — Hosting en beschikbaarheid</h2>
  <p>WebsUp garandeert geen specifieke uptime of beschikbaarheid, tenzij dit uitdrukkelijk schriftelijk is overeengekomen in de vorm van een SLA. Geplande onderhoudswerkzaamheden en onvoorziene storingen bij hostingpartijen zijn uitgesloten van aansprakelijkheid.</p>
  <p>Bij hosting via Vercel, Cloudflare of een andere derde partij gelden de service level agreements van die partij. WebsUp is niet aansprakelijk voor schade voortvloeiend uit uitval of prestatievermindering van deze platforms.</p>
</section>

<section>
  <h2>Artikel 13 — Persoonsgegevens en AVG</h2>
  <p>WebsUp verwerkt persoonsgegevens conform de Algemene Verordening Gegevensbescherming (AVG/GDPR) en overige toepasselijke wet- en regelgeving. Zie het privacybeleid op websup.nl/privacybeleid voor meer informatie.</p>
  <p>Indien de opdrachtgever WebsUp toegang verleent tot persoonsgegevens van eindgebruikers of medewerkers, dan handelt WebsUp als verwerker in de zin van de AVG. Op verzoek sluit WebsUp een verwerkersovereenkomst af.</p>
  <p>De opdrachtgever is zelf verantwoordelijk voor naleving van de AVG op zijn eigen platform en dienstverlening, waaronder het tijdig informeren van betrokkenen en het correct implementeren van cookie- en toestemmingsbeheer.</p>
</section>

<section>
  <h2>Artikel 14 — Vertrouwelijkheid</h2>
  <p>Beide partijen behandelen vertrouwelijke informatie die zij van de andere partij ontvangen als strikt vertrouwelijk en delen deze niet met derden zonder voorafgaande schriftelijke toestemming, tenzij wettelijk verplicht.</p>
</section>

<section>
  <h2>Artikel 15 — Overmacht</h2>
  <p>WebsUp is niet gehouden tot nakoming van enige verplichting indien dit het gevolg is van omstandigheden buiten de macht van WebsUp, waaronder storingen bij hostingproviders, stroomstoringen, overheidsmaatregelen, pandemieën, cyberaanvallen op de infrastructuur van derden, of andere buitengewone omstandigheden.</p>
</section>

<section>
  <h2>Artikel 16 — Klachten</h2>
  <p>Klachten over de uitvoering van diensten dienen binnen 14 dagen na ontdekking schriftelijk te worden ingediend. Klachten schorten de betalingsverplichting niet op. WebsUp streeft ernaar klachten binnen 14 werkdagen te beantwoorden.</p>
</section>

<section>
  <h2>Artikel 17 — Toepasselijk recht en geschillen</h2>
  <p>Op alle overeenkomsten met WebsUp is uitsluitend Nederlands recht van toepassing. Geschillen worden in eerste instantie minnelijk opgelost. Indien dit niet lukt, worden geschillen voorgelegd aan de bevoegde rechter in het arrondissement Noord-Nederland.</p>
</section>

<section>
  <h2>Contact</h2>
  <p>Voor vragen over deze voorwaarden kun je contact opnemen via <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>.</p>
</section>
`

export default async function AlgemeneVoorwaardenPage() {
  const page = await getLegalPage('algemene-voorwaarden')

  return (
    <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <h1 className="font-headline text-4xl font-extrabold text-slate-900 mb-2">
        {page?.title ?? 'Algemene Voorwaarden'}
      </h1>
      <p className="text-slate-400 text-sm mb-10">
        {page?.version ? `Versie ${page.version}` : 'Versie 2.0, mei 2026'}
      </p>

      <div
        className="prose-content space-y-8 text-slate-700 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-3 [&_h2]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_p]:mt-2 [&_section]:space-y-2 [&_a]:text-orange-500 [&_a]:hover:underline"
        dangerouslySetInnerHTML={{ __html: page?.content ?? FALLBACK_AV }}
      />
    </Reveal>
  )
}
