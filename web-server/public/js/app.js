let city = document.querySelector('input')

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  fetch(`http://localhost:3000/weather?city=${city.value}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        document.querySelector('#error').innerHTML = data.error
      } else {
        document.querySelector('#location').innerHTML = `Location: ${data.location}`
        document.querySelector('#observation_time').innerHTML = `Time: ${data.forecast.observation_time}`
        document.querySelector('#weather_description').innerHTML = `Weather description: ${data.forecast.weather_descriptions}`
        document.querySelector('#temperature').innerHTML = `Temperature: ${data.forecast.temperature}&#8451;`
        document.querySelector('#wind_speed').innerHTML = `Wind speed: ${data.forecast.wind_speed} km/h`
        document.querySelector('#wind_degree').innerHTML = `Wind degree: ${data.forecast.wind_degree}`
        document.querySelector('#pressure').innerHTML = `Pressure: ${data.forecast.pressure} MB`
        document.querySelector('#precip').innerHTML = `Precip: ${data.forecast.precip} MM`
        document.querySelector('#humidity').innerHTML = `Humidity: ${data.forecast.humidity} %`
      }
    })
  })
})

document.querySelector('#clear-btn').addEventListener('click', () => {
  city.value = ''
  window.location.reload()
})