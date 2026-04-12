const http = require('http')

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/migrate-news-status',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
}

const req = http.request(options, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    console.log('\n✅ Migration API Response:\n')
    try {
      const result = JSON.parse(data)
      console.log(result)
      console.log('\n🎉 Done!')
      process.exit(0)
    } catch (e) {
      console.error('Error parsing response:', data)
      process.exit(1)
    }
  })
})

req.on('error', (error) => {
  console.error('❌ Error:', error.message)
  process.exit(1)
})

console.log('🔄 Calling /api/migrate-news-status...')
req.end()
