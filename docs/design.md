# WebsUp.nl — Design System

> Dit document is de bron van waarheid voor alle visuele beslissingen. Elke AI-agent en developer leest dit voordat er iets wordt aangemaakt of gewijzigd.

---

## Brand Identity

WebsUp is een premium maatwerk-webbureau. Het design moet uitstralen: vakmanschap, persoonlijk contact, technische kwaliteit. Niet nep-corporate, niet goedkoop. Denk Apple x Stripe x Linear — maar warmer en Nederlandstalig.

**Kernprincipes:**
- Dark sections voelen exclusief en premium aan (hero, vergelijking, CTA)
- Light sections zijn rustig en luchtig — goed voor content en vertrouwen
- Gradient wordt spaarzaam gebruikt maar impactvol — nooit overal
- Glassmorphism is subtiel: backdrop-blur + lage transparantie, niet overdreven

---

## Brand Gradient

De handtekening van WebsUp. **Altijd in deze volgorde: oranje → roze → paars.**

```css
linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)
```

| Gebruik | Richtlijn |
|---|---|
| Tekst highlights | `.gradient-text` — op woorden of korte phrases |
| Hero separator line | `.focus-pulse-line` — animated shimmer |
| SVG icon strokes | `<linearGradient>` in `<defs>`, `stroke="url(#grad)"` |
| Primaire knop | `.btn-brand-gradient` — de enige gradient knop op de site |
| Section top-line in dark cards | `linear-gradient(90deg, transparent, #f97316, #ec4899, #a78bfa, transparent)` |
| Ambient blobs in dark bg | Losse kleur per blob: orange/pink/violet, `blur-[90px]` of groter |

**Nooit** gradient gebruiken op gewone knoppen, borders, of decoratieve vlakken. Gradient = handtekening, dus spaarzaam.

---

## Kleuren

### Dark (primary sections — hero, vergelijking, CTA, navbar)

| Token | Waarde | Gebruik |
|---|---|---|
| Dark bg | `#06040c` | Section bg, card bg op dark |
| Dark surface | `rgba(10,8,20,0.72)` | Glassmorphism panels op dark |
| Dark card bg | `rgba(12,10,22,0.90)` | GuarantiesSection cards |
| Dark border | `rgba(255,255,255,0.08)` | Default borders op dark |
| Dark border hover | Card-specifiek via brand color | `rgba(249,115,22,0.24)` etc |
| Wit tekst | `rgba(255,255,255,0.88)` | Titels op dark |
| Muted tekst | `rgba(255,255,255,0.45)` | Beschrijving op dark |
| Muted tekst hover | `rgba(255,255,255,0.58)` | Beschrijving hover op dark |

### Light (content sections — services, about, reviews)

| Token | Waarde | Gebruik |
|---|---|---|
| Light bg | `#f8f9fc` | GuarantiesSection bg |
| White bg | `#ffffff` | ServicesSection, ReviewsSection |
| Slate-50 bg | `#f8fafc` | AboutMeSection bg |
| Primaire tekst | `#0b1526` / `slate-900` | H2, titels |
| Body tekst | `#56647a` / `slate-600` | Paragrafen |
| Muted tekst | `slate-500` | Subtitels, captions |
| Border | `rgba(11,21,38,0.07)` / `slate-200` | Kaartborders |

### Brand accent kleuren

| Naam | Hex | Gebruik |
|---|---|---|
| Brand Orange | `#f97316` | Icons, accents, overline badge light |
| Brand Pink | `#ec4899` | Mid-gradient, hover glows |
| Brand Violet | `#a78bfa` | End-gradient, dark section checkmarks, highlights |

---

## Typografie

### Fonts
- **Headline / Display**: Bricolage Grotesque (`font-headline`) — alle H1, H2, display tekst
- **Body**: Geist (`font-body`) — paragrafen, labels, UI tekst

### Schaalregels
```css
/* H1 (hero) */
font-size: clamp(2rem, 4.2vw, 3.6rem);
font-weight: 800;
letter-spacing: -0.035em;
line-height: 1.06;

/* H2 (section headers) */
font-size: clamp(1.7rem, 3vw, 2.8rem);  /* compact */
font-size: clamp(2rem, 3.4vw, 3.1rem);  /* ruimer */
font-weight: 800;
letter-spacing: -0.03em;
line-height: 1.04–1.06;

/* Card titles */
font-size: 1rem;
font-weight: 600;
letter-spacing: -0.01em;

/* Body tekst */
font-size: 0.95rem – 1.0625rem;
line-height: 1.7 – 1.76;

/* Overline badge label */
font-size: 0.7rem;
font-weight: 700;
letter-spacing: 0.08em;
text-transform: uppercase;
```

---

## Overline Badges

Kleine pill boven een section header. Altijd boven H2, nooit inline in tekst.

### Light sections
```css
.overline-badge
/* Witte achtergrond, glass effect, oranje tint via brand-gradient-soft overlay */
background: rgba(255,255,255,0.72);
color: #475569;
border: 1px solid rgba(255,255,255,0.82);
backdrop-filter: blur(16px);
```

### Dark sections — oranje variant (hero, CTA)
```css
.overline-badge.overline-badge-dark
/* Transparant, oranje color + border — voor warme donkere secties */
background: transparent;
color: rgba(249,115,22,0.92);
border-color: rgba(249,115,22,0.34);
```

### Dark sections — violet variant (vergelijking, tech-heavy secties)
```css
/* Inline style — geen aparte class, gebruik dit patroon */
background: rgba(167,139,250,0.12);
color: rgba(167,139,250,0.90);
border: 1px solid rgba(167,139,250,0.28);
```

**Regel**: Gebruik oranje variant bij warm-gevoel dark sections (hero, CTA). Gebruik violet variant bij rationele/data-heavy dark sections (vergelijking, features tabel).

---

## Cards

### Dark glassmorphism card (GuarantiesSection)
De premium dark card — gebruikt op lichte achtergronden als contrast.

```tsx
background: 'rgba(12,10,22,0.90)'
border: `1px solid ${hovered ? g.border : 'rgba(255,255,255,0.10)'}`
backdropFilter: 'blur(20px)'
borderRadius: 'rounded-2xl'
boxShadow: hovered
  ? `0 20px 56px rgba(0,0,0,0.40), 0 0 48px ${g.glow}`
  : `0 8px 32px rgba(0,0,0,0.22), 0 0 20px ${g.glow}`
transform: hovered ? 'translateY(-4px)' : 'translateY(0)'

/* Inner ambient glow — radial van een hoek */
innerGlow: 'radial-gradient(ellipse at 10% 0%, rgba(249,115,22,0.22) 0%, transparent 65%)'

/* Top gradient line */
background: 'linear-gradient(90deg, transparent 0%, #f97316 30%, #ec4899 60%, #a78bfa 90%, transparent 100%)'
opacity: hovered ? 0.9 : 0.35
```

### Light surface card (ServicesSection, ProjectsSection)
```css
background: #ffffff;
border: 1px solid rgba(11,21,38,0.07);
box-shadow: 0 2px 8px rgba(11,21,38,0.06);
border-radius: 1rem; /* rounded-2xl */
/* hover */
border-color: rgba(236,72,153,0.18);  /* pink tint hover */
box-shadow: 0 16px 42px rgba(11,21,38,0.10);
transform: translateY(-2px);
```

### Glass panel (vergelijkingstabel, modals)
```tsx
background: 'rgba(10,8,20,0.72)'
backdropFilter: 'blur(40px) saturate(180%)'
border: '1px solid rgba(255,255,255,0.09)'
boxShadow: '0 32px 80px rgba(0,0,0,0.28)'
```

---

## Icons

**Altijd SVG met inline gradient** — nooit emoji, nooit een icon-only kleurklasse.

```tsx
const GRAD_ID = 'brand-icon-grad'

const GradientIcon = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <defs>
      <linearGradient id={GRAD_ID} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    {children}
  </svg>
)

// Gebruik:
<path stroke={`url(#${GRAD_ID})`} d="..." />
<circle stroke={`url(#${GRAD_ID})`} cx="12" cy="12" r="4" />
```

**Icon container (op dark card):**
```tsx
background: hovered ? g.glow : 'rgba(255,255,255,0.04)'
border: `1px solid ${hovered ? g.border : 'rgba(255,255,255,0.08)'}`
borderRadius: 'rounded-xl'
size: 'h-10 w-10'
```

Voor Lucide icons op light background: gebruik `text-orange-500` als accent.

---

## Ambient Blobs (gradient drops)

Decoratieve achtergrond-elementen die diepte en warmte geven. **Altijd pointer-events-none en absolute.**

### In light sections (GuarantiesSection stijl)
```tsx
<div className="pointer-events-none absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-orange-400/20 blur-[90px]" />
<div className="pointer-events-none absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-400/15 blur-[100px]" />
<div className="pointer-events-none absolute -bottom-20 right-[10%] h-72 w-72 rounded-full bg-violet-400/20 blur-[90px]" />
```

### In dark sections (ComparisonSection stijl)
```tsx
<div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
<div className="pointer-events-none absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-pink-600/15 blur-[100px]" />
```

### In sticky header (scrolled state)
```tsx
<div className="pointer-events-none absolute -left-8 top-1/2 h-20 w-32 -translate-y-1/2 rounded-full bg-orange-500/20 blur-2xl" />
<div className="pointer-events-none absolute left-1/3 top-1/2 h-16 w-24 -translate-y-1/2 rounded-full bg-pink-500/15 blur-2xl" />
<div className="pointer-events-none absolute right-24 top-1/2 h-20 w-32 -translate-y-1/2 rounded-full bg-violet-500/[0.18] blur-2xl" />
```

### In mobile menu sidebar
```tsx
<div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
<div className="pointer-events-none absolute top-1/3 -right-10 h-36 w-36 rounded-full bg-pink-500/15 blur-3xl" />
<div className="pointer-events-none absolute bottom-20 left-0 h-40 w-40 rounded-full bg-violet-500/[0.18] blur-3xl" />
```

---

## Dark Sections — Achtergrond

Alle donkere secties gebruiken dezelfde wave-achtergrond voor visuele continuïteit.

```tsx
style={{
  backgroundColor: '#06040c',
  backgroundImage: 'url("/hero-bg.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',  // zorgt voor doorlopend effect
}}

// + overlay:
<div className="pointer-events-none absolute inset-0" style={{ background: 'rgba(6,4,12,0.82)' }} />
```

Gebruik `background-attachment: fixed` op alle donkere secties zodat het lijkt alsof de wave doorloopt.

---

## Knoppen

| Type | Class | Gebruik |
|---|---|---|
| Primair gradient | `.btn-brand-gradient` | Enige gradient knop — main CTA |
| Donker filled | `bg-slate-900 text-white rounded-full` | Secondary CTA op light bg |
| Ghost dark | `.btn-dark-ghost` of `border-white/25 bg-white/8` | Secondary op dark bg |
| Ghost light | `.btn-ghost` | Tertiair op light bg |

**Nooit** een gradient op een gewone ghost of secondary knop.

---

## Animaties

| Effect | Klasse / Patroon |
|---|---|
| Fade-in bij scroll | `IntersectionObserver` + `opacity/transform` transition — zie GuarantiesSection |
| Page fade-in | `.page-shell` — `pageFadeIn` keyframe |
| Hero separator shimmer | `.focus-pulse-line` — `gradient-shimmer` keyframe |
| Wave bg drift | `.hero-wave-bg` — `hero-wave-drift` keyframe |
| Card hover lift | `transform: translateY(-4px)` + shadow increase |
| Button shine sweep | `.btn-brand-gradient::after` — translateX sweep |
| Staggered cards | `transitionDelay: visible ? \`${index * 100}ms\` : '0ms'` |

---

## Section Volgorde & Alternering (homepage)

```
1. HeroSection         — dark wave, full height
2. GuarantiesSection   — light (#f8f9fc), dark cards als contrast
3. ComparisonSection   — dark wave (hero-bg.png fixed), glass mockup
4. ServicesSection     — wit (#ffffff), light cards
5. ProjectsSection     — wit of lichte tint
6. AboutMeSection      — slate-50, persoonlijk
7. ReviewsSection      — wit, clean
8. CTASection          — wit container met dark wave rounded card
```

**Ritme**: donker → licht → donker → licht → licht → licht → licht → donker-in-licht. Nooit twee zware donkere secties direct achter elkaar (ComparisonSection en GuarantiesSection worden gescheiden door overgang).

---

## App/Browser Mockup Patroon (ComparisonSection)

Gebruik dit als je een tabel of data-component wilt presenteren als een "echte app":

```tsx
{/* Window chrome bar */}
<div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
  {/* Traffic light dots */}
  <span className="h-3 w-3 rounded-full bg-red-500/80" />
  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
  <span className="h-3 w-3 rounded-full bg-green-500/80" />
  {/* Fake URL bar */}
  <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <span className="h-2 w-2 rounded-full bg-green-400/60" />  {/* SSL dot */}
    <span className="text-[0.65rem] text-white/35 font-mono">websup.nl/...</span>
  </div>
</div>
{/* Status bar */}
<div style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
  <span className="text-[0.6rem] font-mono text-white/22">bestandsnaam.tsx</span>
  {/* Gradient badge */}
  <span style={{ backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
    WebsUp ✓
  </span>
</div>
```

---

## Trust Pills (liquid glass, hero stijl)

```tsx
style={{
  background: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(236,72,153,0.08) 100%)',
  border: '1px solid rgba(249,115,22,0.20)',
  backdropFilter: 'blur(8px) saturate(140%)',
  color: 'rgba(255,255,255,0.82)',
}}
// Dot binnenin:
<span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-400" />
```

---

## Verboden patronen

- ❌ `indigo`, `blue-6xx`, `purple` als kleurnaam — gebruik altijd `violet` of specifieke hex
- ❌ Gradient op gewone knoppen (alleen `.btn-brand-gradient`)
- ❌ Emoji's als icons
- ❌ Twee donkere wave-secties direct naast elkaar
- ❌ Nieuwe hero, nieuwe CTA, nieuwe tooltip aanmaken — gebruik bestaande componenten
- ❌ Oranje `overline-badge-dark` op rationele/data dark sections — gebruik violet variant
- ❌ `ConnectBanner` op pagina's plaatsen
- ❌ Hardcoded client-specifieke waarden in componenten
