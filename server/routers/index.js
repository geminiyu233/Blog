import admin from './admin'
import tag from './tag'

export default function(app) {
  app.use(admin.routes(), admin.allowedMethods())
  app.use(tag.routes(), tag.allowedMethods())
}