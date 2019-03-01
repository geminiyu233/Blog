import Admin from '../controller/admin'
import Router from 'koa-router'

const router = new Router();
router.prefix('/admin')

//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');

router.post('/login', Admin.login);
router.post('/singout', Admin.singout);

//需要先检查权限的路由
router.get('/info', checkToken, Admin.getAdmin);
// router.post('/delAdmin', checkToken, Admin.DelAdmin);

export default router