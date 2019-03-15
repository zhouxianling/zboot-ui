import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: '', // api 的 base_url
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {

    /**
     * code 为1报错了
     */
    const res = response.data
    const code = res.code;
    const msg = res.msg;

    //数据正常
    if (code === 0) {
      return res.data
      //异常或者参数错误
    } else if (code === 1 || code === 400) {
      Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
      //token的问题
    } else if (code === 401) {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
  },
  error => {
    let data = JSON.parse(JSON.stringify(error)).response.data
    console.log(JSON.parse(JSON.stringify(error)))
    Message({
      message: data.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
