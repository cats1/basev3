import request from '@/utils/request'
//subAccountLogin
export function updateSecureProtocol(data) {
  return request({
    url: '/updateSecureProtocol',
    method: 'post',
    data
  })
}
//UpdateDefaultPhoto
export function UpdateDefaultPhoto(data) {
  return request({
    url: '/UpdateDefaultPhoto',
    method: 'post',
    data
  })
}
//UpdateDefaultPhoto
export function UploadPic(data) {
  return request({
    url: '/Upload',
    method: 'post',
    data
  })
}
//UpdateThemeColor
export function UpdateThemeColor(data) {
  return request({
    url: '/UpdateThemeColor',
    method: 'post',
    data
  })
}