/**
 * Created by jerry on 2017/11/13.
 * users相关路由
 * 采用 restful api 风格
 */

var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');

//用户登录
router.post('/login', userController.login);
//用户退出
router.get('/logout', userController.logout);

//先检查登录
router.use(userController.checkLogin);

//更新个人部分信息
router.patch('/profile', userController.profile);
//用户修改个人密码
router.patch('/changepwd', userController.changepwd);

//返回user的集合
router.get('/', userController.find);
//
// //返回指定的user
// router.get('/:id', userController.findById);
//
// //创建user
// router.post('/', userController.create);
//
// //更新user全部信息
// router.put('/:id', userController.update);
//
// //更新user部分信息
// router.patch('/:id', userController.patch);
//
// //删除指定的user
// router.delete('/:id', userController.delete);

indexRouter.router = router;

module.exports = indexRouter;

