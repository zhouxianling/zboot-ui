import request from '@/utils/request'
import {url, apiUrl} from '@/utils/url'

const deptUrl = apiUrl + '/dept';


export function save(params) {
  return request({
    url: deptUrl,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export function getList(params) {
  return request({
    url: deptUrl + '/page',
    method: 'get',
    params,
  })
}

export function getTreeList() {
  return request({
    url: deptUrl + '/tree',
    method: 'get'
  })
}


export function deleteDeptById(roleId) {
  return request({
    url: deptUrl + '/' + roleId,
    method: 'delete',
  })
}









