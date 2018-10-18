import request from '@/utils/request'
//ssoLogin
export function ssoLogin(data) {
  return request({
    url: '/ssoLogin',
    method: 'post',
    data
  })
}