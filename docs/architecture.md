# Architecture — BP-Uitgevers

## Overview

Next.js 16 (App Router) + Supabase. Two distinct zones:
- **Public site** (`app/(site)/`) — server-rendered, ISR where needed
- **Admin CMS** (`app/admin/`) — authenticated, client-heavy

---

## Folder Structure

```
app/
├── layout.tsx              Root layout (fonts, global metadata)
├── page.tsx                Redirect or homepage shell
├── (site)/                 Public website route group
│   ├── layout.tsx          Loads Navbar + Footer with DB settings
│   ├── page.tsx            Homepage (NOT in this group — see app/page.tsx)
│   ├── over-ons/page.tsx
│   ├── publicaties/
│   │   ├── page.tsx        Publications grid
│   │   └── [slug]/page.tsx Publication detail (ISR revalidate=60)
│   ├── nieuws/
│   │   ├── page.tsx        News grid (ISR revalidate=60)
│   │   └── [slug]/page.tsx News detail (ISR revalidate=60)
│   ├── contact/page.tsx
│   ├── word-auteur/page.tsx  Author request form (client component)
│   └── magazine-voor-organisaties/page.tsx  Conversion landing page
└── admin/
    ├── layout.tsx          Auth check, renders AdminSidebar + AdminHeader
    ├── page.tsx            Dashboard with stats
    ├── login/page.tsx      Supabase auth form
    ├── publicaties/        CRUD for publications + blocks
    ├── nieuws/             CRUD for news articles
    ├── testimonials/       CRUD for testimonials
    ├── auteur-aanvragen/   Read-only list + status toggle
    └── instellingen/       Settings (branding, SEO, nav, modules, forms)

components/
├── site/                   All public-facing components
│   ├── Navbar.tsx          Sticky, auth-aware (Login/Dashboard button)
│   ├── Footer.tsx          Logo, nav links, OtterMedia credit
│   ├── HeroSection.tsx     Configurable hero with trust badges
│   ├── FeatureCards.tsx    USP cards, dark/light variant
│   ├── PublicationCard.tsx Card for a single publication
│   ├── PublicationGrid.tsx Grid of PublicationCards
│   ├── PublicationBlockRenderer.tsx  Renders text/features/cta blocks
│   ├── PublicationViewer.tsx  FlipHTML5 iframe embed (client)
│   ├── NewsCard.tsx        Card for a news article
│   ├── LatestNewsSection.tsx  3 recent news articles
│   ├── AboutSection.tsx    Two-column about section
│   ├── CTASection.tsx      Split dark/image CTA
│   ├── TestimonialsSection.tsx  Grid of testimonial cards
│   ├── WordAuteurSection.tsx  Dark bg, 3 benefits + CTA
│   ├── DoelgroepSection.tsx   3 target audience blocks
│   └── VoorWieSection.tsx     4 target groups with hover animation
└── admin/
    ├── AdminSidebar.tsx    Left nav (desktop only)
    ├── AdminHeader.tsx     Top bar (mobile menu trigger)
    ├── PublicationForm.tsx Tabbed form (info/blocks/settings)
    ├── BlockBuilder.tsx    Add/edit/reorder content blocks
    ├── NewsForm.tsx        News article form
    ├── TestimonialForm.tsx Testimonial form
    ├── TiptapEditor.tsx    Rich text editor
    ├── MediaUploader.tsx   Image upload helper
    └── settings/           Settings sub-sections (one per tab)
        ├── BrandingSection.tsx
        ├── BedrijfsinfoSection.tsx
        ├── SeoSection.tsx
        ├── NavigatieSection.tsx
        ├── ModulesSection.tsx
        └── FormBuilderSection.tsx

lib/
├── supabase/
│   ├── server.ts           createServerSupabaseClient() — used in server components/actions
│   └── client.ts           createClient() — used in 'use client' components
├── queries/                Server-side read functions (no mutations)
│   ├── publications.ts
│   ├── news.ts
│   ├── testimonials.ts
│   ├── site-settings.ts    getMergedSiteSettings(), getNavigationItems(), etc.
│   └── settings.ts         Legacy key-value settings (rarely used)
├── actions/                Server actions ('use server', mutations + revalidatePath)
│   ├── publications.actions.ts
│   ├── news.actions.ts
│   ├── author-requests.actions.ts
│   └── settings.actions.ts  All settings CRUD
├── tenant.ts               getTenantId() — fixed UUID for single-tenant
└── utils.ts                slugify, formatDate, truncate, cn, getStorageUrl

config/
└── site.config.ts          All static defaults — update per client

types/
└── database.types.ts       TypeScript types mirroring DB schema

supabase/
├── schema.sql              CURRENT complete schema (run this for new projects)
└── schema_v2.sql           Legacy — superseded by schema.sql
```

---

## Data Flow

### Public page (server component):
```
page.tsx
  → lib/queries/xxx.ts          (Supabase SELECT)
  → components/site/Section.tsx (renders data)
     → config/site.config.ts    (fallback defaults)
```

### Admin mutation:
```
components/admin/Form.tsx  ('use client')
  → lib/actions/xxx.actions.ts  ('use server')
     → createServerSupabaseClient()
     → supabase.from('table').insert/update/delete
     → revalidatePath()
```

### Settings system (merged pattern):
```
getMergedSiteSettings()
  → getSiteSettings() from Supabase
  → merge with siteConfig fallbacks
  → used in app/(site)/layout.tsx
```

---

## Homepage Structure

Section order in `app/page.tsx`:
1. HeroSection
2. FeatureCards (dark variant)
3. PublicationGrid (3 latest)
4. WordAuteurSection
5. DoelgroepSection
6. VoorWieSection
7. AboutSection
8. LatestNewsSection (only renders if articles exist)
9. CTASection
10. TestimonialsSection

---

## Publication System

Publications have a **two-layer content model**:
1. **Core fields**: title, slug, excerpt, image, flip_url, published
2. **Content blocks**: `publication_blocks` table (text / features / cta)

Detail page layout: Hero → Stats bar → FlipHTML5 viewer (if flip_url) → Content blocks → CTA → Related

Admin editor: 3 tabs — Algemene info | Content blokken | Instellingen

---

## Auth System

- Supabase Auth (email + password)
- `app/admin/layout.tsx` checks session server-side
- If no session → renders children directly (= login page, no infinite redirect)
- Browser client (`createClient()`) used in Navbar to show Login/Dashboard button

---

## Stats Bar Pattern

Every public page hero has a consistent blue stats bar below the hero image:
```
500+ Publicaties | 1.200+ Lezers | 15+ Jaar | 100% Zakelijk
```
This is inline in each page file (not a shared component) to keep pages independent.
