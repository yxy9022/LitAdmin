import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import M1 from '@/components/menus/m1'
import M2 from '@/components/menus/m2'
import M3 from '@/components/menus/m3'
import M4 from '@/components/menus/m4'
import M5 from '@/components/menus/m5'

Vue.use(Router)

let router = new Router({
//mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/dashboard',
      leaf: true,//只有一个节点
      menuShow: true,
      iconCls: 'el-icon-menu',//图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航一',
      menuShow: true,
      iconCls: 'el-icon-message',//图标样式class
      children: [
        {path: '/m1', component: M1, name: '菜单1', menuShow: true},
        {path: '/m2', component: M2, name: '菜单2', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航二',
      menuShow: true,
      iconCls: 'el-icon-menu',
      children: [
        {path: '/m3', component: M3, name: '菜单3', menuShow: true},
        {path: '/m4', component: M4, name: '菜单4', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航三',
      leaf: true,//只有一个节点
      menuShow: true,
      iconCls: 'el-icon-setting',
      children: [
        {path: '/m5', component: M5, name: '菜单5', menuShow: true}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  //console.log('to:' + to.path)
  next()
})

export default router;
