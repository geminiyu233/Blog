const Router = require('koa-router')
const passport = require('../utils/passport')
const Admin = require('../dbs/models/admin')

let router = new Router({
  prefix: '/admin'
})

// 注册
router.post('/signup', async function (ctx) {
  const {
    username,
    password
  } = ctx.request.body

  let admin = await Admin.find({
    username
  })

  if (admin.length) {
    ctx.body = {
      code: -1,
      msg: '用户已存在'
    }
  } else {
    let nadmin = await Admin.create({
      username,
      password
    })
    if (nadmin) {
      ctx.body = {
        code: 200,
        msg: '注册成功, 请登录'
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
  return passport.authenticate('local', function (err, data, info, status) {
    if (err) {
      ctx.body = {
        code: 1,
        msg: err
      }
    } else {
      if (data) {
        ctx.body = {
          code: 200,
          msg: '登录成功',
          data
        }
        //这里调用ctx.login()函数传入的参数要和上文中的序列化函数passport.serializeUser对应
        return ctx.login(data)
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
  if (!ctx.isAuthenticated()) {
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
  // 需要验证用户是否登录的时候就可以通过ctx.isAuthenticated()函数
  if (ctx.isAuthenticated()) {
    const {
      user
    } = ctx.session.passport
    ctx.body = {
      code: 200,
      data: user
    }
  } else {
    ctx.body = {
      user: ''
    }
  }
})

module.exports = router
