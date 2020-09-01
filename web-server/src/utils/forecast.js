const request = require('request')

const apiKey = '821d5e0862c7454c106f41646825c332'

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}&units=m`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, {
        observation_time: body.current.observation_time,
        temperature: body.current.temperature,
        weather_descriptions: body.current.weather_descriptions[0],
        wind_speed: body.current.wind_speed,
        wind_degree: body.current.wind_degree,
        pressure: body.current.pressure,
        precip: body.current.precip,
        humidity: body.current.humidity
      })
    }
  })
}

module.exports = forecast