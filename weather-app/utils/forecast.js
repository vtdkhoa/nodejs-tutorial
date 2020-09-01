const request = require('request')

const apiKey = '821d5e0862c7454c106f41646825c332'

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', null)
    } else if (body.error) {
      callback('Unable to find location.', null)
    } else {
      callback(null, {
        temperature: body.current.temperature,
        precip: body.current.precip
      })
    }
  })
}

module.exports = forecast