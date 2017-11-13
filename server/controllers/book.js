/**
 * books 控制器
 * Created by jerry on 2017/11/2.
 */
const Mock = require('mockjs');
const Books = require('../data/book');
let bookController = {};
let _Books = Books;

/**
 * 通过书名查询，获取图书列表
 * @param req
 * @param res
 */
bookController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //图书名称
  let total = 0;
  let rltBooks = [];
  if (name.length > 0) {
    let mockBooks = _Books.filter(book => {
      return book.name.indexOf(name) > -1;
    });
    total = mockBooks.length; //总条数
    rltBooks = mockBooks.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Books.length; //总条数
    rltBooks = _Books.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    books: rltBooks
  })
};

/**
 * 通过id获取某一条图书新
 * @param req
 * @param res
 */
bookController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let book = _.find(_Books, function (b) {
    return b.id === id;
  });
  res.json(book || null)
};

/**
 * 添加一条图书信息
 * @param req
 * @param res
 */
bookController.create = function (req, res) {
  let name = req.body.name;
  let author = req.body.author;
  let description = req.body.description;
  let publishAt = req.body.publishAt;
  _Books.push({
    id: Mock.Random.guid(),
    name: name,
    author: author,
    description: description,
    publishAt: publishAt
  });
  res.json({"errcode": 0, "errmsg": "新增成功"})
};

/***
 * 更新一条图书记录
 * @param req
 * @param res
 */
bookController.update = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let name = req.body.name;
  let author = req.body.author;
  let description = req.body.description;
  let publishAt = req.body.publishAt;

  let i = _.findIndex(_Books, function (u) {
    return u.id === id
  })
  if (i > -1) {
    _Books[i].name = name;
    _Books[i].author = author;
    _Books[i].description = description;
    _Books[i].publishAt = publishAt;
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

/**
 * 更新一条图书记录的部分信息
 * @param req
 * @param res
 */
bookController.patch = function (req, res) {

};

/**
 * 批量删除
 * @param req
 * @param res
 */
bookController.deleteBatch = function (req, res) {
  let ids = req.params.ids;
  ids = ids.split(',');
  _Books = _Books.filter(b => !ids.includes(b.id))
  res.json({"errcode": 0, "errmsg": "删除成功"});
};

/**
 * 单条删除
 * @param req
 * @param res
 */
bookController.delete = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let i = _.findIndex(_Books, function (u) {
    return u.id === id
  })
  if (i > -1) {
    _Books.splice(i, 1);
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

module.exports = bookController;
