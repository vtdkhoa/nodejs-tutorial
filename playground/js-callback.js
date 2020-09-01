const doWorkCallback = callback => {
  setTimeout(() => {
    // error
    // callback('This is an error!', undefined)

    // success
    callback(undefined, [1, 2, 3])
  }, 2000)
}

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error)
  }
  console.log(result)
})