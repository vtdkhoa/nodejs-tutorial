const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../views/partials'))

app.get('/', (req, res) => {
  res.render('layouts', {
    title: 'Home',
    pageText: 'Welcome to Weather app,',
    author: 'Khoa Vo'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.city) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  geocode(req.query.city, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        city: req.query.city
      })
    })
  })
})

app.get('/about', (req, res) => {
  res.render('layouts/about', {
    title: 'About',
    author: 'Khoa Vo'
  })
})

app.get('*', (req, res) => {
  res.render('layouts/404', {
    title: '404',
    errorMessage: 'Page Not Found',
    author: 'Khoa Vo'
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})