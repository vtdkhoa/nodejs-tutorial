const https = require('https')

const start = Date.now()

https.request('https://www.google.com.vn', res => {
  res.on('data', () => {})
  res.on('end', () => {
    console.log(Date.now() - start)
  })
}).end()