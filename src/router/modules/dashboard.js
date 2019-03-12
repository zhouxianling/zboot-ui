/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const dashboardRouter = {
  path: '/dashboard',
  component: Layout,
  redirect: {name: 'dashboard-index'},
  name: 'dashboard',
  meta: {
    title: '仪表板',
    icon: 'user'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard-index',
      meta: {title: '仪表板', icon: 'user'},
      hidden: true
    },
  ]
}
export default dashboardRouter
