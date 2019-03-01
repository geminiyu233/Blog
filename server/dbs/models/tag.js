const mongoose = require('mongoose')
let tagSchema = new mongoose.Schema({
  id: Number,
  label: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Tag', tagSchema)
