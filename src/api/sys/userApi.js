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

