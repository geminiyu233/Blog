const jwt = require('jsonwebtoken');
const config = require('../dbs/config')

module.exports = function (username) {
  //生成token
  //第一个参数是载荷，用于编码后存储在 token 中的数据
  //登录时：核对用户名和密码成功后，应用将用户的id（user_id）作为JWT Payload的一个属性
  //第二个是密钥，自己定义的，验证的时候也是要相同的密钥才能解码
  //第三个是options，设置 token 的过期时间, decode这个token的时候得到的过期时间为: 创建token的时间 +　设置的值
  const token = jwt.sign({
    username: username
  }, config.secret, {
    expiresIn: '60s'
  });
  return token
}
