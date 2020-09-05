const User = require('../../models/user')

const postUser = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
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
    res.send({
      message: 'Logout successfully!'
    })
  } catch (error) {
    res.status(500).send()
  }
}

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send({
      message: 'Logout all successfully!'
    })
  } catch (error) {
    res.status(500).send()
  }
}

const uploadAvatar = async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.send()
}

const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
}

module.exports = {
  postUser,
  getProfile,
  deleteUser,
  updateUser,
  login,
  logout,
  logoutAll,
  uploadAvatar,
  deleteAvatar
}