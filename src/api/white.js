import request from '@/utils/request'
export function getEmpWlist(data) {
  return request({
    url: '/getEmpWlist',
    method: 'post',
    data
  })
}
export function setEmpWlist(data) {
  return request({
    url: '/setEmpWlist',
    method: 'post',
    data
  })
}
export function getOverTimeList (data) {
  return request({
    url: '/getOverTimeList',
    method: 'post',
    data
  })
}
export function getDeptByEmpid (data) {
  return request({
    url: '/getDeptByEmpid',
    method: 'post',
    data
  })
}
//updateVisitorManager
export function updateVisitorManager (data) {
  return request({
    url: '/updateVisitorManager',
    method: 'post',
    data
  })
}