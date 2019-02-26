import Admin from '../controller/admin'
import Router from 'koa-router'

const router = new Router();

//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');

router.post('/login', Admin.login);
router.post('/singout', Admin.singout);

//需要先检查权限的路由
// router.get('/Admin', checkToken, Admin.GetAllAdmins);
// router.post('/delAdmin', checkToken, Admin.DelAdmin);

module.exports = router;