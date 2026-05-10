# Codex Prompt — WebsUp.nl Full Frontend Redesign

> Kopieer alles hieronder en geef het aan Codex als taak.

---

## SYSTEM CONTEXT

Je werkt aan een bestaand Next.js 16 (App Router) + Tailwind CSS v4 + Framer Motion project: **WebsUp.nl**, de persoonlijke website van Daan Koolhaas, freelance webdeveloper uit Friesland.

**VERPLICHT voor je begint:** Gebruik de `frontend-design` skill. Deze skill geeft je toegang tot design patterns van 50.000+ topwebsites. Lean volledig op die kennis bij elke keuze.

**Referentiesites voor dit project:** Stripe.com · Apple.com · Victron Energy · Linear.app · Framer.com. Elk designbeslissing moet langs de vraag: "Zou dit op Stripe staan zonder schaamte?"

**Huidige codebase:**
- `app/layout.tsx` — fonts: Bricolage Grotesque (headline), Geist (body)
- `app/globals.css` — design tokens, button classes, gradient utilities
- `components/site/` — alle public-facing components
- Brand gradient: `linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)`
- Brand dark bg: `#06040c`

**Gebruik Playwright na elke grote wijziging** om visueel te verifiëren.

---

## TAAK OVERZICHT

Voer een volledige visuele redesign uit van de homepage en subpage-headers. Geen half werk. Elke sectie moet het gevoel hebben van een 50k+ website. De site moet *leven* — animaties, micro-interacties, hover states, breathing room.

---

## DEEL 1 — TYPOGRAPHY SYSTEEM FIXEN

**Bestand:** `app/globals.css`

Vervang de huidige heading defaults met:

```css
h1 {
  font-size: clamp(3.5rem, 8.5vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.95;
}

h2 {
  font-size: clamp(2.5rem, 5.5vw, 5rem);
  letter-spacing: -0.04em;
  line-height: 0.98;
}

h3 {
  font-size: clamp(1.5rem, 2.5vw, 2.25rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
}
```

Voeg toe aan globals.css:

```css
/* Stripe-stijl animated gradient background */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animated-gradient-bg {
  background: radial-gradient(ellipse 80% 60% at 20% 40%, rgba(249,115,22,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 60%, rgba(167,139,250,0.14) 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 50% 20%, rgba(236,72,153,0.10) 0%, transparent 70%);
  background-size: 200% 200%;
  animation: gradient-shift 18s ease infinite;
}

/* Spring easing utility */
.ease-spring { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
```

---

## DEEL 2 — HERO SECTION (`components/site/HeroSection.tsx`)

**Doel:** Stripe/Apple-niveau hero. Headline kleiner qua woorden, groter qua formaat. Animated entrance. Daan's foto editorial behandeld.

**Wijzigingen:**

### 2a. Animated entrance (Framer Motion)

Gebruik `motion.div` met `initial={{ opacity: 0, y: 24 }}` en `animate={{ opacity: 1, y: 0 }}` met staggered delays:

```tsx
// Badge: delay 0.1s, duration 0.6s
// Headline regel 1: delay 0.2s
// Headline regel 2: delay 0.32s
// Subtitel: delay 0.44s
// Buttons: delay 0.56s
// Trust pills: delay 0.72s
// Foto: delay 0.18s, duration 0.9s
```

Gebruik `transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}` overal.

### 2b. Headline herschrijven (KORTER)

Vervang de huidige lange headline door een 2-regel structuur:

```tsx
<h1>
  <span className="block text-white">Websites die</span>
  <span className="block gradient-text">écht werken.</span>
</h1>
```

Font size: `clamp(3.8rem, 8vw, 7.5rem)`, leading `0.96`, tracking `-0.05em`.

### 2c. Background — animated mesh gradient

Voeg de `animated-gradient-bg` class toe aan de overlay div naast de hero-bg.png.

### 2d. Trust pills

Al aanwezig maar voeg subtiele entrance animatie toe (laatste element dat inkomt).

### 2e. Foto — editorial behandeling

Verwijder de `border border-white/10` op de photo card. Maak de rand onzichtbaar. De foto blends in de dark background via een sterkere bottom gradient:
```css
background: linear-gradient(to bottom, transparent 45%, #06040c 100%)
```

---

## DEEL 3 — STATS STRIP (NIEUW COMPONENT)

**Maak aan:** `components/site/StatsStrip.tsx`

Een horizontale strip tussen Hero en ProblemSection. Stripe-stijl.

```tsx
const stats = [
  { value: '5+', label: 'Live projecten' },
  { value: '100%', label: 'Maatwerk' },
  { value: '< 24u', label: 'Reactietijd' },
  { value: 'Heel NL', label: 'Werkgebied' },
]
```

Design:
- `bg-white border-y border-slate-900/6 py-6`
- Flex row, justify-around, divide-x divide-slate-200
- Waarde: `font-headline text-2xl font-bold` met gradient-text-warm op de cijfers
- Label: `text-xs text-slate-500 uppercase tracking-widest mt-1`
- Reveal animatie: stagger 80ms per stat

Voeg toe aan `app/page.tsx` tussen `<HeroSection />` en `<ProblemSection />`.

---

## DEEL 4 — PROBLEM SECTION (`components/site/ProblemSection.tsx`)

Al grotendeels goed (numbered layout). Verbeteringen:

1. Headline: verkorten naar max 5 woorden: `"Drie redenen. Één oplossing."` of `"Waarom het niet converteert."`
2. Meer vertical padding: `py-20 lg:py-36`
3. Elke rij: meer `py-10` ipv `py-8`
4. De gradient nummers (01/02/03): vergroot naar `text-5xl`

---

## DEEL 5 — SERVICES SECTION MET BEELDEN (`components/site/ServicesSection.tsx`)

**Dit is de grootste verandering.** Van text-only grid naar Stripe-stijl feature cards MET beelden.

### Design specificatie

```
┌─────────────────────────────────────────┐
│  [FOTO links, 40% breedte]  [Tekst 60%] │  ← card 1 (horizontaal)
│  gradient overlay op foto               │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  [Tekst 60%]  [FOTO rechts, 40%]        │  ← card 2 (gespiegeld)
└─────────────────────────────────────────┘
```

**Op mobiel:** foto boven, tekst eronder.

### Implementatie

```tsx
const services = [
  {
    number: '01',
    title: 'Websites',
    description: 'Een professionele website die duidelijk laat zien wie je bent en waarom klanten voor jou kiezen.',
    href: '/diensten/websites',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80',
  },
  {
    number: '02',
    title: 'Webshops',
    description: 'Een webshop die logisch werkt voor je klanten en aansluit op je merk en doelgroep.',
    href: '/diensten/webshops',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
  },
  {
    number: '03',
    title: 'Apps & Dashboards',
    description: 'Maatwerk oplossingen voor bedrijven die meer overzicht willen of processen slimmer inrichten.',
    href: '/diensten/apps-dashboards',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
  },
  {
    number: '04',
    title: 'Automatisering',
    description: 'Koppelingen die handmatig werk verminderen en je bedrijf makkelijker laten draaien.',
    href: '/diensten/automatisering',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5734c3d0?w=900&q=80',
  },
]
```

### Card styling (elke service is een artikel, geen kaart)

```tsx
<article className="group grid lg:grid-cols-[0.9fr_1.1fr] overflow-hidden border-b border-slate-900/8 py-10 lg:py-14 gap-8 lg:gap-12 items-center">
  {/* Foto */}
  <div className="relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-2xl">
    <img
      src={service.image}
      alt={service.title}
      className="w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-[#06040c]/30 to-transparent" />
  </div>

  {/* Tekst */}
  <div>
    <span className="gradient-text-warm font-headline text-sm font-bold">{service.number}</span>
    <h3 className="mt-3 font-headline text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-slate-900">{service.title}</h3>
    <p className="mt-4 text-base leading-relaxed text-slate-500 max-w-sm">{service.description}</p>
    <Link href={service.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:gap-3 transition-all duration-200">
      Meer over {service.title.toLowerCase()} <ArrowRight size={14} />
    </Link>
  </div>
</article>
```

Op even-indexen: foto rechts (`lg:grid-cols-[1.1fr_0.9fr]` + order-last op foto).

Sectie achtergrond: `bg-white py-16 lg:py-28`.

---

## DEEL 6 — ABOUT ME SECTION (`components/site/AboutMeSection.tsx`)

**Wijzigingen:**

1. **Verwijder** de `rounded-2xl border border-slate-200 bg-white p-6 shadow-sm` card volledig.

2. **Vervang** door inline chips (geen kaart, geen border):

```tsx
<div className="mt-8 space-y-3">
  <div className="text-xs uppercase tracking-widest text-slate-400 mb-4">Hoe ik werk</div>
  {personalContactPoints.map((point) => (
    <div key={point} className="flex items-center gap-3">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
      />
      <span className="text-base text-slate-700">{point}</span>
    </div>
  ))}
</div>
```

3. **Sectie titel**: "Geen bureau. Iemand die meedenkt en bouwt." is goed — behouden.

4. Sectie bg: behoud `bg-slate-50`.

---

## DEEL 7 — REVIEWS SECTION (`components/site/ReviewsSection.tsx`)

**Volledige redesign.** Weg met kleine cards. Stripe-stijl grote quote.

### Nieuwe structuur

```tsx
<section className="relative bg-[#06040c] py-20 lg:py-36 overflow-hidden">
  <GrainOverlay opacity={0.04} />
  
  {/* Section header */}
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <Reveal>
      <span className="overline-badge overline-badge-dark mb-8 inline-flex">Ervaringen</span>
      <h2 className="font-headline font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: '0.98' }}>
        In hun eigen<br />
        <span className="gradient-text">woorden.</span>
      </h2>
    </Reveal>
  </div>

  {/* Featured quote — GROOT */}
  {featured && (
    <Reveal delay={80}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8 mt-16">
        <div className="relative">
          {/* Giant quotation mark */}
          <span
            className="pointer-events-none absolute -top-8 -left-4 select-none font-headline text-[8rem] leading-none font-bold opacity-15"
            style={{
              background: 'linear-gradient(135deg, #f97316, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            "
          </span>
          <blockquote
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] text-white"
          >
            {featured.content}
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <div>
              <div className="text-sm font-semibold text-white/80">{featured.name}</div>
              <div className="text-xs text-white/40">{featured.role}</div>
            </div>
            <Stars count={featured.rating} />
          </div>
        </div>
      </div>
    </Reveal>
  )}

  {/* Marquee (behoud maar verhoog kaartbreedte) */}
  {marqueeItems.length > 0 && (
    <Reveal delay={160}>
      <div className="mt-16 overflow-hidden">
        <div className="marquee-track flex gap-5" style={{ width: 'max-content' }}>
          {[...marqueeItems, ...marqueeItems].map((review, i) => (
            <article key={`${review.name}-${i}`} className="w-[340px] shrink-0 rounded-2xl border border-white/8 bg-white/[0.04] p-7">
              <Stars count={review.rating} />
              <p className="mt-4 text-sm leading-relaxed text-white/65">&ldquo;{review.content}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                <div>
                  <div className="text-sm font-semibold text-white/85">{review.name}</div>
                  <div className="mt-0.5 text-xs text-white/38">{review.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  )}
</section>
```

---

## DEEL 8 — WAVEPAGEHEADER TITELS FIXEN

**Bestand:** `components/site/WavePageHeader.tsx` en alle pagina's die het gebruiken.

**Probleem:** Titels zijn te lang. Fix de titels op de volgende pagina's:

- `app/(site)/diensten/page.tsx` — diensten WavePageHeader title:
  - **Huidig:** "Websites, webshops, apps en automatiseringen die aansluiten op hoe jouw bedrijf werkt"
  - **Nieuw title:** "Wat ik bouw."
  - **Nieuw titleHighlight:** "Digitaal maatwerk dat past."

- `app/(site)/over-ons/page.tsx`:
  - **Nieuw title:** "Geen bureau."
  - **Nieuw titleHighlight:** "Gewoon Daan."

- `app/(site)/contact/page.tsx`:
  - **Nieuw title:** "Laten we praten."
  - **Nieuw titleHighlight (optioneel):** leeg

- `app/(site)/projecten/page.tsx`:
  - **Nieuw title:** "Werk dat spreekt."
  - Verwijder eventuele subtitel die begint met "Wil je even sparren..."

**In WavePageHeader.tsx zelf:** vergroot de headline font size:
```tsx
style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)' }}
```
Leading aanpassen: `leading-[0.97]`

---

## DEEL 9 — PROJECTSSECTION CLEANUP

**Bestand:** `components/site/ProjectsSection.tsx`

- Sectie titel aanpassen (zoek het op en wijzig): naar `"Werk dat spreekt."` met gradient op "spreekt."
- Verwijder eventuele `subtitle` die begint met "Wil je even sparren..."
- Geen andere structurele wijzigingen nodig

---

## DEEL 10 — HOVER & MICRO-INTERACTION POLISH

Voeg toe aan alle interactieve elementen:

**Navigatielinks (Navbar):** al goed.

**Service-links:** `group-hover:translate-x-1` op ArrowRight iconen (al gebouwd).

**Projectkaarten:** voeg `transition-transform duration-300 ease-spring hover:-translate-y-1` toe.

**WhatsApp floating card (HeroSection):** voeg pulse animatie toe op de groene cirkel:
```tsx
<div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
```

---

## DEEL 11 — WAVEPAGEHADER ACHTERGROND VERBETEREN

**Bestand:** `components/site/WavePageHeader.tsx`

Voeg de animated gradient overlay toe (Stripe-stijl):

```tsx
{/* Animated gradient atmosphere */}
<div
  className="pointer-events-none absolute inset-0 animated-gradient-bg opacity-70"
/>
```

---

## VERIFICATIE CHECKLIST

Na elke grote wijziging: gebruik Playwright screenshots op:
1. `http://localhost:3001` — homepage (viewport + full page)
2. `http://localhost:3001/diensten` — services page header
3. `http://localhost:3001/over-ons` — about page header
4. `http://localhost:3001/projecten` — projects page header

Controleer per screenshot:
- [ ] Headlines zijn kort en impactvol (max 5-6 woorden per regel)
- [ ] Gradient text is zichtbaar op key phrases
- [ ] Geen cramped koppen (voldoende line-height)
- [ ] Services cards tonen afbeeldingen
- [ ] Reviews sectie: grote quote prominent
- [ ] AboutMe: geen card/border box zichtbaar
- [ ] Animaties werken (check bij page load)

---

## TECHNISCHE CONSTRAINTS

- Next.js 16 App Router — geen `pages/` directory
- Tailwind CSS v4 — geen `tailwind.config.js` nodig voor custom utils
- Framer Motion al geïnstalleerd (`motion` import)
- `'use client'` verplicht voor alle components met interactie/animatie
- Images via `next/image` voor productie-optimalisatie
- Externe afbeeldingen (Unsplash) moeten in `next.config.js` worden toegevoegd aan `images.domains` of `remotePatterns`
- Font variabelen: `--font-headline` (Bricolage), `--font-body-sans` (Geist)

**next.config.js check:** Voeg toe als niet aanwezig:
```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
}
```

---

## AFSLUITING

Na alle wijzigingen: maak een volledige Playwright full-page screenshot van de homepage en vergelijk mentaal met Stripe.com. Als het er bij lange na niet zo goed uitziet — ga terug en verfijn. Het doel is dat iemand die de site ziet denkt: *"Dit zit goed in elkaar."*

Commit alles met een duidelijke commit message: `feat: full redesign — Stripe/Apple-level visual overhaul`
