const Task = require('../../models/task')

const postTask = async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
}

// GET /tasks?status=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
const getTasks = async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.status) {
    match.status = req.query.status === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.status(200).send(req.user.tasks)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    })
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
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    })
    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send({
      message: 'Delete task successfully!'
    })
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
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    })

    if (!task) {
      return res.status(404).send()
    }

    updates.forEach(update => task[update] = req.body[update])
    await task.save()
    res.status(200).send(task)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  postTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask
}