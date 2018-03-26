# litadmin
> 一个基于vue2.x编写的后端管理项目

## 介绍


### 说明

　这是一个用vuejs2.0和element-ui 2.x搭建的后台管理界面。
  演示地址：[http://lit.ipyro.cn](http://lit.ipyro.cn)
    
### 项目结构
```
├── build  #webpack编译相关文件目录，一般不用动 
├── config  #配置目录
│   ├────dev.env.js  #开发环境变量
│   ├────index.js    #主配置文件
│   └────prod.env.js #生产环境变量
├── dist  #生产环境下build后的文件存放目录（发布目录）
├── server  #服务端代码目录，提供给前端接口
├── src #前端项目源码目录
│   ├───—api  #封装的接口文件目录
│   ├───—assets  #资源目录
│   ├───—common  #公用文件目录
│   ├───—components  #组件及页面文件目录
│   ├───—router  #路由目录
│   ├───—App.vue #项目入口文件
│   ├───—bus.js  #公共通信组件
│   └────main.js  #项目的核心文件
├── static  #开发模式下的静态资源目录
├── index.html #首页入口文件，你可以添加一些 meta 信息或同统计代码啥的
├── package.json #项目配置文件
└── README.md #项目的说明文档，markdown 格式
```

### 相关技术：

* vuejs2.0：一套构建用户界面的渐进式框架，易用、灵活、高效。
* element-ui：一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的组件库。
* vue-router：官方的路由组件，配合vue.js创建单页应用（SPA）非常简单。
* axios: 基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用。

## 项目编译和运行

``` bash
第一步： 先安装node v8.2.1环境，可以用nvm安装，支持多版本切换
可参看链接：https://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html

第二步：下载项目
可以直接在git上下载项目源码。
或者通过git命令下载
#git命令下载
git clone https://github.com/jerry9022/LitAdmin

假定项目已经下载下来了。

第三步：启动服务端
（1）新开一个命令行窗口
（2）定位到项目中的server目录并安装依赖
  > cd 你自己的位置/LitAdmin/server
  > npm install
（3）依赖安装成功后执行启动命令
  > npm start 
  # 显示如下内容说明服务端启动成功
  # Server is runing... Listening on port 3000
  # Listening at http://localhost:3000
  
  
第四步：启动前端
（1）新开一个命令行窗口
（2）定位到项目目录并安装依赖
  > cd 你自己的位置/LitAdmin
  > npm install
（3）依赖安装成功后执行启动命令
  > npm run dev
  # 显示如下内容说明本地启动成功
  # DONE Compiled successfully in 7515ms
  # Listening at http://localhost:8081
   
   
#正式环境编译命令
# build for production with minification
npm run build

```


### 更新日志
> 2017-03-26
 >> 1.接口跨域请求处理方式修改。
  
 > 2017-02-27
 >> 1.界面部分bug修改。  
 
 > 2017-12-13
 >> 1.去掉了canvas绘图代码。  
 >> 2.element-ui升级的2.0.7，vue版本升级到2.5.9。  
 
 > 2017-11-13
 >> 1.去掉先前在前端写的模拟数据，增加server端提供模拟数据。  
 >> 2.代码优化。  
 
 > 2017-09-20
 >> 1.主要组件升级：vue.js升级到v2.4.4，element-ui升级到v1.4.4，其它组件升级  
 >> 2.主界面左侧菜单栏修改，使用element-ui升级的导航组件支持折叠功能。  
 >> 3.其它调整。




