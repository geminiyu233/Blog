import BaseComponent from '../prototype/baseComponent'
import ArticleModel from '../dbs/models/article'
import ArticleStatu from './article_statu'
import moment from 'moment'

class Draft extends BaseComponent {
  constructor() {
    super()
  }

  async getDraft(ctx) {
    try {
      const STATU = 'draft'
      // 根据文章状态获取状态id
      const article_statu_id = await ArticleStatu.feachStatuId(STATU, ctx)
      let articles = await ArticleModel.find({
        article_statu_id
      })
      console.log('草稿箱', articles)
      if (articles.length) {
        articles = articles.map(item => {
          return {
            id: item.id,
            create_time: moment(item.create_time).format('X'),
            title: item.title,
            author: item.author
          }
        })
        ctx.body = {
          success: true,
          message: '草稿箱列表获取成功',
          data: articles
        }
      } else {
        console.log('获取草稿箱文章列表失败')
        ctx.body = {
          success: false,
          message: '获取草稿箱文章列表失败',
        }
      }
    } catch (err) {
      console.log('获取草稿箱文章列表失败', err)
      ctx.body = {
        success: false,
        message: '获取草稿箱文章列表失败',
      }
    }
  }

  async delDraft(ctx) {
    const { id } = ctx.request.body
      let doc = await ArticleModel.remove({ id })
      if (doc) {
        ctx.body = {
          success: true,
          message: '删除成功'
        }
      } else {
        ctx.body = {
          success: false,
          message: '删除失败'
        }
      }
  }

}

export default new Draft()
