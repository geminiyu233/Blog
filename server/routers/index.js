import admin from './admin'
import tag from './tag'
import article from './article'
import draft from './draft'

export default app => {
  app.use(admin.routes(), admin.allowedMethods())
  app.use(tag.routes(), tag.allowedMethods())
  app.use(article.routes(), article.allowedMethods())
  app.use(draft.routes(), draft.allowedMethods())
}