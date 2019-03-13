import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from '@/utils/auth' // getToken from cookie

NProgress.configure({showSpinner: false})// NProgress configuration

// const whiteList = ['/login']// no redirect whitelist

//检测浏览器
const whiteList = function () {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return ['/loginApp', '/authredirect']
  } else {
    return ['/login', '/authredirect']
  }
}


router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === whiteList()[0]) {
      next({path: '/'})
      NProgress.done() // if current page is home will not trigger	afterEach hook, so manually handle it
    } else {
      store.commit('setRoute');
      next();
    }
  } else {
    /* has no token*/
    if (whiteList().indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
      // next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    } else {
      next(whiteList()[0]) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
