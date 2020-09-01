const User = require('../../models/user')

const postUser = async (req, res) => {
  const newUser = new User(req.body)
  try {
    await newUser.save()
    const token = await newUser.generateAuthToken()
    res.status(201).send({ newUser, token })
  } catch (error) {
    res.status(400).send(error)
  }
}

const getProfile = async (req, res) => {
  res.send(req.user)
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteUser = async (req, res) => {
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

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'age', 'email', 'password']
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid updates!'
    })
  }

  try {
    const user = await User.findById(req.params.id)
    updates.forEach(update => user[update] = req.body[update])
    await user.save()

    if (!user) {
      return res.status(404).send()
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    )
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send()
  }
}

module.exports = {
  postUser,
  getProfile,
  getUser,
  deleteUser,
  updateUser,
  login
}