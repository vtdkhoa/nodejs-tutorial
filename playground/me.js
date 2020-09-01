const fs = require('fs')

const me = {
  name: 'Khoa',
  planet: 'Earth',
  age: 24
}

// Create JSON data
const meJSON = JSON.stringify(me)
const parsedData = JSON.parse(meJSON)
console.log(`My name is ${parsedData.name}`)
fs.writeFileSync('json/me.json', meJSON)

// Edit JSON data
const dataBuffer = fs.readFileSync('json/me.json')
const dataJSON = dataBuffer.toString()
const updatedMe = JSON.parse(dataJSON)

updatedMe.name = 'Dang Khoa'
const updatedMeJSON = JSON.stringify(updatedMe)
fs.writeFileSync('json/me.json', updatedMeJSON)