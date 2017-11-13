/**
 * Created by jerry on 2017/11/13.
 * 初始化用户(user)模拟数据
 *
 * Created by jerry on 2017/11/13.
 */
const Users = [];
Users.push({
  id: 1,
  username: 'admin', //用户名
  name: "风车车", //姓名
  password: '123456', //密码
  email: 'jerry9022@qq.com', //邮箱
  nickname: '超级管理员', //昵称
  sex: 1, //性别
  addr: '北京市海淀区上地七街'
});

Users.push({
  id: 2,
  username: 'staff',
  name: "枫叶", //姓名
  password: '123123',
  email: '1642499350@qq.com',
  nickname: '普通管理员',
  sex: 1, //性别
  addr: '北京市海淀区'
});

module.exports = Users;
