import ArticleStatuModel from '../dbs/models/article_statu'
import BaseComponent from '../prototype/baseComponent'

class ArticleStatu extends BaseComponent {
  constructor() {
    super()
    this.feach = this.feach.bind(this)
  }

  async feach(statu) {
    const doc = await ArticleStatuModel.find({})
    console.log('statu', doc)
    const statu_id = await ArticleStatuModel.findOne({ statu })
    console.log(statu_id)
    return statu_id ? statu_id : false
  }
}

export default new ArticleStatu()