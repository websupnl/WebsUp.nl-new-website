const fs = require('fs')
const path = require('path')

// Load .env.local
const envPath = path.join(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const env = {}

envContent.split('\n').forEach((line) => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length > 0) {
    env[key.trim()] = valueParts.join('=').trim()
  }
})

const { createClient } = require('@supabase/supabase-js')

async function migrate() {
  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.error('❌ Missing Supabase env vars')
    console.error('   URL:', url ? '✓' : '✗')
    console.error('   KEY:', key ? '✓' : '✗')
    process.exit(1)
  }

  console.log('🔄 Connecting to Supabase...')
  const supabase = createClient(url, key)

  try {
    console.log('📝 Migrating published=true to status=published...\n')

    const { data, error } = await supabase
      .from('news_articles')
      .update({ status: 'published' })
      .eq('published', true)
      .select('id, title, status')

    if (error) {
      console.error('❌ Error:', error.message)
      process.exit(1)
    }

    console.log(`✅ Updated ${data?.length || 0} articles\n`)
    if (data?.length > 0) {
      data.forEach((a) => console.log(`   - ${a.title}`))
    }

    console.log('\n📊 Verification...')
    const { data: all } = await supabase
      .from('news_articles')
      .select('id, status')

    const draft = all?.filter((a) => a.status === 'draft').length || 0
    const published = all?.filter((a) => a.status === 'published').length || 0

    console.log(`   Draft: ${draft}`)
    console.log(`   Published: ${published}`)
    console.log(`\n🎉 Done! Check /nieuws for published articles.`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

migrate()
