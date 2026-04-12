// ============================================================
// SITE CONFIG — WebsUp.nl
// ============================================================

export const siteConfig = {
  // Bedrijfsinfo
  name: "WebsUp.nl",
  shortName: "WebsUp",
  description:
    "Websites, webshops, apps en automatiseringen die jouw bedrijf laten groeien. Maatwerk digitale oplossingen uit Friesland.",
  url: "https://websup.nl",

  // Contact
  email: "info@websup.nl",
  phone: "06 82202148",
  address: "Friesland, Nederland",

  // Navigatie
  nav: [
    { label: "Diensten", href: "/diensten" },
    { label: "Projecten", href: "/projecten" },
    { label: "Kennisbank", href: "/kennisbank" },
    { label: "Over ons", href: "/over-ons" },
    { label: "Contact", href: "/contact" },
  ],

  // Branding
  brand: {
    primary: "#2563EB",
    primaryHover: "#1D4ED8",
    primaryLight: "#EFF6FF",
    primaryText: "#FFFFFF",
  },

  // Social media
  social: {
    linkedin: "https://linkedin.com/company/websup",
    twitter: "",
    facebook: "",
  },

  // SEO defaults
  seo: {
    titleTemplate: "%s | WebsUp.nl",
    defaultTitle: "WebsUp.nl | Websites, apps & systemen die groeien",
    defaultDescription:
      "Wij bouwen moderne websites, webshops, maatwerk apps en automatiseringen die jouw bedrijf laten groeien. Persoonlijk, technisch sterk en resultaatgericht.",
    ogImage: "/og-image.png",
  },

  // Hero sectie
  hero: {
    heading: "Jouw complete digitale systeem. Eén aanspreekpunt.",
    subheading:
      "Ik ben Daan — zelfstandig en persoonlijk. Ik bouw websites, webshops, apps en automatiseringen die samenwerken als één geheel. Van WordPress tot maatwerk: altijd direct contact met de persoon die bouwt.",
    ctaLabel: "Plan een kennismaking",
    ctaHref: "/contact",
    secondaryCtaLabel: "Bekijk het werk",
    secondaryCtaHref: "/projecten",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80",
    trustBadges: [
      { value: "5+", label: "Tevreden klanten" },
      { value: "100%", label: "Maatwerk" },
      { value: "Friesland", label: "Gevestigd" },
    ],
  },

  // USP blokken (FeatureCards) — direct na hero
  features: [
    {
      icon: "Globe",
      title: "Websites & webshops",
      description:
        "Snel, modern en conversiegericht. Gebouwd op Next.js voor maximale prestaties en SEO.",
    },
    {
      icon: "LayoutDashboard",
      title: "Apps & dashboards",
      description:
        "Klantportalen, interne tools en dashboards op maat. Processen automatiseren en inzicht geven.",
    },
    {
      icon: "Zap",
      title: "Automatisering",
      description:
        "Koppelingen, workflows en slimme systemen die handmatig werk elimineren en je bedrijf efficiënter maken.",
    },
  ],

  // Diensten (uitgebreid, voor ServicesSection)
  services: [
    {
      icon: "Monitor",
      title: "Websites",
      description:
        "Moderne, snelle websites die niet alleen mooi zijn, maar ook gericht op resultaat en conversie. Gebouwd met Next.js voor topprestaties.",
      bullets: [
        "Conversiegerichte designs",
        "Razendsnel door Next.js",
        "Zoekmachine geoptimaliseerd",
        "Mobiel-first & responsief",
      ],
      href: "/diensten#websites",
    },
    {
      icon: "ShoppingCart",
      title: "Webshops",
      description:
        "Gebruiksvriendelijke webshops die verkopen, met slimme functies en optimale gebruikerservaring.",
      bullets: [
        "Optimale checkout flow",
        "Koppeling met betaalsystemen",
        "Voorraadbeheer & orders",
        "Upsell & cross-sell logica",
      ],
      href: "/diensten#webshops",
    },
    {
      icon: "LayoutDashboard",
      title: "Apps & dashboards",
      description:
        "Maatwerk tools, klantportalen en dashboards die processen automatiseren en realtime inzicht geven.",
      bullets: [
        "Klantportalen op maat",
        "Interne management tools",
        "Realtime data dashboards",
        "Rolgebaseerde toegang",
      ],
      href: "/diensten#apps",
    },
    {
      icon: "Zap",
      title: "Automatisering",
      description:
        "Koppelingen en slimme systemen die handmatig werk verminderen en jouw bedrijf efficiënter maken.",
      bullets: [
        "API-koppelingen",
        "Workflow automatisering",
        "CRM & email integraties",
        "Data synchronisatie",
      ],
      href: "/diensten#automatisering",
    },
  ],

  // Why WebsUp USPs
  whyWebsUp: {
    badge: "Waarom WebsUp?",
    heading: "Geen bureau. Een digitale partner.",
    subheading:
      "Wij combineren de persoonlijke aanpak van een zelfstandige met de technische kracht van een modern development team.",
    items: [
      {
        icon: "User",
        title: "Persoonlijke aanpak",
        description:
          "Directe lijn met de developer. Geen accountmanagers, geen vertraagde communicatie. Jij praat met degene die bouwt.",
      },
      {
        icon: "Code2",
        title: "Technisch sterk",
        description:
          "Next.js, React, Supabase, n8n. Geen WordPress-templates maar echte maatwerk code die schaalbaar is.",
      },
      {
        icon: "TrendingUp",
        title: "Focus op groei",
        description:
          "Elke beslissing is gericht op resultaat: meer leads, hogere conversie, minder handmatig werk.",
      },
      {
        icon: "Layers",
        title: "Alles onder één dak",
        description:
          "Van website tot automatisering: één aanspreekpunt voor al je digitale behoeften. Nu en in de toekomst.",
      },
    ],
  },

  // Werkwijze / Process
  process: {
    heading: "Zo werken wij",
    subheading: "Van idee tot live in een helder en transparant proces.",
    steps: [
      {
        number: "01",
        title: "Kennismaking & analyse",
        description:
          "We beginnen met een gratis gesprek. Ik luister, stel vragen en denk mee over wat jouw bedrijf écht nodig heeft.",
      },
      {
        number: "02",
        title: "Voorstel & planning",
        description:
          "Geen vage offertes. Je krijgt een concrete aanpak, duidelijke scope en eerlijke prijzen.",
      },
      {
        number: "03",
        title: "Bouw & feedback",
        description:
          "Ik bouw iteratief. Je ziet tussentijdse resultaten en geeft feedback voordat alles vastligt.",
      },
      {
        number: "04",
        title: "Live & doorgroeien",
        description:
          "Na lancering ben ik beschikbaar voor ondersteuning, uitbreidingen en nieuwe functionaliteiten.",
      },
    ],
  },

  // Use cases
  useCases: {
    heading: "Voor wie bouw ik?",
    subheading: "Van lokale MKB tot groeiende webshops.",
    items: [
      { label: "MKB & ZZP'ers", icon: "Briefcase" },
      { label: "Webshops", icon: "ShoppingCart" },
      { label: "Installatiebedrijven", icon: "Wrench" },
      { label: "Dienstverleners", icon: "Handshake" },
      { label: "Startups", icon: "Rocket" },
      { label: "Lokale ondernemers", icon: "MapPin" },
    ],
  },

  // CTA sectie
  cta: {
    heading: "Benieuwd wat ik voor jou kan bouwen?",
    subheading:
      "Plan een gratis kennismaking — telefonisch of bij jou op locatie. Geen verkoopverhaal, gewoon een eerlijk gesprek over wat jouw bedrijf nodig heeft.",
    ctaLabel: "Plan een kennismaking",
    ctaHref: "/contact",
    image: "/group-of-young-business-people-in-the-modern-offic-2026-01-08-05-01-37-utc.jpg",
  },

  // Legacy stubs (voor backward-compat van niet-gebruikte components)
  about: {
    badge: 'Over ons',
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

  // Footer
  footer: {
    tagline: "Persoonlijk. Technisch. Eén aanspreekpunt voor jouw complete digitale systeem.",
    links: [
      { label: "Privacybeleid", href: "/privacybeleid" },
      { label: "Cookiebeleid", href: "/cookies" },
      { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
