/**
 * 初始化图书(book)模拟数据
 *
 * Created by jerry on 2017/11/13.
 */
const Mock = require('mockjs');

const Books = [];
for (let i = 0; i < 100; i++) {
  Books.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.ctitle(2, 12),
    author: Mock.Random.cname(),
    description: Mock.Random.csentence(180, 500),
    publishAt: Mock.Random.date()
  }))
}

module.exports = Books;
