/**
 * Created by jerry on 2017/4/13.
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users} from './data/user';
let _Users = Users;

export default {

  init() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(arg => {
      let {username, password} = JSON.parse(arg.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              delete user.password;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, {code: 200, msg: '请求成功', user}]);
          } else {
            resolve([200, {code: 500, msg: '账号或密码错误'}]);
          }
        }, 1000);
      });
    });

    mock.onPost('/user/profile').reply(function (arg) {
      let {name, email} = JSON.parse(arg.data);
      return new Promise((resolve, reject) => {
        let user = LoginUsers[0];
        user.name = name;
        user.email = email;
        resolve([200, {code: 200, msg: '请求成功', user}]);
      });
    })

  }

}
