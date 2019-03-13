/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const questionRouter = {
  path: '/question',
  component: Layout,
  redirect: {name: 'add-lib'},
  meta: {
    title: '题库管理',
    icon: 'user'
  },
  children: [
    {
      path: 'add-lib',
      component: () => import('@/views/question/add-lib/index'),
      name: 'add-lib',
      meta: {title: '新增题库', icon: 'user'},
    },
    {
      path: 'lib-list',
      component: () => import('@/views/question/lib-list/index'),
      name: 'lib-list',
      meta: {title: '题库列表', icon: 'user'},
    },
    {
      path: 'add',
      component: () => import('@/views/question/add/index'),
      name: 'add',
      meta: {title: '新增试题', icon: 'user'},
    },
    {
      path: 'import',
      component: () => import('@/views/question/import/index'),
      name: 'import',
      meta: {title: '导入试题', icon: 'user'},
    },
    {
      path: 'management',
      component: () => import('@/views/question/management/index'),
      name: 'management',
      meta: {title: '管理试题', icon: 'user'},
    },
  ]
}
export default questionRouter
