import request from '@/utils/request'
import {url} from '@/utils/url'

export function login(username, password) {
  return request({
    url: `${url}/login`,
    method: 'post',
    params: {
      username: username,
      password: password,
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
