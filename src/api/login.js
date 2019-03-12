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
