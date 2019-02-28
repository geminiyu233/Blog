import TagModel from '../dbs/models/tag'
import baseComponent from '../prototype/baseComponent'

class Tag extends baseComponent {
  constructor() {
    super()
    this.getTag = this.getTag.bind(this)
  }
  async getTag(ctx) {
    try {
      const tags = await TagModel.find({})
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

export default new Tag()