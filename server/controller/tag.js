/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-03-04 10:45:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-04 11:22:18
 * 所有tag标签
 */

import TagModel from '../dbs/models/tag'
import BaseComponent from '../prototype/baseComponent'

class Tag extends BaseComponent {
  constructor() {
    super()
  }

  // async addTag(ctx) {
  //   const { tagName } = ctx.request.body
  //   console.log('tagName', tagName)
  //   try {
  //     const tag = await this.creatTag(tagName)
  //     if (tag) {
  //       ctx.body = {
  //         success: false,
  //         message: '标签添加成功',
  //       }
  //     } else {
  //       ctx.body = {
  //         success: false,
  //         message: '标签添加失败',
  //       }
  //     }
  //   } catch (err) {
  //     console.log('标签添加失败', err)
  //     ctx.body = {
  //       success: false,
  //       message: '标签添加失败',
  //     }
  //   }
  // }

  async creatTag(label, ctx) {
    try {
      const tag_id = await this.getId('tag_id')
      const tag = await TagModel.create({
        id: tag_id,
        label
      })
      return tag
    } catch (err) {
      console.log('标签创建失败', err)
      ctx.body = {
        success: false,
        message: '标签创建失败',
      }
    }
  }

  async getAllTag(ctx) {
    try {
      const tags = await TagModel.find({})
      if (tags) {
        ctx.body = {
          success: true,
          data: tags
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
  // async getTag(ctx) {
  //   const { id } = ctx.request.body
  //   try {
  //     const tag = await this.feachTag({id})
  //     if(tag) {
  //       ctx.body = {
  //         success: true,
  //         data: tag
  //       }
  //     } else {
  //       console.log('获取标签失败', err)
  //       ctx.body = {
  //         success: false,
  //         message: '获取标签失败',
  //       }
  //     }
  //   } catch (err) {
  //     console.log('获取标签失败', err)
  //     ctx.body = {
  //       success: false,
  //       message: '获取标签失败',
  //     }
  //   }
  // }

  async feachTag(id, ctx) {
    try {
      const tag = await TagModel.findOne({
        id
      })
      if(tag) {
        return tag
      } else {
        console.log('获取标签失败')
        ctx.body = {
          success: false,
          message: '获取标签失败',
        }
      }
    } catch (err) {
      console.log('获取标签失败')
      ctx.body = {
        success: false,
        message: '获取标签失败',
      }
    }
  }
}

export default new Tag()
