const jwt = require('jsonwebtoken');
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const config = require('../dbs/config')
//检查token是否过期
module.exports = async (token) => {
  if (token) {
    let payload
    try {
      payload = await verify(token, config.secret) // // 解密，获取payload
      console.log(payload, "payload")
    } catch (err) {
      return false
    }
    return true
  } else {
    return false
  }
}
