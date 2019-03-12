import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/* Router Modules */
import dashboard from './modules/dashboard'; //主页
import setting from './modules/setting'; //系统设置


/* 所有权限通用路由表 如首页和登录页和一些不用权限的公用页面*/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},

  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [{
      path: 'index',
      component: () => import('@/views/dashboard/index'),
      name: 'home',
      meta: {title: '首页', icon: 'user'},
    },
    ]
  },
  dashboard,
  setting,

  {path: '*', redirect: '/dashboard/index', hidden: true},

]


/* 实例化vue的时候只挂载constantRouter */
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
