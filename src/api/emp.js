import request from '@/utils/request'
export function empLogin(data) {
  return request({
    url: '/empLogin',
    method: 'post',
    data
  })
}
export function checkEmpInfo(data) {
  return request({
    url: '/checkEmpInfo',
    method: 'post',
    data
  })
}
//获取员工列表
export function GetEmpList(data) {
  return request({
    url: '/GetEmpList',
    method: 'post',
    data
  })
}