// import passport from 'koa-passport'
// import localStrategy from 'passport-local'
// import Admin from '../../dbs/models/admin'
const passport = require('koa-passport')
const localStrategy = require('passport-local')
const Admin = require('../../dbs/models/admin')

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

passport.serializeUser(function(user, done) {
  done(null, user)
})
passport.deserializeUser(function(user, done) {
  done(null, user)
})

module.exports = passport