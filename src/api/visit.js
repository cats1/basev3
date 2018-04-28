import request from '@/utils/request'
//addProject
export function addProject(data) {
  return request({
    url: '/addProject',
    method: 'post',
    data
  })
}
//updateProject
export function updateProject(data) {
  return request({
    url: '/updateProject',
    method: 'post',
    data
  })
}
//Compressface
export function Compressface(data) {
  return request({
    url: '/Compressface',
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
//updateResidentVisitor
export function updateResidentVisitor(data) {
  return request({
    url: '/updateResidentVisitor',
    method: 'post',
    data
  })
}
//addResidentVisitor
export function addResidentVisitor(data) {
  return request({
    url: '/addResidentVisitor',
    method: 'post',
    data
  })
}
//getRvQrcode
export function getRvQrcode(data) {
  return request({
    url: '/getRvQrcode',
    method: 'post',
    data
  })
}
//getResidentVisitorByName
export function getResidentVisitorByName(data) {
  return request({
    url: '/getResidentVisitorByName',
    method: 'post',
    data
  })
}