import request from '@/utils/request'
import {url, apiUrl} from '@/utils/url'

const roleUrl = apiUrl + '/role';

/*新增角色*/
export function save(params) {
  return request({
    url: roleUrl,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getList(params) {
  return request({
    url: roleUrl + '/page',
    method: 'get',
    params,
  })
}

export function deleteById(roleId) {
  return request({
    url: roleUrl + '/' + roleId,
    method: 'delete',
  })
}









