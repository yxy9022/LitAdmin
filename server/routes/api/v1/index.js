var express = require('express');
var router = express.Router();

var indexRouter = {};

//轮询当前目录下的子模块，并挨个加载其路由配置
$fs.readdir(__dirname, function (err, files) {
  files.forEach(function (file) {
    if (!_.startsWith(file, '.') && file !== 'index.js') {
      try {
        router.use('/' + file.replace('.js', ''), require('./' + file).router);
      } catch (ex) {
        console.error('路由加载错误[' + $path.join(__dirname, file) + ']：' + ex.stack);
      }
    }
  });
});

indexRouter.router = router;
module.exports = indexRouter;
