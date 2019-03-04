import mongoose from 'mongoose'

const ArticleTagSchema = new mongoose.Schema({
  article_id: Number,
  tag_id: Number
});

const ArticleTag = mongoose.model('ArticleTag', ArticleTagSchema);

export default ArticleTag