# litadmin
> A Vue.js project for backend

## 介绍


### 说明

　　这是一个用vuejs2.0和element-ui搭建的后台管理界面。演示地址：[http://v.ipyro.cn](http://v.ipyro.cn)

> 2017-9-20日更新使用环境及组件：node v8.2.1,vue.js v2.4.4，element-ui v1.4.4
    

### 相关技术：

* vuejs2.0：一套构建用户界面的渐进式框架，易用、灵活、高效。

* element-ui：一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的组件库。

* vue-router：官方的路由组件，配合vue.js创建单页应用（SPA）非常简单。

* axios: 基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用。

* mock.js: 生成随机数据，拦截 Ajax 请求,让前端攻城师独立于后端进行开发。


## Build Setup


``` bash
先安装node v8.2.1环境，可以用nvm安装，支持多版本切换

开启一个控制台窗口

#下载项目命令
git clone https://github.com/jerry9022/LitAdmin

#定位到项目中的server目录安装服务端依赖
npm install

#启动服务端
npm start
> 显示如下内容说明服务端启成功
> Server is runing... Listening on port 3000
> Listening at http://localhost:3000

# install dependencies
# 定位到项目根目录(LitAdmin目录)安装依赖
npm install

# serve with hot reload at localhost:8081
# 本地开发环境运行
npm run dev

# build for production with minification
npm run build
```


### 更新日志
> 2017-11-13
 >> 1.去掉先前在前端写的模拟数据，增加server端提供模拟数据。
 >> 2.代码优化。  
 
 > 2017-9-20
 >> 1.主要组件升级：vue.js升级到v2.4.4，element-ui升级到v1.4.4，其它组件升级  
 >> 2.主界面左侧菜单栏修改，使用element-ui升级的导航组件支持折叠功能。  
 >> 3.其它调整。




