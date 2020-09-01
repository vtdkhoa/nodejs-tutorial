const request = require('request')

const publicToken = 'pk.eyJ1Ijoia2hvYXZ0ZCIsImEiOiJja2UybTYyNncwYXM2MnJtd2g5dXdsYTY4In0.TdER4ldhEAPT_jmy9saf5g'

const geocode = (city, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${publicToken}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', null)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', null)
    } else {
      callback(null, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode