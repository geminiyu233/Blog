import Draft from '../controller/draft'
import Router from 'koa-router'

const router = new Router()
router.prefix('/draft')
//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js')

router.get('/get', checkToken, Draft.getDraft)
router.post('/delete', checkToken, Draft.delDraft)

export default router