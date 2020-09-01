const User = require('../models/user')

const postUser = (req, res) => {
  const newUser = new User(req.body)
  newUser.save()
    .then(() => {
      res.status(201).send(newUser)
    })
    .catch(error => {
      res.status(400).send(error)
    })
}

const getAllUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).send(users)
    })
    .catch(() => {
      res.status(500).send()
    })
}

const getUser = (req, res) => {
  const userId = req.params.id
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).send()
      }
      res.status(200).send(user)
    })
    .catch(() => {
      res.status(500).send()
    })
}

const deleteUser = (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send()
  }
}

module.exports = {
  postUser,
  getAllUsers,
  getUser,
  deleteUser
}