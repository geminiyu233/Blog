const mongoose = require('mongoose')

let adminSchema = new mongoose.Schema({
  user_name: {
    type: String,
    unique: true, // 在属性中定义一个唯一索引
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: String,
  create_time: Date
})

 module.exports = mongoose.model('Admin', adminSchema)
