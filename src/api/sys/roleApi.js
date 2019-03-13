import request from '@/utils/request'
import {url, apiUrl} from '@/utils/url'

const roleUrl = apiUrl + '/role';

/*新增角色*/
export function save(params) {
  return request({
    url: roleUrl,
    method: 'post',
    data: params,
  })
}

export function getList(params) {
  return request({
    url: roleUrl + '/page',
    method: 'get',
    params,
  })
}









