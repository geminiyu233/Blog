import ArticleStatuModel from '../dbs/models/articlestatus'
import BaseComponent from '../prototype/baseComponent'

class ArticleStatu extends BaseComponent {
  constructor() {
    super()
  }

  async feachStatuId(name, ctx) {
    try {
      const ArticleStatu = await ArticleStatuModel.findOne({
        name
      })
      if (ArticleStatu) {
        return parseInt(ArticleStatu.id)
      } else {
        console.log('获取文章状态id失败')
        ctx.body = {
          success: false,
          message: '获取文章状态id失败',
        }
      }
    } catch (err) {
      console.log('获取文章状态id失败', err)
      ctx.body = {
        success: false,
        message: '获取文章状态id失败',
      }
    }
  }
}

export default new ArticleStatu()
