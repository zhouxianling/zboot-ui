import request from '@/utils/request'
import {url, apiUrl} from '@/utils/url'

const menuUrl = apiUrl + '/menu';


export function saveOrUpdate(params) {
  return request({
    url: menuUrl,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export function getMenuList(params) {
  return request({
    url: menuUrl + '/page',
    method: 'get',
    params,
  })
}

export function getMenuTree() {
  return request({
    url: menuUrl + '/tree',
    method: 'get'
  })
}


export function deleteMenuById(id) {
  return request({
    url: menuUrl + '/' + id,
    method: 'delete',
  })
}

//TODO 通过角色查询分配的菜单
export function findMenuByRoleId(roleId) {
  return request({
    url: menuUrl + '/menus/' + roleId,
    method: 'get',
  })
}

//TODO 通过角色查询分配的菜单ID集
export function findMenuIdsByRoleId(roleId) {
  return request({
    url: menuUrl + '/menuIds/' + roleId,
    method: 'get',
  })
}







