#!/usr/bin/env node
const http = require('http')

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/migrate-news-status',
  method: 'POST',
}, (res) => {
  let data = ''
  res.on('data', chunk => data += chunk)
  res.on('end', () => {
    try {
      console.log(JSON.stringify(JSON.parse(data), null, 2))
    } catch (e) {
      console.log(data)
    }
  })
})
req.on('error', e => console.error('Error:', e.message))
req.end()
