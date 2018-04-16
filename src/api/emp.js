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
//addBlacklist
export function addBlacklist(data) {
  return request({
    url: '/addBlacklist',
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
//getAllResidentCompany
export function getAllResidentCompany(data) {
  return request({
    url: '/getAllResidentCompany',
    method: 'post',
    data
  })
}
//getAllResidentCompany
export function getResidentVisitorByCompany(data) {
  return request({
    url: '/getResidentVisitorByCompany',
    method: 'post',
    data
  })
}
//delResidentVisitordelResidentVisitor
export function delResidentVisitor(data) {
  return request({
    url: '/delResidentVisitor',
    method: 'post',
    data
  })
}
//updateAllResidentFace
export function updateAllResidentFace(data) {
  return request({
    url: '/updateAllResidentFace',
    method: 'post',
    data
  })
}
//getRARG
export function getRARG(data) {
  return request({
    url: '/getRARG',
    method: 'post',
    data
  })
}
//getEmpRoleList
export function getEmpRoleList(data) {
  return request({
    url: '/getEmpRoleList',
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
//getDeptList
export function getDeptList(data) {
  return request({
    url: '/getDeptList',
    method: 'post',
    data
  })
}
//getEmpDeptList
export function getEmpDeptList(data) {
  return request({
    url: '/getEmpDeptList',
    method: 'post',
    data
  })
}
//getEmpListPages
export function getEmpListPages(data) {
  return request({
    url: '/getEmpListPages',
    method: 'post',
    data
  })
}
//batchDelEmployee
export function batchDelEmployee(data) {
  return request({
    url: '/batchDelEmployee',
    method: 'post',
    data
  })
}
//updateAllFace
export function updateAllFace(data) {
  return request({
    url: '/updateAllFace',
    method: 'post',
    data
  })
}