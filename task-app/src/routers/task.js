const express = require('express')
const router = new express.Router()
const taskControllers = require('../controllers/asyncFunctions/task')

router.post('/tasks', taskControllers.postTask)

router.get('/tasks', taskControllers.getAllTasks)

router.get('/tasks/:id', taskControllers.getTask)

router.delete('/tasks/:id', taskControllers.deleteTask)

router.patch('/tasks/:id', taskControllers.updateTask)

module.exports = router