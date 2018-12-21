import request from '@/utils/request'
//getVisitorType
export function getVisitorType(data) {
  return request({
    url: '/getVisitorType',
    method: 'post',
    data
  })
}
export function GetAllTemplateType(data) {
  return request({
    url: '/GetAllTemplateType',
    method: 'post',
    data
  })
}
//delUsertemplate
export function delUsertemplate(data) {
  return request({
    url: '/delUsertemplate',
    method: 'post',
    data
  })
}
//addVisitorType
export function addVisitorType(data) {
  return request({
    url: '/addVisitorType',
    method: 'post',
    data
  })
}
//updateVisitorType
export function updateVisitorType(data) {
  return request({
    url: '/updateVisitorType',
    method: 'post',
    data
  })
}
//delVisitorType
export function delVisitorType(data) {
  return request({
    url: '/delVisitorType',
    method: 'post',
    data
  })
}