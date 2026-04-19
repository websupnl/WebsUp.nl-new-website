export type ServiceSlug = 'websites' | 'webshops' | 'apps-dashboards' | 'automatisering'

export interface ServiceContent {
  slug: ServiceSlug
  title: string
  shortLabel: string
  icon: 'Monitor' | 'ShoppingCart' | 'LayoutDashboard' | 'Zap'
  navDescription: string
  overviewTitle: string
  overviewText: string
  heroTitle: string
  heroSubtitle: string
  image: string
  highlights: string[]
  outcomes: Array<{ title: string; text: string }>
  deliverables: string[]
  fit: string[]
}

export const serviceProcess = [
  'We starten met een kort gesprek over je bedrijf, je doelen en waar je nu op vastloopt.',
  'Daarna bepalen we welke opzet slim is: inhoud, structuur, techniek en wat nu wel of juist nog niet nodig is.',
  'Vervolgens bouwen we stap voor stap, met korte feedbackrondes en zonder het traject onnodig zwaar te maken.',
  'Na livegang kan de oplossing gewoon meegroeien met extra pagina’s, koppelingen of maatwerk.',
] as const

export const services: ServiceContent[] = [
  {
    slug: 'websites',
    title: 'Websites',
    shortLabel: 'Website',
    icon: 'Monitor',
    navDescription: 'Sterke bedrijfssites die vertrouwen geven en klaar zijn om op door te bouwen.',
    overviewTitle: 'Een website die direct goed staat en later niet in de weg zit.',
    overviewText:
      'Voor bedrijven die professioneel zichtbaar willen zijn met een site die duidelijk vertelt wat je doet, vertrouwen opbouwt en gericht is op contact of aanvragen.',
    heroTitle: 'Een website die werkt als een sterke basis voor je bedrijf.',
    heroSubtitle:
      'Geen losse pagina’s zonder richting, maar een duidelijke online basis die professioneel oogt, logisch voelt en ruimte houdt om later door te groeien.',
    image: '/Projecten/verkeerschoolhaak_mockup.png',
    highlights: ['Professionele uitstraling', 'Duidelijke structuur', 'Klaar om op door te bouwen'],
    outcomes: [
      {
        title: 'Sterke eerste indruk',
        text: 'Je website laat direct zien dat je serieus werkt en dat iemand je met vertrouwen kan benaderen.',
      },
      {
        title: 'Duidelijke uitleg van je aanbod',
        text: 'Bezoekers moeten niet hoeven zoeken naar wat je doet, voor wie je werkt en wat de volgende stap is.',
      },
      {
        title: 'Een basis die verder kan groeien',
        text: 'Je kunt later zonder gedoe uitbreiden met landingspagina’s, leadflows, portalen of een webshop.',
      },
    ],
    deliverables: [
      'Heldere pagina-opbouw en contentstructuur',
      'Responsief ontwerp voor mobiel, tablet en desktop',
      'Sterke technische basis voor snelheid en SEO',
      'Contact- en aanvraagpunten op logische plekken',
      'Beheerbare inhoud waar dat praktisch is',
      'Ruimte om later verder te bouwen',
    ],
    fit: [
      'Je huidige site voelt verouderd of onduidelijk',
      'Je wilt professioneler zichtbaar zijn voor nieuwe klanten',
      'Je zoekt een website die nu goed werkt en later nog mee kan groeien',
    ],
  },
  {
    slug: 'webshops',
    title: 'Webshops',
    shortLabel: 'Webshop',
    icon: 'ShoppingCart',
    navDescription: 'Shops die niet alleen mooi ogen, maar ook duidelijk verkopen en prettig beheren.',
    overviewTitle: 'Een webshop die logisch verkoopt en niet vastloopt in het proces eromheen.',
    overviewText:
      'Voor ondernemers die online willen verkopen met een shop die vertrouwen geeft, duidelijk werkt op mobiel en de stap van bekijken naar afrekenen makkelijker maakt.',
    heroTitle: 'Een webshop die verkoop makkelijker maakt.',
    heroSubtitle:
      'Van productstructuur en uitstraling tot checkout en opvolging: een webshop moet niet alleen netjes staan, maar vooral logisch verkopen en prettig te beheren zijn.',
    image: '/Projecten/goldcenterdrachten_mockup.png',
    highlights: ['Duidelijke productpresentatie', 'Logische checkout', 'Klaar voor koppelingen en groei'],
    outcomes: [
      {
        title: 'Minder frictie in de koopflow',
        text: 'Hoe duidelijker de structuur, hoe kleiner de kans dat iemand afhaakt tussen product en betaling.',
      },
      {
        title: 'Meer grip op bestellingen en opvolging',
        text: 'Een goede webshop helpt niet alleen de klant, maar ook jouw proces achter de schermen.',
      },
      {
        title: 'Sterkere basis voor schaal',
        text: 'De shop moet later ook goed kunnen omgaan met meer producten, koppelingen of campagnes.',
      },
    ],
    deliverables: [
      'Product- en categorie-opbouw die logisch voelt',
      'Sterke mobiele presentatie en gebruikservaring',
      'Checkout met iDEAL, Mollie of andere betaalflow',
      'Heldere koppeling met mail, orderverwerking of voorraad',
      'Conversiegerichte opzet zonder onnodige afleiding',
      'Basis om later verder op te optimaliseren',
    ],
    fit: [
      'Je wilt online gaan verkopen zonder een rommelige shop op te tuigen',
      'Je huidige webshop voelt traag, onduidelijk of omslachtig',
      'Je wilt verkoop, beheer en opvolging beter op elkaar laten aansluiten',
    ],
  },
  {
    slug: 'apps-dashboards',
    title: 'Apps & Dashboards',
    shortLabel: 'Maatwerk',
    icon: 'LayoutDashboard',
    navDescription: 'Portalen, dashboards en interne tools voor bedrijven die meer grip nodig hebben.',
    overviewTitle: 'Wanneer losse tools niet meer genoeg zijn, bouw je iets dat echt bij het proces past.',
    overviewText:
      'Voor bedrijven die overzicht missen, handmatig blijven werken of informatie over meerdere systemen verspreid hebben staan.',
    heroTitle: 'Overzicht en grip met een systeem dat past.',
    heroSubtitle:
      'Niet elk proces past netjes in standaardsoftware. Soms heb je een dashboard, portaal of interne tool nodig die precies ondersteunt hoe je bedrijf daadwerkelijk werkt.',
    image: '/Projecten/thuisbatterijen_friesland_mockup.png',
    highlights: ['Realtime overzicht', 'Maatwerk voor jouw proces', 'Veilig en schaalbaar opgezet'],
    outcomes: [
      {
        title: 'Minder losse eilanden',
        text: 'Data, taken en statussen hoeven niet meer verspreid te staan over Excel, mail en losse tools.',
      },
      {
        title: 'Meer grip voor team en klant',
        text: 'Een goed dashboard of portaal maakt duidelijk wat er speelt, wat de status is en wat de volgende stap wordt.',
      },
      {
        title: 'Praktische software in plaats van extra ruis',
        text: 'Het doel is niet meer software, maar software die werk uit handen neemt en overzicht terugbrengt.',
      },
    ],
    deliverables: [
      'Interne dashboards of klantportalen op maat',
      'Overzichten, filters en statusweergaven die logisch zijn',
      'Toegang per gebruiker of rol waar nodig',
      'Koppelingen met bestaande systemen of databronnen',
      'Een opzet die later kan worden uitgebreid',
      'Technische basis die stevig genoeg is voor dagelijks gebruik',
    ],
    fit: [
      'Je team werkt nu te veel in losse tools of handmatige overzichten',
      'Je wilt klanten of collega’s beter inzicht geven in status en data',
      'Je zoekt maatwerksoftware die echt aansluit op je proces',
    ],
  },
  {
    slug: 'automatisering',
    title: 'Automatisering',
    shortLabel: 'Automatisering',
    icon: 'Zap',
    navDescription: 'Koppelingen en workflows die terugkerend werk uit handen nemen.',
    overviewTitle: 'Minder handmatig werk, minder fouten en meer rust in de dagelijkse uitvoering.',
    overviewText:
      'Voor bedrijven die te veel tijd verliezen aan overtypen, opvolgen, doorzetten of steeds dezelfde handelingen opnieuw doen.',
    heroTitle: 'Minder handmatig werk. Meer rust en overzicht.',
    heroSubtitle:
      'Als processen steeds terugkomen, moet je ze niet blijven oplossen met discipline alleen. Dan is het slimmer om de juiste koppeling of workflow te bouwen.',
    image: '/Projecten/jteq_mockup.png',
    highlights: ['Slimme koppelingen', 'Minder fouten', 'Meer rust in opvolging en uitvoering'],
    outcomes: [
      {
        title: 'Minder kopiëren en plakken',
        text: 'Taken die steeds terugkomen, horen automatisch door te lopen tussen formulieren, mail, CRM of interne tooling.',
      },
      {
        title: 'Snellere opvolging',
        text: 'Nieuwe leads, aanvragen of updates komen direct op de juiste plek terecht zonder vertraging.',
      },
      {
        title: 'Betere betrouwbaarheid',
        text: 'Minder handmatig werk betekent meestal ook minder fouten en een consistenter proces.',
      },
    ],
    deliverables: [
      'Koppelingen tussen formulieren, CRM, mail en interne tooling',
      'Automatische meldingen en opvolgflows',
      'Proceslogica voor leads, aanvragen of orders',
      'Synchronisatie tussen systemen waar dat nodig is',
      'Inzicht in wat automatisch loopt en waar nog handmatig werk zit',
      'Een praktische setup die je later kunt uitbreiden',
    ],
    fit: [
      'Je team verliest te veel tijd aan terugkerend handmatig werk',
      'Gegevens worden nu op meerdere plekken dubbel ingevoerd',
      'Je wilt minder afhankelijk zijn van losse geheugenstappen en handmatige opvolging',
    ],
  },
]

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug)
}
