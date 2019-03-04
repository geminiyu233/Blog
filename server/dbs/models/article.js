import mongoose from 'mongoose'
import moment from 'moment'

const articleSchema = new mongoose.Schema({
  id: Number,
  tag_id: Number,
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
}, {
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
});

const Article = mongoose.model('Article', articleSchema);

export default Article
