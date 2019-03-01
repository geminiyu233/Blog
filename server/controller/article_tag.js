import ArticleTagModel from '../dbs/models/tag'
import BaseComponent from '../prototype/baseComponent'

class ArticleTag extends BaseComponent {
  constructor() {
    super()
  }

  async addArticleTag(ctx) {
    const { tagName } = ctx.request.body
    console.log('tagName', tagName)
    try {
      const tag = await creatTag(tagName)
      if (tag) {
        ctx.body = {
          success: false,
          message: '标签添加成功',
        }
      } else {
        ctx.body = {
          success: false,
          message: '标签添加失败',
        }
      }
    } catch (err) {
      console.log('标签添加失败', err)
      ctx.body = {
        success: false,
        message: '标签添加失败',
      }
    }
  }

  async creat(tag_id, article_id) {
    const doc = await TagModel.create({
      tag_id,
      article_id
    })
    return doc ? doc : false
  }

  async getAllTag(ctx) {
    try {
      const tags = await TagModel.find({})
      if(tags) {
        ctx.body = {
          success: true,
          data: tags
        }
      }
    } catch (err) {
      console.log('获取标签失败', err)
      ctx.body = {
        success: false,
        message: '获取标签失败',
      }
    }
  }
  async getTag(ctx) {
    const { id } = ctx.request.body
    try {
      const tag = await feachTag({id})
      if(tag) {
        ctx.body = {
          success: true,
          data: tag
        }
      } else {
        console.log('获取标签失败', err)
        ctx.body = {
          success: false,
          message: '获取标签失败',
        }
      }
    } catch (err) {
      console.log('获取标签失败', err)
      ctx.body = {
        success: false,
        message: '获取标签失败',
      }
    }
  }

  async feachTag(id) {
    const tag = await TagModel.findOne({id})
    return tag ? tag : false
  }
}

export default new ArticleTag()