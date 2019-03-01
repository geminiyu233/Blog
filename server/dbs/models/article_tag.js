import mongoose from 'mongoose'

const ArticleTagSchema = new mongoose.Schema({
  article_id: Number,
  tag_id: Number
});

const ArticleTagSchema = mongoose.model('ArticleTagSchema', ArticleTagSchema);

export default ArticleTagSchema