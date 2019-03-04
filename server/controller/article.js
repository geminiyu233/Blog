import BaseComponent from '../prototype/baseComponent'
import ArticleModel from '../dbs/models/article'
import Tag from './tag'
import ArticleTag from './article_tag'
import ArticleStatu from './article_statu'

class Article extends BaseComponent {
  constructor() {
    super()
    this.addArticle = this.addArticle.bind(this)
    this.createArticle = this.createArticle.bind(this)
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
    try {
      // 根据文章状态获取状态id
      const article_statu_id = await ArticleStatu.feachStatuId(status, ctx)
      const article_id = await this.getId('article_id')
      const params = {
        id: article_id,
        create_time,
        abstract,
        content,
        title,
        author,
        article_statu_id
      }
      const article = await this.createArticle(params, ctx)
      // 将新建文章的标签们循环添加到articletags表中
      for (let element of tag_ids) {
        const tag = element.id ? await Tag.feachTag(element.id, ctx) : await Tag.creatTag(element.label, ctx)
        const articleTag = await ArticleTag.creat(tag.id, article.id, ctx)
        if (!articleTag) {
          ctx.body = {
            success: false,
            message: '文章标签添加失败',
          }
        }
        ctx.body = {
          success: true,
          message: '文章发布成功',
          data: article
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

  async createArticle(params, ctx) {
    try {
      const article = await ArticleModel.create(params)
      if (article) {
        return article
      } else {
        console.log('文章发布失败')
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
