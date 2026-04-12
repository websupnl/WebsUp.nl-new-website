-- ============================================================
-- BP-UITGEVERS — Complete Supabase Schema
-- Last updated: 2026-03-24
-- Run this in Supabase SQL Editor for a fresh project setup
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- TENANTS
-- ============================================================
create table if not exists tenants (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  domain     text,
  created_at timestamptz not null default now()
);

-- Default single tenant
insert into tenants (id, name, domain)
values ('00000000-0000-0000-0000-000000000001', 'Default', 'localhost')
on conflict (id) do nothing;

-- ============================================================
-- SITE_SETTINGS (branding + company info, one row per tenant)
-- ============================================================
create table if not exists site_settings (
  id              uuid primary key default uuid_generate_v4(),
  tenant_id       uuid not null references tenants(id) on delete cascade,
  site_name       text,
  tagline         text,
  logo_url        text,
  logo_dark_url   text,
  favicon_url     text,
  primary_color   text default '#2563EB',
  secondary_color text default '#1E293B',
  font_family     text default 'Inter',
  email           text,
  phone           text,
  address         text,
  linkedin_url    text,
  og_image_url    text,
  updated_at      timestamptz not null default now(),
  unique (tenant_id)
);

alter table site_settings enable row level security;
create policy "Public kan site_settings lezen"
  on site_settings for select using (true);
create policy "Auth kan site_settings bewerken"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into site_settings (tenant_id)
values ('00000000-0000-0000-0000-000000000001')
on conflict (tenant_id) do nothing;

-- ============================================================
-- SEO_SETTINGS (one row per tenant)
-- ============================================================
create table if not exists seo_settings (
  id                   uuid primary key default uuid_generate_v4(),
  tenant_id            uuid not null references tenants(id) on delete cascade,
  meta_title           text,
  meta_description     text,
  keywords             text,
  canonical_url        text,
  og_title             text,
  og_description       text,
  google_analytics_id  text,
  updated_at           timestamptz not null default now(),
  unique (tenant_id)
);

alter table seo_settings enable row level security;
create policy "Public kan seo_settings lezen"
  on seo_settings for select using (true);
create policy "Auth kan seo_settings bewerken"
  on seo_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into seo_settings (tenant_id)
values ('00000000-0000-0000-0000-000000000001')
on conflict (tenant_id) do nothing;

-- ============================================================
-- NAVIGATION_ITEMS
-- ============================================================
create table if not exists navigation_items (
  id          uuid primary key default uuid_generate_v4(),
  tenant_id   uuid not null references tenants(id) on delete cascade,
  label       text not null,
  url         text not null,
  type        text not null default 'internal' check (type in ('internal', 'external')),
  location    text not null default 'header' check (location in ('header', 'footer')),
  order_index int not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists nav_items_tenant_idx
  on navigation_items(tenant_id, location, order_index);

alter table navigation_items enable row level security;
create policy "Public kan navigation_items lezen"
  on navigation_items for select using (true);
create policy "Auth kan navigation_items bewerken"
  on navigation_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Default nav items
insert into navigation_items (tenant_id, label, url, type, location, order_index) values
  ('00000000-0000-0000-0000-000000000001', 'Home',        '/',            'internal', 'header', 0),
  ('00000000-0000-0000-0000-000000000001', 'Publicaties', '/publicaties', 'internal', 'header', 1),
  ('00000000-0000-0000-0000-000000000001', 'Nieuws',      '/nieuws',      'internal', 'header', 2),
  ('00000000-0000-0000-0000-000000000001', 'Over ons',    '/over-ons',    'internal', 'header', 3),
  ('00000000-0000-0000-0000-000000000001', 'Contact',     '/contact',     'internal', 'header', 4)
on conflict do nothing;

-- ============================================================
-- MODULES (feature flags per tenant)
-- ============================================================
create table if not exists modules (
  id         uuid primary key default uuid_generate_v4(),
  tenant_id  uuid not null references tenants(id) on delete cascade,
  key        text not null,
  enabled    boolean not null default true,
  label      text,
  updated_at timestamptz not null default now(),
  unique (tenant_id, key)
);

alter table modules enable row level security;
create policy "Public kan modules lezen"
  on modules for select using (true);
create policy "Auth kan modules bewerken"
  on modules for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into modules (tenant_id, key, enabled, label) values
  ('00000000-0000-0000-0000-000000000001', 'blog',         true, 'Blog / Nieuws'),
  ('00000000-0000-0000-0000-000000000001', 'testimonials', true, 'Testimonials'),
  ('00000000-0000-0000-0000-000000000001', 'cta',          true, 'CTA sectie'),
  ('00000000-0000-0000-0000-000000000001', 'contact_form', true, 'Contactformulier')
on conflict (tenant_id, key) do nothing;

-- ============================================================
-- FORMS (form builder)
-- ============================================================
create table if not exists forms (
  id         uuid primary key default uuid_generate_v4(),
  tenant_id  uuid not null references tenants(id) on delete cascade,
  name       text not null,
  email_to   text,
  fields     jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table forms enable row level security;
create policy "Public kan forms lezen"
  on forms for select using (true);
create policy "Auth kan forms bewerken"
  on forms for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- PUBLICATIONS
-- ============================================================
create table if not exists publications (
  id          uuid primary key default uuid_generate_v4(),
  tenant_id   uuid references tenants(id) on delete cascade,
  title       text not null,
  slug        text not null unique,
  description text,
  excerpt     text,
  label       text,
  flip_url    text,
  content     text,
  image_url   text,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists publications_slug_idx
  on publications(slug);
create index if not exists publications_published_idx
  on publications(published, created_at desc);
create index if not exists publications_tenant_idx
  on publications(tenant_id, published, created_at desc);

alter table publications enable row level security;
create policy "Public kan gepubliceerde publicaties lezen"
  on publications for select
  using (published = true);
create policy "Auth gebruikers kunnen alles met publicaties"
  on publications for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- PUBLICATION_BLOCKS (flexible content blocks per publication)
-- ============================================================
create table if not exists publication_blocks (
  id             uuid primary key default uuid_generate_v4(),
  publication_id uuid not null references publications(id) on delete cascade,
  type           text not null default 'text' check (type in ('text', 'features', 'cta')),
  title          text,
  content        text,
  order_index    int not null default 0,
  created_at     timestamptz not null default now()
);

create index if not exists pub_blocks_pub_idx
  on publication_blocks(publication_id, order_index);

alter table publication_blocks enable row level security;
create policy "Public kan publication_blocks lezen"
  on publication_blocks for select using (true);
create policy "Auth kan publication_blocks bewerken"
  on publication_blocks for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table if not exists testimonials (
  id         uuid primary key default uuid_generate_v4(),
  tenant_id  uuid references tenants(id) on delete cascade,
  name       text not null,
  role       text,
  content    text not null,
  rating     int not null default 5 check (rating >= 1 and rating <= 5),
  avatar_url text,
  published  boolean not null default false,
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;
create policy "Public kan gepubliceerde testimonials lezen"
  on testimonials for select
  using (published = true);
create policy "Auth gebruikers kunnen alles met testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- NEWS_ARTICLES
-- ============================================================
create table if not exists news_articles (
  id           uuid primary key default uuid_generate_v4(),
  tenant_id    uuid not null default '00000000-0000-0000-0000-000000000001'
               references tenants(id) on delete cascade,
  title        text not null,
  slug         text not null unique,
  excerpt      text,
  content      text,
  image_url    text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists news_slug_idx
  on news_articles(slug);
create index if not exists news_status_idx
  on news_articles(status, created_at desc);

alter table news_articles enable row level security;
create policy "Public kan gepubliceerde artikelen lezen"
  on news_articles for select
  using (status = 'published');
create policy "Auth kan nieuws bewerken"
  on news_articles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- AUTHOR_REQUESTS (word-auteur form submissions)
-- ============================================================
create table if not exists author_requests (
  id         uuid primary key default uuid_generate_v4(),
  tenant_id  uuid not null default '00000000-0000-0000-0000-000000000001'
             references tenants(id) on delete cascade,
  name       text not null,
  company    text,
  email      text not null,
  subject    text,
  message    text,
  status     text not null default 'new' check (status in ('new', 'contacted')),
  created_at timestamptz not null default now()
);

alter table author_requests enable row level security;
-- Public can insert (form submission without login)
create policy "Public kan auteur aanvragen indienen"
  on author_requests for insert
  with check (true);
create policy "Auth kan auteur aanvragen lezen en bewerken"
  on author_requests for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- PAGES (static CMS pages — currently unused in frontend)
-- ============================================================
create table if not exists pages (
  id               uuid primary key default uuid_generate_v4(),
  tenant_id        uuid references tenants(id) on delete cascade,
  title            text not null,
  slug             text not null unique,
  content          text,
  meta_description text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table pages enable row level security;
create policy "Public kan pagina's lezen"
  on pages for select using (true);
create policy "Auth kan pagina's bewerken"
  on pages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET: media
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict do nothing;

create policy "Public kan media lezen"
  on storage.objects for select
  using (bucket_id = 'media');
create policy "Auth kan media uploaden"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "Auth kan media updaten"
  on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "Auth kan media verwijderen"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');

-- ============================================================
-- CHAT_CONVERSATIONS
-- ============================================================
create table if not exists chat_conversations (
  id         uuid primary key default uuid_generate_v4(),
  status     text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now()
);

alter table chat_conversations enable row level security;
create policy "Public kan conversations aanmaken"
  on chat_conversations for insert
  with check (true);
create policy "Auth kan conversations lezen en bewerken"
  on chat_conversations for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- CHAT_MESSAGES
-- ============================================================
create table if not exists chat_messages (
  id              uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references chat_conversations(id) on delete cascade,
  sender          text not null check (sender in ('user', 'admin')),
  message         text not null,
  created_at      timestamptz not null default now()
);

create index if not exists chat_messages_conv_idx
  on chat_messages(conversation_id, created_at asc);

alter table chat_messages enable row level security;
create policy "Public kan berichten sturen"
  on chat_messages for insert
  with check (true);
create policy "Public kan berichten lezen"
  on chat_messages for select
  using (true);
create policy "Auth kan berichten beheren"
  on chat_messages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
