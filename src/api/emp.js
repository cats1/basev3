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
//getBlacklist
export function getBlacklist(data) {
  return request({
    url: '/getBlacklist',
    method: 'post',
    data
  })
}
//delBlacklist
export function delBlacklist(data) {
  return request({
    url: '/delBlacklist',
    method: 'post',
    data
  })
}
//getProject
export function getProject(data) {
  return request({
    url: '/getProject',
    method: 'post',
    data
  })
}
//getResidentVisitor
export function getResidentVisitor(data) {
  return request({
    url: '/getResidentVisitor',
    method: 'post',
    data
  })
}