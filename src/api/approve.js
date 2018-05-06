import request from '@/utils/request'
//updateProcessSwitch
export function updateProcessSwitch(data) {
  return request({
    url: '/updateProcessSwitch',
    method: 'post',
    data
  })
}
//getProcessArea
export function getProcessArea(data) {
  return request({
    url: '/getProcessArea',
    method: 'post',
    data
  })
}
//addProcessArea
export function addProcessArea(data) {
  return request({
    url: '/addProcessArea',
    method: 'post',
    data
  })
}
//delProcessArea
export function delProcessArea(data) {
  return request({
    url: '/delProcessArea',
    method: 'post',
    data
  })
}
//addProcessRule
export function addProcessRule(data) {
  return request({
    url: '/addProcessRule',
    method: 'post',
    data
  })
}
//updateProcessArea
export function updateProcessArea(data) {
  return request({
    url: '/updateProcessArea',
    method: 'post',
    data
  })
}