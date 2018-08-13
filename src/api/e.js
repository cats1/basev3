import request from '@/utils/request'
//updateProcessSwitch
export function getPermissionRecordByLink(data) {
  return request({
    url: '/getPermissionRecordByLink',
    method: 'post',
    data
  })
}
export function updatePermissionByLink(data) {
  return request({
    url: '/updatePermissionByLink',
    method: 'post',
    data
  })
}