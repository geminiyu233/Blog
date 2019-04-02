/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-03-04 10:46:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-02 17:02:58
 * 为某篇文章添加标签
 */

import ArticleTagModel from '../dbs/models/articletags'
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

  async getArticleTags(article_id, ctx) {
    try {
      const tags = await ArticleTagModel.find({ article_id })
      console.log('tag', tags)
      if(tags.length) {
        return tags
      } else {
        console.log('文章标签获取失败')
        ctx.body = {
          success: false,
          message: '文章标签获取失败',
        }
      }
    } catch (err) {
      console.log('文章标签获取失败', err)
      ctx.body = {
        success: false,
        message: '文章标签获取失败',
      }
    }
  }

  async getArticleByTagId(tag_id, ctx) {
    try {
      const article_ids = await ArticleTagModel.find({ tag_id }, 'article_id')
      let articleIds = article_ids.map(item => {
        return item.article_id
      })
      return articleIds
    } catch (err) {
      console.log('根据tagId获取文章列表失败', err)
      ctx.body = {
        success: false,
        message: '根据tagId获取文章列表失败',
      }
    }
  }
  
}

export default new ArticleTag()
