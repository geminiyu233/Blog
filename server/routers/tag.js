import TagModel from '../controller/tag'
import Router from 'koa-router'

const router = new Router()

//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');

router.get('/getTag', checkToken, TagModel.getTag)

export default router