const http = require('http')

const url = `http://api.weatherstack.com/current?access_key=821d5e0862c7454c106f41646825c332&query=washington`

const request = http.request(url, response => {
  let data = ''

  response.on('data', chunk => {
    data += chunk.toString()
  })

  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })

  response.on('error', error => {
    console.log(error)
  })
})

request.end()