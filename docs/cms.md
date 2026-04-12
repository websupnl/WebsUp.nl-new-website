# CMS Documentation — BP-Uitgevers Admin

## Access

URL: `/admin`
Auth: Supabase email/password
Login page: `/admin/login`

---

## Dashboard (`/admin`)

Shows:
- 4 stat cards: publications, news articles, testimonials, new author requests
- Quick actions: new publication, new article, view author requests, view site
- Recent publications table (4 items)
- Recent news articles table (3 items)

---

## Publicaties (`/admin/publicaties`)

Full CRUD for publications.

### Form tabs:

**Tab 1: Algemene info**
| Field | DB column | Notes |
|---|---|---|
| Titel | `title` | Required, auto-generates slug in create mode |
| Slug | `slug` | Unique URL path `/publicaties/[slug]` |
| Samenvatting | `excerpt` | Short description, shown in hero on detail page |
| FlipHTML5 URL | `flip_url` | Embeds interactive reader iframe on detail page |

**Tab 2: Content blokken**
Block-based content builder. Three block types:
- **Tekst** — Title + paragraph text
- **Kenmerken** — Title + bullet list (one item per line → renders as cards)
- **Call-to-action** — Title + text + contact button

Blocks can be reordered (up/down), deleted, and saved independently via `savePublicationBlocks()`.

> In create mode, the blocks tab shows a message to save first.

**Tab 3: Instellingen**
| Field | DB column | Notes |
|---|---|---|
| Publicatiestatus | `published` | Toggle: Concept / Gepubliceerd |
| Uitgelichte afbeelding | `image_url` | Upload to Supabase media bucket or paste URL |

### Admin list view:
- Shows title, date, status badge (Gepubliceerd / Concept)
- Eye icon → view on site (published only)
- Pencil icon → edit

---

## Nieuws (`/admin/nieuws`)

CRUD for news articles.

### Form fields:
| Field | DB column | Notes |
|---|---|---|
| Titel | `title` | Required, auto-generates slug |
| Slug | `slug` | Unique URL `/nieuws/[slug]` |
| Samenvatting | `excerpt` | Shown on news grid cards |
| Inhoud | `content` | Rich text via TiptapEditor |
| Publicatiedatum | `published_at` | Date picker |
| Publicatiestatus | `published` | Toggle |
| Afbeelding | `image_url` | Upload or URL |

---

## Auteur aanvragen (`/admin/auteur-aanvragen`)

**Read-only** list of submissions from `/word-auteur` form.

Columns: Naam/Bedrijf, E-mail, Onderwerp, Datum, Status
Status: Nieuw (orange) → Behandeld (green)

"Markeer als behandeld" button → calls `updateAuthorRequestStatus(id, 'contacted')` with optimistic UI update.

No create/delete functionality — only status management.

---

## Testimonials (`/admin/testimonials`)

CRUD for customer testimonials.

Fields: Naam, Functie/bedrijf, Beoordeling (star rating 1-5), Testimonial tekst, Avatar URL, Gepubliceerd toggle.

Shown on homepage via `TestimonialsSection` (only published).

---

## Instellingen (`/admin/instellingen`)

Settings page with 6 tabs. Changes are saved per tab with sticky "Opslaan" button.

### Tab: Branding
- Site naam, tagline, logo upload (light + dark), favicon
- Primaire kleur, secundaire kleur, font

### Tab: Bedrijfsinfo
- E-mail, telefoon, adres, LinkedIn URL

### Tab: SEO
- Meta title, meta description, keywords, canonical URL
- OG title, OG description, Google Analytics ID

### Tab: Navigatie
- Add/remove/reorder nav items
- Each item: label, URL, type (internal/external), location (header/footer)

### Tab: Modules
- Feature flags: Blog, Testimonials, CTA sectie, Contactformulier
- Toggle enabled/disabled per module

### Tab: Formulieren
- Form builder for contact forms
- Each form: name, email-to address, custom fields (text/email/textarea/phone/select)

---

## What Is and Isn't CMS-Editable

### ✅ Editable via admin dashboard:
- Publications (title, excerpt, flip_url, blocks, image, published)
- News articles (all fields)
- Testimonials (all fields)
- Author requests (status only)
- Site name, tagline, logo, colors
- Contact info (email, phone, address, LinkedIn)
- SEO settings (all meta tags, GA id)
- Navigation items (header + footer)
- Module toggles
- Custom forms

### ❌ Not CMS-editable (hardcoded in `config/site.config.ts`):
- Hero section text (heading, subheading, CTA labels)
- Feature cards (USP blocks)
- About section text on homepage
- Word-auteur benefits
- Doelgroep blocks
- CTA section text
- Footer legal links
- Stats bar values (500+, 1.200+, 15+)

> To change these per client: edit `config/site.config.ts`
