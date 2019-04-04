/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: {name: 'user'},
  name: 'setting',
  meta: {title: '系统设置'},
  children: [
    {
      path: 'user',
      component: () => import('@/views/sys-setting/user/index'),
      name: 'user',
      meta: {title: '用户管理'},
    },
    {
      path: 'role',
      component: () => import('@/views/sys-setting/role/index'),
      name: 'role',
      meta: {title: '角色管理'},
    },
    {
      path: 'menu',
      component: () => import('@/views/sys-setting/menu/index'),
      name: 'menu',
      meta: {title: '菜单管理'},
    },
    {
      path: 'dept',
      component: () => import('@/views/sys-setting/dept/index'),
      name: 'dept',
      meta: {title: '部门管理'},
    },

  ]
}
export default settingRouter
