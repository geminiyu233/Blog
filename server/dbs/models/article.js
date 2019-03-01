import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  id: Number,
  tag_id: Number,
  create_time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  },
  abstract: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  article_statu_id: {
    type: Number,
    required: true
  },
  viewed: {
    type: Number,
    default: 0
  }
});

const Article = mongoose.model('Article', articleSchema);

export default Article