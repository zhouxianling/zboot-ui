/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: {name: 'user-management'},
  name: 'setting',
  meta: {
    title: '系统设置',
    icon: 'md-settings'
  },
  children: [
    {
      path: 'user-management',
      component: () => import('@/views/sys-setting/user-management/index'),
      name: 'user-management',
      meta: {title: '用户管理', icon: 'ios-map'},
    },
    {
      path: 'role-management',
      component: () => import('@/views/sys-setting/role-management/index'),
      name: 'role-management',
      meta: {title: '角色管理', icon: 'ios-map'},
    },
    {
      path: 'menu-management',
      component: () => import('@/views/sys-setting/menu-management/index'),
      name: 'menu-management',
      meta: {title: '菜单管理', icon: 'ios-map'},
    },
    {
      path: 'dept-management',
      component: () => import('@/views/sys-setting/dept-management/index'),
      name: 'dept-management',
      meta: {title: '部门管理', icon: 'ios-map'},
    },
    {
      path: 'file-management',
      component: () => import('@/views/sys-setting/file-management/index'),
      name: 'file-management',
      meta: {title: '文件管理', icon: 'ios-map'},
    },

  ]
}
export default settingRouter
