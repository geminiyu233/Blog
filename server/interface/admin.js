const Router = require('koa-router')
const Redis = require('koa-redis')
const passport = require('./utils/passport')
const Axios = require('axios')
const Admin = require('../dbs/models/admin')
// import Router from 'koa-router'
// import Redis from 'koa-redis'
// import passport from './utils/passport'
// import Axios from 'axios'
// import Admin from '../dbs/models/admin'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client

router.post('/signup', async function(ctx) {
  const {
    username,
    passWord,
    code
  } = ctx.request.body
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodeMail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime === saveExpire) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新获取'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码错误'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '验证码不能为空'
    }
  }
  
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
      let res = await Axios.post('/admin/signin', {
        username,
        password
      })
      if (res.data && res.data.code === 0) {
        ctx.body = {
          code: 0,
          msg: '注册成功',
          admin: res.data.admin
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '服务器错误'
      }
    }
  }
})

router.post('/signin', async (ctx, next) => {
  return passport.authenticate('local', function(err, admin, info, status) {
    if(err){
      ctx.body = {
        code: 1,
        msg: err
      }
    } else {
      if(admin) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          admin
        }
        return ctx.login(admin)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if(!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getAdmin', async (ctx) => {
  if(ctx.isAuthenticated()) {
    const { username } = ctx.session.passport.username
    ctx.body = {
      admin: username
    }
  } else {
    ctx.body = {
      admin: ''
    }
  }
})

module.exports = router
