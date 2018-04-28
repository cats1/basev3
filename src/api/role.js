import request from '@/utils/request'
//addRARG
export function addRARG(data) {
  return request({
    url: '/addRARG',
    method: 'post',
    data
  })
}
//delRARG
export function delRARG(data) {
  return request({
    url: '/delRARG',
    method: 'post',
    data
  })
}
//updateRARG
export function updateRARG(data) {
  return request({
    url: '/updateRARG',
    method: 'post',
    data
  })
}
//addEmpRole
export function addEmpRole(data) {
  return request({
    url: '/addEmpRole',
    method: 'post',
    data
  })
}
//delRoleEmp
export function delRoleEmp(data) {
  return request({
    url: '/delRoleEmp',
    method: 'post',
    data
  })
}