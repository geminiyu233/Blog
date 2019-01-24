const passport = require('koa-passport')
const localStrategy = require('passport-local')
const Admin = require('../dbs/models/admin')

// 提交策略
passport.use(new localStrategy(async function(username, password, done) {
  let where = { username }
  let result = await Admin.findOne(where)
  if (result !== null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))
/*序列化在ctx.login()函数调用时触发,会自动在ctx.state.user中添加done中的第二个参数，并在session中添加用户登录状态*/
passport.serializeUser(function(user, done) {
  console.log('user', user)
  done(null, user)
})
/*反序列化，会在用户请求到来的时候从session中解析用户信息，如果在登录状态，则在ctx.state.user中添加ctx.login()函数执行时添加进去的参数*/
passport.deserializeUser(function(user, done) {
  done(null, user)
})

module.exports = passport