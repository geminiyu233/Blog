const mongoose = require('mongoose')
let adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // 在属性中定义一个唯一索引
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: String,
  id: Number,
  city: String,
  create_time: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: 'ADMIN'
  }
})

module.exports = mongoose.model('Admin', adminSchema)
