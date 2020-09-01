const fs = require('fs')

const book = {
  title: 'The Lord of the Rings',
  author: 'J. R. R. Tolkien'
}

const bookJSON = JSON.stringify(book)
console.log(bookJSON)

const parsedData = JSON.parse(bookJSON)
console.log(parsedData.title)

// fs.writeFileSync('books.json', bookJSON)

const dataBuffer = fs.readFileSync('books.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)

console.log(data.author)