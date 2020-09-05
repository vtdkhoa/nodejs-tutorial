const express = require('express')
const multer = require('multer')
const userControllers = require('../controllers/asyncFunctions/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', userControllers.postUser)

router.get('/users/me', auth, userControllers.getProfile)

router.delete('/users/me', auth, userControllers.deleteUser)

router.patch('/users/me', auth, userControllers.updateUser)

router.post('/users/login', userControllers.login)

router.post('/users/logout', auth, userControllers.logout)

router.post('/users/logoutAll', auth, userControllers.logoutAll)

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 1000000 // 1Mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }
    cb(undefined, true)
  }
})

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  userControllers.uploadAvatar,
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message
    })
  }
)

router.delete('/users/me/avatar', auth, userControllers.deleteAvatar)

module.exports = router