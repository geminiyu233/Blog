const AdminController = require('../controller/admin.js');
const Router = require('koa-router');

const router = new Router();

//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');

router.post('/signUp', AdminController.SignUp);
router.post('/login', AdminController.Login);
router.post('/singout', AdminController.Singout);

//需要先检查权限的路由
// router.get('/Admin', checkToken, AdminController.GetAllAdmins);
// router.post('/delAdmin', checkToken, AdminController.DelAdmin);

module.exports = router;