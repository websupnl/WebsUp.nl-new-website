-- Migrate news_articles from published boolean to status enum
-- This is a non-breaking migration that migrates existing data

-- 1. Migrate existing published=true to status='published'
UPDATE news_articles
SET status = 'published'
WHERE published = true AND status = 'draft';

-- 2. Ensure RLS policies are correct
DROP POLICY IF EXISTS "Public kan gepubliceerde artikelen lezen" ON news_articles;

CREATE POLICY "Public kan gepubliceerde artikelen lezen"
  ON news_articles FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Auth kan nieuws bewerken" ON news_articles;

CREATE POLICY "Auth kan nieuws bewerken"
  ON news_articles FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Note: The 'published' boolean column is kept for backwards compatibility
-- but is no longer used. It will be dropped in a future migration if needed.

