const express = require('express')
const router = new express.Router()
const userControllers = require('../controllers/asyncFunctions/user')
const auth = require('../middleware/auth')

router.post('/users', userControllers.postUser)

router.get('/users/me', auth, userControllers.getProfile)

router.get('/users/:id', userControllers.getUser)

router.delete('/users/:id', userControllers.deleteUser)

router.patch('/users/:id', userControllers.updateUser)

router.post('/users/login', userControllers.login)

module.exports = router