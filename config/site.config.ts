// ============================================================
// SITE CONFIG - WebsUp.nl
// ============================================================

export const siteConfig = {
  name: 'WebsUp.nl',
  shortName: 'WebsUp',
  description:
    'Websites, webshops, dashboards en automatiseringen die duidelijk werken en ruimte houden om door te groeien. Persoonlijk gebouwd vanuit Friesland.',
  url: 'https://websup.nl',

  email: 'info@websup.nl',
  phone: '06 82202148',
  address: 'Friesland, Nederland',

  nav: [
    { label: 'Diensten', href: '/diensten' },
    { label: 'Projecten', href: '/projecten' },
    { label: 'Kennisbank', href: '/kennisbank' },
    { label: 'Over mij', href: '/over-ons' },
    { label: 'Contact', href: '/contact' },
  ],

  brand: {
    primary: '#f97316',
    primaryHover: '#ea580c',
    primaryLight: '#fff0e7',
    primaryText: '#0f172a',
  },

  social: {
    linkedin: 'https://linkedin.com/company/websup',
    twitter: '',
    facebook: '',
  },

  seo: {
    titleTemplate: '%s | WebsUp.nl',
    defaultTitle: 'WebsUp.nl | Websites, webshops en systemen die duidelijk werken',
    defaultDescription:
      'WebsUp bouwt websites, webshops, dashboards en automatiseringen die vertrouwen geven, praktisch werken en later verder kunnen groeien.',
    ogImage: '/og-image.png',
  },

  hero: {
    heading: 'Een aanspreekpunt. Alles digitaal geregeld.',
    subheading:
      'WebsUp bouwt websites en webshops die vertrouwen geven, goed werken en klaar zijn om door te groeien. Heb je meer nodig? Dan bouwen we verder met dashboards, koppelingen, calculators of andere maatwerk oplossingen.',
    ctaLabel: 'Plan een kennismaking',
    ctaHref: '/contact',
    secondaryCtaLabel: 'Bekijk het werk',
    secondaryCtaHref: '/projecten',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80',
    trustBadges: [
      { value: '5+', label: 'Tevreden klanten' },
      { value: '100%', label: 'Maatwerk' },
      { value: 'Friesland', label: 'Gevestigd' },
    ],
  },

  features: [
    {
      icon: 'Globe',
      title: 'Websites & webshops',
      description:
        'Sterke digitale bases voor bedrijven die professioneel zichtbaar willen zijn en beter online willen verkopen.',
    },
    {
      icon: 'LayoutDashboard',
      title: 'Apps & dashboards',
      description:
        'Klantportalen, dashboards en interne tools op maat voor bedrijven die meer grip en overzicht nodig hebben.',
    },
    {
      icon: 'Zap',
      title: 'Automatisering',
      description:
        'Koppelingen en workflows die terugkerend werk verminderen en processen rustiger en duidelijker maken.',
    },
  ],

  services: [
    {
      icon: 'Monitor',
      title: 'Websites',
      description:
        'Professionele websites die duidelijk vertellen wat je doet, vertrouwen opbouwen en gericht zijn op contact, aanvragen en groei.',
      bullets: [
        'Sterke online basis',
        'Mobiel en technisch sterk',
        'Logische contentstructuur',
        'Klaar om door te bouwen',
      ],
      href: '/diensten/websites',
    },
    {
      icon: 'ShoppingCart',
      title: 'Webshops',
      description:
        'Webshops die niet alleen mooi ogen, maar ook logisch verkopen en prettig te beheren zijn.',
      bullets: [
        'Duidelijke productpresentatie',
        'Sterke checkoutflow',
        'Koppelingen met betalingen en mail',
        'Basis voor verdere optimalisatie',
      ],
      href: '/diensten/webshops',
    },
    {
      icon: 'LayoutDashboard',
      title: 'Apps & dashboards',
      description:
        'Maatwerk tools voor bedrijven die processen, klantdata of interne overzichten beter willen organiseren.',
      bullets: [
        'Klantportalen op maat',
        'Interne dashboards',
        'Realtime inzicht',
        'Veilige toegang per rol',
      ],
      href: '/diensten/apps-dashboards',
    },
    {
      icon: 'Zap',
      title: 'Automatisering',
      description:
        'Slimme workflows en koppelingen die handmatig werk verminderen en opvolging beter laten doorlopen.',
      bullets: [
        'API-koppelingen',
        'Lead- en orderflows',
        'CRM en mailintegraties',
        'Minder fouten en meer rust',
      ],
      href: '/diensten/automatisering',
    },
  ],

  whyWebsUp: {
    badge: 'Waarom WebsUp?',
    heading: 'Geen groot bureau. Wel een sterke digitale partner.',
    subheading:
      'Persoonlijk contact, stevige techniek en een aanpak die niet groter wordt gemaakt dan nodig.',
    items: [
      {
        icon: 'User',
        title: 'Persoonlijke aanpak',
        description:
          'Directe lijn met degene die meedenkt en bouwt. Geen accountmanagers, geen onnodige tussenlagen.',
      },
      {
        icon: 'Code2',
        title: 'Technisch sterk',
        description:
          'Van WordPress en Shopify tot maatwerk in Next.js, Supabase en n8n. De techniek volgt de vraag, niet andersom.',
      },
      {
        icon: 'TrendingUp',
        title: 'Focus op groei',
        description:
          'Iedere keuze moet bijdragen aan duidelijkheid, betere opvolging, meer vertrouwen of meer grip op je proces.',
      },
      {
        icon: 'Layers',
        title: 'Alles sluit op elkaar aan',
        description:
          'Website, webshop, koppelingen en maatwerk kunnen als een geheel worden opgebouwd in plaats van losse onderdelen.',
      },
    ],
  },

  process: {
    heading: 'Zo werken we',
    subheading: 'Van eerste gesprek tot livegang in een duidelijk en praktisch traject.',
    steps: [
      {
        number: '01',
        title: 'Kennismaking',
        description:
          'We bespreken je bedrijf, je doelen en waar je nu tegenaan loopt. Daar begint de slimste oplossing.',
      },
      {
        number: '02',
        title: 'Opzet en richting',
        description:
          'Je krijgt een duidelijke aanpak, zodat je weet wat we gaan bouwen en waarom die route logisch is.',
      },
      {
        number: '03',
        title: 'Bouwen en aanscherpen',
        description:
          'We werken stap voor stap, met korte feedbackrondes en zonder het proces onnodig zwaar te maken.',
      },
      {
        number: '04',
        title: 'Live en verder bouwen',
        description:
          'Na oplevering kan de basis gewoon doorgroeien met nieuwe pagina’s, koppelingen of maatwerk.',
      },
    ],
  },

  useCases: {
    heading: 'Voor wie bouw ik?',
    subheading: 'Van lokale dienstverleners en installatiebedrijven tot ondernemers die online meer grip willen.',
    items: [
      { label: "MKB & ZZP'ers", icon: 'Briefcase' },
      { label: 'Webshops', icon: 'ShoppingCart' },
      { label: 'Installatiebedrijven', icon: 'Wrench' },
      { label: 'Dienstverleners', icon: 'Handshake' },
      { label: 'Startups', icon: 'Rocket' },
      { label: 'Lokale ondernemers', icon: 'MapPin' },
    ],
  },

  faq: {
    heading: 'Veelgestelde vragen',
    subheading:
      'Korte antwoorden op vragen die vaak terugkomen over websites, webshops, maatwerk en samenwerking.',
    items: [
      {
        question: 'Wat kost een website of webshop?',
        answer:
          'Dat hangt af van wat er nodig is. Een compacte website is iets anders dan een maatwerk traject met koppelingen, contentstructuur of extra functionaliteit. Daarom begint het altijd met scherp krijgen wat slim is voor jouw situatie.',
      },
      {
        question: 'Werk je alleen in Friesland?',
        answer:
          'Nee. WebsUp is gevestigd in Friesland, maar werkt voor klanten door heel Nederland. Online kan bijna alles en waar nodig is overleg op locatie ook gewoon mogelijk.',
      },
      {
        question: 'Werk je met WordPress of juist maatwerk?',
        answer:
          'Allebei. Soms is WordPress de slimste keuze, soms Shopify en soms juist maatwerk met Next.js of een koppeling daarachter. Het platform volgt de vraag, niet andersom.',
      },
      {
        question: 'Kan ik later verder uitbreiden?',
        answer:
          'Ja. De basis moet nu goed werken, maar wel ruimte houden om later door te bouwen met extra pagina’s, functionaliteit, automatisering of een klantenportaal.',
      },
      {
        question: 'Kan ik mijn website daarna zelf beheren?',
        answer:
          'Ja, als dat belangrijk is wordt daar rekening mee gehouden. Denk aan een CMS, duidelijke structuur en een oplossing die praktisch blijft in dagelijks gebruik.',
      },
      {
        question: 'Doe je ook SEO en vindbaarheid?',
        answer:
          'Ja. Geen losse trucjes, maar een sterke technische basis, duidelijke pagina-opbouw, goede contentstructuur en keuzes die helpen om beter gevonden te worden.',
      },
      {
        question: 'Kun je ook automatiseringen of koppelingen bouwen?',
        answer:
          'Ja. WebsUp bouwt niet alleen websites, maar ook koppelingen, dashboards, formulieren, portalen en automatiseringen die handmatig werk verminderen.',
      },
      {
        question: 'Hoe snel kan een project live staan?',
        answer:
          'Dat verschilt per project. Een compacte website kan relatief snel live, terwijl maatwerk of inhoudelijke trajecten meer tijd vragen. In het begin maken we daar altijd duidelijke afspraken over.',
      },
    ],
  },

  knowledgePreview: {
    heading: 'Uit de kennisbank',
    subheading:
      'Praktische artikelen over websites, online vindbaarheid, automatisering en digitale keuzes.',
  },

  cta: {
    heading: 'Benieuwd wat ik voor jou kan bouwen?',
    subheading:
      'Plan een gratis kennismaking, telefonisch of bij jou op locatie. Geen verkooppraatje, maar gewoon een eerlijk gesprek over wat slim is voor jouw situatie.',
    ctaLabel: 'Plan een kennismaking',
    ctaHref: '/contact',
    image: '/group-of-young-business-people-in-the-modern-offic-2026-01-08-05-01-37-utc.jpg',
  },

  about: {
    badge: 'Over mij',
    heading: 'Wij zijn WebsUp.nl',
    body: 'Maatwerk digitale oplossingen uit Friesland.',
    highlights: ['Persoonlijk', 'Technisch sterk', 'Resultaatgericht'],
    ctaLabel: 'Contact',
    ctaHref: '/contact',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
  wordAuteur: {
    heading: '',
    subheading: '',
    benefits: [] as { icon: string; title: string; desc: string }[],
    ctaLabel: '',
    ctaHref: '/',
  },
  doelgroep: {
    heading: '',
    subheading: '',
    blocks: [] as { icon: string; title: string; desc: string }[],
  },
  news: {
    heading: 'Nieuws',
    subheading: '',
  },

  footer: {
    tagline:
      'Persoonlijk, technisch en zonder onnodige lagen. WebsUp bouwt digitale oplossingen die duidelijk werken en later mee kunnen groeien.',
    links: [
      { label: 'Privacybeleid', href: '/privacybeleid' },
      { label: 'Cookiebeleid', href: '/cookies' },
      { label: 'Algemene voorwaarden', href: '/algemene-voorwaarden' },
    ],
  },
}

export type SiteConfig = typeof siteConfig
