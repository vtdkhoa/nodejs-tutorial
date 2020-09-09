const express = require('express')
const taskControllers = require('../controllers/asyncs/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, taskControllers.postTask)

router.get('/tasks', auth, taskControllers.getTasks)

router.get('/tasks/:id', auth, taskControllers.getTask)

router.delete('/tasks/:id', auth, taskControllers.deleteTask)

router.patch('/tasks/:id', auth, taskControllers.updateTask)

module.exports = router