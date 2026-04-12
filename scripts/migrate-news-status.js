#!/usr/bin/env node

/**
 * Migrate news_articles from published boolean to status enum
 * Run: node scripts/migrate-news-status.js
 */

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrate() {
  try {
    console.log('🔄 Starting migration: published boolean → status enum...\n')

    // 1. Migrate existing published=true to status='published'
    console.log('1️⃣ Migrating published=true articles to status=published...')
    const { data, error: updateError } = await supabase
      .from('news_articles')
      .update({ status: 'published' })
      .eq('published', true)
      .select('id, title, status')

    if (updateError) {
      console.error('❌ Update failed:', updateError)
      process.exit(1)
    }

    console.log(`✅ Updated ${data?.length || 0} articles to status=published\n`)

    // 2. Verify all articles now have correct status
    console.log('2️⃣ Verifying all articles have valid status...')
    const { data: allArticles, error: verifyError } = await supabase
      .from('news_articles')
      .select('id, title, status, published')

    if (verifyError) {
      console.error('❌ Verification failed:', verifyError)
      process.exit(1)
    }

    const byStatus = {
      draft: 0,
      published: 0,
      invalid: 0,
    }

    allArticles?.forEach((article) => {
      if (article.status === 'draft') byStatus.draft++
      else if (article.status === 'published') byStatus.published++
      else byStatus.invalid++
    })

    console.log(`✅ Verification complete:`)
    console.log(`   - Draft articles: ${byStatus.draft}`)
    console.log(`   - Published articles: ${byStatus.published}`)
    if (byStatus.invalid > 0) {
      console.warn(`   ⚠️  Invalid status articles: ${byStatus.invalid}`)
    }

    // 3. Check for articles that should be visible but aren't
    const { data: publishedCount } = await supabase
      .from('news_articles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')

    console.log(`\n3️⃣ Public query test (status='published'):`)
    console.log(`✅ Articles that will appear on /nieuws: ${publishedCount || 0}\n`)

    console.log('🎉 Migration complete! Articles should now appear on /nieuws')
  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

migrate()
