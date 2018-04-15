import request from '@/utils/request'
//subAccountLogin
export function UpdateLogo(data) {
  return request({
    url: '/UpdateLogo',
    method: 'post',
    data
  })
}
//UploadBackgroundPic
export function UploadBackgroundPic(data) {
  return request({
    url: '/UploadBackgroundPic',
    method: 'post',
    data
  })
}