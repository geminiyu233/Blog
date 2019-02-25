const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const config = require('../dbs/config')

//检查token
module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, '请求头Authorization中未包含token')
  }
  const token = authorization.split(' ')[1]
  let payload
  try {
    payload = await verify(token, config.secret) // // 解密，获取payload
  } catch (err) {
    ctx.throw(401, '无效的token')
  }
  await next() // 如果权限没问题，那么交个下一个控制器处理
}
