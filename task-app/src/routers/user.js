const express = require('express')
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

module.exports = router