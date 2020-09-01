const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

// ! Bad solution
// add(1, 1)
//   .then(sum => {
//     console.log(sum)
//     add(sum, 3)
//       .then(sum2 => {
//         console.log(sum2)
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   })
//   .catch(error => {
//     console.log(error)
//   })

// => Good solution
add(1, 1)
  .then(sum => {
    console.log(sum)
    return add(sum, 3)
  })
  .then(sum2 => {
    console.log(sum2)
  })
  .catch(error => {
    console.log(error)
  })