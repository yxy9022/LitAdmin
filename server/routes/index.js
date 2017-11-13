var express = require('express');
var router = express.Router();
var indexRouter = {};

//接口访问
router.use('/api/v1', require('./api/v1/index').router);

/* 服务端主页 */
router.get('/', function (req, res) {
  res.render('index');
});

indexRouter.router = router;

module.exports = indexRouter;
