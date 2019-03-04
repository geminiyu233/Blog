/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-03-04 10:46:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-04 14:06:43
 * 为某篇文章添加标签
 */

import ArticleTagModel from '../dbs/models/articletag'
import BaseComponent from '../prototype/baseComponent'

class ArticleTag extends BaseComponent {
  constructor() {
    super()
  }

  async creat(tag_id, article_id, ctx) {
    try {
      const doc = await ArticleTagModel.create({
        tag_id,
        article_id
      })
      if (doc) {
        return doc
      } else {
        console.log('文章标签添加失败', err)
        ctx.body = {
          success: false,
          message: '文章标签添加失败',
        }
      }
    } catch (err) {
      console.log('文章标签添加失败', err)
      ctx.body = {
        success: false,
        message: '文章标签添加失败',
      }
    }
  }
}

export default new ArticleTag()
