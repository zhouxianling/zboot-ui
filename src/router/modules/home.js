/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const dashboardRouter = {
  path: '/home',
  component: Layout,
  redirect: {name: 'test'},
  name: 'home',
  meta: {
    title: '仪表板',
    icon: 'md-settings'
  },
  children: [
    {
      path: 'test',
      component: () => import('@/views/tree/index'),
      name: 'test',
      meta: {title: '测试1', icon: 'ios-map'},
    },
    {
      path: 'tree',
      component: () => import('@/views/tree/index'),
      name: 'tree',
      meta: {title: '测试2', icon: 'ios-map'},
    }
  ]
}
export default dashboardRouter
