const Router = require('koa-router')
const passport = require('./utils/passport')
const Admin = require('../dbs/models/admin')

let router = new Router({
  prefix: '/admin'
})

// 注册
router.post('/signup', async function(ctx) {
  const {
    username,
    password
  } = ctx.request.body
  
  let admin = await Admin.find({
    username
  })

  if(admin.length) {
    ctx.body = {
      code: -1,
      msg: '用户已存在'
    }
  } else {
    let nadmin = await Admin.create({
      username,
      password
    })
    if(nadmin) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        admin: admin
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '服务器错误'
      }
    }
  }
})

// 登录
router.post('/login', async (ctx, next) => {
  return passport.authenticate('local', function(err, user, info, status) {
    if(err){
      ctx.body = {
        code: 1,
        msg: err
      }
    } else {
      if(user) {
        ctx.body = {
          code: 200,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

// 退出登录
router.get('/exit', async (ctx) => {
  await ctx.logout()
  if(!ctx.isAuthenticated()) {
    ctx.body = {
      code: 200
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取管理员信息
router.get('/getAdmin', async (ctx) => {
  if(ctx.isAuthenticated()) {
    const { username } = ctx.session.passport.user
    ctx.body = {
      user: username
    }
  } else {
    ctx.body = {
      user: ''
    }
  }
})

module.exports = router
