/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const paperRouter = {
  path: '/paper',
  component: Layout,
  redirect: {name: 'add'},
  meta: {title: '试卷管理', icon: 'user'},
  children: [
    {
      path: 'add',
      component: () => import('@/views/paper/add/index'),
      name: 'add',
      meta: {title: '创建试卷', icon: 'user'},
    },
    {
      path: 'classify',
      component: () => import('@/views/paper/classify/index'),
      name: 'classify',
      meta: {title: '试卷分类', icon: 'user'},
    },
    {
      path: 'management',
      component: () => import('@/views/paper/management/index'),
      name: 'management',
      meta: {title: '试卷管理', icon: 'user'},
    },
  ]
}
export default paperRouter
