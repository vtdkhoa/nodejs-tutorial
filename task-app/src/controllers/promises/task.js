const Task = require('../models/task')

const postTask = (req, res) => {
  const newTask = new Task(req.body)
  newTask.save()
    .then(() => {
      res.status(201).send(newTask)
    })
    .catch(error => {
      res.status(400).send(error)
    })
}

const getAllTasks = (req, res) => {
  Task.find({})
    .then(tasks => {
      res.status(200).send(tasks)
    })
    .catch(() => {
      res.status(500).send()
    })
}

const getTask = (req, res) => {
  const taskId = req.params.id
  Task.findById(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send()
      }
      res.status(200).send(task)
    })
    .catch(() => {
      res.status(500).send()
    })
}

const deleteTask = (req, res) => {
  const taskId = req.params.id
  Task.findByIdAndDelete(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send()
      }
      res.status(200).send(task)
    })
    .catch(() => {
      res.status(404).send()
    })
}

module.exports = {
  postTask,
  getAllTasks,
  getTask,
  deleteTask
}