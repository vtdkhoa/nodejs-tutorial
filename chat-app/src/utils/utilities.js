function capitalLetter(str) {
  str = str.split(' ')
  for (let i = 0; str.length > i; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1)
  }
  return str.join(' ')
}

module.exports = {
  capitalLetter
}