import BaseComponent from '../prototype/baseComponent'
import ArticleModel from '../dbs/models/article'
import Tag from './tag'
import ArticleTag from './article_tag'
import ArticleStatu from './article_statu'

class Article extends BaseComponent {
  constructor() {
    super()
    this.addArticle = this.addArticle.bind(this)
  }

  async addArticle(ctx) {
    const {
      tag_ids,
      create_time,
      abstract,
      content,
      title,
      author,
      status,
    } = ctx.request.body
    console.log('1111',
      tag_ids,
      create_time,
      abstract,
      content,
      title,
      author,
      status)
    try {
      const article_statu_id = await ArticleStatu.feach(status)
      console.log('article_statu_id', article_statu_id)
      if (article_statu_id) {
        const article_id = await this.getId('article_id')
        console.log('article_id', article_id)
        const article = await ArticleModel.create({
          id: article_id,
          create_time,
          abstract,
          content,
          title,
          author,
          article_statu_id,
        })
        for (let element of tag_ids) {
          const tag = element.id ? await Tag.feachTag(element.id) : await Tag.creatTag(element.label)
          const doc = await ArticleTag.creat(tag.id, article.id)
          if (doc) {
            ctx.body = {
              success: true,
              message: '文章发布成功',
            }
          } else {
            ctx.body = {
              success: false,
              message: '文章发布失败',
            }
          }
        }
      } else {
        console.log('获取文章状态id失败')
        ctx.body = {
          success: false,
          message: '文章发布失败',
        }
      }
    } catch (err) {
      console.log('文章发布失败', err)
      ctx.body = {
        success: false,
        message: '文章发布失败',
      }
    }
  }

  async getArticle(ctx) {
    try {
      const tags = await ArticleModel.find({})
      ctx.body = {
        success: true,
        data: tags
      }
    } catch (err) {
      console.log('获取标签失败', err)
      ctx.body = {
        success: false,
        message: '获取标签失败',
      }
    }

  }
}

export default new Article()
