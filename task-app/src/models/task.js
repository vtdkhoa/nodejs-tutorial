const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 7
  },
  status: {
    type: Boolean,
    required: true
  }
})

module.exports = Task