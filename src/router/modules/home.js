/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const dashboardRouter = {
  path: '/home',
  component: Layout,
  redirect: '/home/index',
  children: [{
    path: 'index',
    component: () => import('@/views/home/index'),
    name: 'home',
    meta: {title: '首页', icon: 'user'},
  }]
}
export default dashboardRouter
