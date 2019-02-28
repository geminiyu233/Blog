const mongoose = require('mongoose')
let tagSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true, // 在属性中定义一个唯一索引
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Tag', tagSchema)
