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

const deleteUser = async (req, res) => {
  try {
    await req.user.remove()
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
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()
    res.status(200).send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send()
  }
}

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    )
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
}

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
}

module.exports = {
  postUser,
  getProfile,
  deleteUser,
  updateUser,
  login,
  logout,
  logoutAll
}