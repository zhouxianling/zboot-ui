/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const analysisRouter = {
  path: '/analysis',
  component: Layout,
  redirect: {name: 'exam'},
  meta: {title: '统计分析', icon: 'user'},
  children: [
    {
      path: 'exam',
      component: () => import('@/views/analysis/exam/index'),
      name: 'exam',
      meta: {title: '考试分析', icon: 'user'},
    },
    {
      path: 'paper',
      component: () => import('@/views/analysis/paper/index'),
      name: 'paper',
      meta: {title: '试卷分析', icon: 'user'},
    },
    {
      path: 'result',
      component: () => import('@/views/analysis/result/index'),
      name: 'result',
      meta: {title: '成绩分析', icon: 'user'},
    },
  ]
}
export default analysisRouter
