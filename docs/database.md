# Database Documentation — BP-Uitgevers

## Supabase Project

Production schema is in `supabase/schema.sql` — run this to set up a new project.

Tenant ID (fixed, single-tenant): `00000000-0000-0000-0000-000000000001`

---

## Tables Overview

| Table | Purpose | Tenant-aware |
|---|---|---|
| `tenants` | Tenant registry (single row for now) | — |
| `site_settings` | Branding + company info | ✅ |
| `seo_settings` | Meta tags, OG, GA ID | ✅ |
| `navigation_items` | Header + footer nav links | ✅ |
| `modules` | Feature flags per tenant | ✅ |
| `forms` | Form builder definitions | ✅ |
| `publications` | Core publication content | ✅ |
| `publication_blocks` | Flexible content blocks per publication | via FK |
| `testimonials` | Customer reviews | ✅ |
| `news_articles` | Blog/news content | ✅ |
| `author_requests` | Word-auteur form submissions | ✅ |
| `pages` | Static CMS pages (unused) | ✅ |
| `settings` | Legacy key-value store (unused) | ✗ |

---

## Table Details

### `tenants`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | `00000000-0000-0000-0000-000000000001` for default |
| name | text | "Default" |
| domain | text | "localhost" |
| created_at | timestamptz | |

---

### `site_settings`
One row per tenant. Managed via Admin → Instellingen → Branding/Bedrijfsinfo tabs.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid FK → tenants | UNIQUE |
| site_name | text | |
| tagline | text | |
| logo_url | text | Supabase storage URL |
| logo_dark_url | text | Dark variant |
| favicon_url | text | |
| primary_color | text | HEX, default `#2563EB` |
| secondary_color | text | default `#1E293B` |
| font_family | text | default `Inter` |
| email | text | |
| phone | text | |
| address | text | |
| linkedin_url | text | |
| og_image_url | text | |
| updated_at | timestamptz | |

---

### `seo_settings`
One row per tenant. Admin → Instellingen → SEO.

| Column | Type |
|---|---|
| meta_title | text |
| meta_description | text |
| keywords | text |
| canonical_url | text |
| og_title | text |
| og_description | text |
| google_analytics_id | text |

---

### `navigation_items`
Admin → Instellingen → Navigatie.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid FK | |
| label | text | Display name |
| url | text | Path or full URL |
| type | text | `internal` / `external` |
| location | text | `header` / `footer` |
| order_index | int | Sort order |
| created_at | timestamptz | |

---

### `modules`
Feature flags. Admin → Instellingen → Modules.

| Column | Type | Notes |
|---|---|---|
| key | text | `blog`, `testimonials`, `cta`, `contact_form` |
| enabled | boolean | |
| label | text | Display name |

Unique constraint: `(tenant_id, key)`

---

### `publications`
Core publications. Admin → Publicaties.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid FK → tenants | |
| title | text | Required |
| slug | text | UNIQUE, URL path |
| description | text | Legacy description field |
| excerpt | text | Short intro shown in hero |
| flip_url | text | FlipHTML5 embed URL |
| content | text | Legacy HTML content (Tiptap) |
| image_url | text | Cover image |
| published | boolean | Default false |
| created_at | timestamptz | |
| updated_at | timestamptz | |

Indexes: `slug`, `(published, created_at desc)`

---

### `publication_blocks`
Flexible content blocks linked to a publication.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| publication_id | uuid FK → publications | CASCADE delete |
| type | text | `text` / `features` / `cta` |
| title | text | Block heading |
| content | text | For `features`: newline-separated items |
| order_index | int | Sort order |
| created_at | timestamptz | |

Saved/replaced atomically via `savePublicationBlocks()` (delete all → insert new).

---

### `testimonials`
Customer testimonials. Admin → Testimonials.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid FK → tenants | |
| name | text | |
| role | text | Functie / bedrijf |
| content | text | Quote text |
| rating | int | 1–5, check constraint |
| avatar_url | text | |
| published | boolean | |
| created_at | timestamptz | |

---

### `news_articles`
News/blog articles. Admin → Nieuws.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid FK → tenants | |
| title | text | |
| slug | text | UNIQUE |
| excerpt | text | Shown on grid cards |
| content | text | HTML (Tiptap) |
| image_url | text | |
| published | boolean | |
| published_at | timestamptz | Date displayed on site |
| created_at | timestamptz | |
| updated_at | timestamptz | |

---

### `author_requests`
Form submissions from `/word-auteur`. Admin → Auteur aanvragen.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid FK → tenants | |
| name | text | |
| company | text | Optional |
| email | text | |
| subject | text | Optional vakgebied |
| message | text | Optional |
| status | text | `new` / `contacted` |
| created_at | timestamptz | |

---

### `forms`
Form builder definitions. Admin → Instellingen → Formulieren.

| Column | Type | Notes |
|---|---|---|
| name | text | Internal form name |
| email_to | text | Notification email |
| fields | jsonb | Array of FormFieldDef objects |

FormFieldDef shape:
```json
{ "id": "...", "type": "text|email|textarea|phone|select", "label": "...", "placeholder": "...", "required": true, "options": [] }
```

---

### `pages` (unused)
Static page content. Not currently wired to the frontend.

---

### `settings` (legacy, unused)
Old key-value store. Superseded by `site_settings`. Not actively used.

---

## RLS Policies Summary

All tables follow the same pattern:
- `SELECT`: public (no auth needed)
- `INSERT/UPDATE/DELETE`: `auth.role() = 'authenticated'`

Exception: `author_requests` insert is public (form submissions don't require login).

---

## Storage

Bucket: `media` (public)
- Publications cover images: `publications/{timestamp}.{ext}`
- News images: `news/{timestamp}.{ext}`
- General uploads: `{tenant_id}/{timestamp}-{filename}`

RLS: public read, authenticated write/delete.

---

## Relationships

```
tenants
  └─ site_settings (1:1)
  └─ seo_settings (1:1)
  └─ navigation_items (1:N)
  └─ modules (1:N)
  └─ forms (1:N)
  └─ publications (1:N)
       └─ publication_blocks (1:N, CASCADE)
  └─ testimonials (1:N)
  └─ news_articles (1:N)
  └─ author_requests (1:N)
```
