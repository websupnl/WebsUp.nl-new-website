-- Harden broad public access and improve tenant-aware query performance.

create index if not exists testimonials_tenant_published_idx
  on testimonials(tenant_id, published, created_at desc);

create index if not exists news_articles_tenant_status_idx
  on news_articles(tenant_id, status, created_at desc);

drop policy if exists "Public kan publication_blocks lezen" on publication_blocks;
create policy "Public kan publication_blocks van gepubliceerde publicaties lezen"
  on publication_blocks for select
  using (
    exists (
      select 1
      from publications
      where publications.id = publication_blocks.publication_id
        and publications.published = true
    )
    or auth.role() = 'authenticated'
  );

drop policy if exists "Public kan forms lezen" on forms;
create policy "Auth kan forms lezen"
  on forms for select
  using (auth.role() = 'authenticated');

drop policy if exists "Public kan berichten lezen" on chat_messages;
create policy "Auth kan berichten lezen"
  on chat_messages for select
  using (auth.role() = 'authenticated');

drop policy if exists "Public kan conversations aanmaken" on chat_conversations;
create policy "Auth kan conversations aanmaken"
  on chat_conversations for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "Public kan berichten sturen" on chat_messages;
create policy "Auth kan berichten sturen"
  on chat_messages for insert
  with check (auth.role() = 'authenticated');
