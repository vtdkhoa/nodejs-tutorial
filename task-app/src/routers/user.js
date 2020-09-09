const express = require('express')
const multer = require('multer')
const userControllers = require('../controllers/asyncFunctions/user')
const auth = require('../middleware/auth')
const upload = require('../utils/upload')
const errorControllers = require('../controllers/error')
const router = new express.Router()

router.post('/users', userControllers.postUser)

router.get('/users/me', auth, userControllers.getProfile)

router.delete('/users/me', auth, userControllers.deleteUser)

router.patch('/users/me', auth, userControllers.updateUser)

router.post('/users/login', userControllers.login)

router.post('/users/logout', auth, userControllers.logout)

router.post('/users/logoutAll', auth, userControllers.logoutAll)

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  userControllers.uploadAvatar,
  errorControllers
)

router.delete('/users/me/avatar', auth, userControllers.deleteAvatar)

module.exports = router