const Task = require('../../models/task')

const postTask = async (req, res) => {
  const newTask = new Task(req.body)
  try {
    await newTask.save()
    res.status(201).send(newTask)
  } catch (error) {
    res.status(400).send(error)
  }
}

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send(task)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send(task)
  } catch (error) {
    res.status(500).send()
  }
}

const updateTask = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'description', 'status']
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid updates!'
    })
  }

  try {
    const task = await Task.findById(req.params.id)
    updates.forEach(update => task[update] = req.body[update])
    await task.save()

    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send(task)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  postTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateTask
}