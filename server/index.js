const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const bodyparser = require('koa-bodyparser') // 解析body
const json = require('koa-json') // 美化返回给客户端数据格式
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')
import router from './routers/index.js'
const app = new Koa()
// const admin = require('./routers/admin')

// 这是处理前端跨域的配置
// const cors = require('koa2-cors') //处理跨域
// app.use(cors({
//   origin: function (ctx) {
//     // if (ctx.url === '/login') {
//     //   return "*"; // 允许来自所有域名请求
//     // }
//     // return 'http://localhost:9528';
//     return "*";
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

app.proxy = true
app.keys=['ys','keyskeys']
// middlewares
app.use(json())
// 用于接收并解析前台发送过来的post数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// mongoose
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // routes
  router(app)

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
