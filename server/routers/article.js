import Article from '../controller/article'
import Router from 'koa-router'

const router = new Router()
router.prefix('/article')
//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');

router.post('/create', checkToken, Article.addArticle)
router.get('/draft', checkToken, Article.getDraft)

export default router