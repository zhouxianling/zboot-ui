import request from '@/utils/request'
import {url, apiUrl} from '@/utils/url'


const userUrl = apiUrl + '/user';

export function getList(params) {
  return request({
    url: userUrl + '/page',
    method: 'get',
    params,
  })
}

export function save(params) {
  return request({
    url: userUrl,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

