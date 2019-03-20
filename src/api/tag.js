import request from '@/utils/request'
//addTag
export function addTag(data) {
  return request({
    url: '/addTag',
    method: 'post',
    data
  })
}
//delTag
export function delTag(data) {
  return request({
    url: '/delTag',
    method: 'post',
    data
  })
}
//getTags
export function getTags(data) {
  return request({
    url: '/getTags',
    method: 'post',
    data
  })
}