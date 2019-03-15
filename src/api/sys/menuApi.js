import request from '@/utils/request'
import {url, apiUrl} from '@/utils/url'

const menuUrl = apiUrl + '/menu';


export function save(params) {
  return request({
    url: menuUrl,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export function getList(params) {
  return request({
    url: menuUrl + '/page',
    method: 'get',
    params,
  })
}

export function getTreeList() {
  return request({
    url: menuUrl + '/tree',
    method: 'get'
  })
}


export function deleteRoleById(roleId) {
  return request({
    url: menuUrl + '/' + roleId,
    method: 'delete',
  })
}









