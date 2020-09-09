const errorHandler = (error, req, res, next) => {
  res.status(400).send({
    errorMessage: error.message
  })
}

module.exports = errorHandler