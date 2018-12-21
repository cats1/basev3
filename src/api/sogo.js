import request from '@/utils/request'
//ssoLogin
export function sogoLogin(data) {
  return request({
    url: '/sogoLogin',
    method: 'post',
    data
  })
}
//xiaopLogin
export function xiaopLogin(data) {
  return request({
    url: '/xiaopLogin',
    method: 'post',
    data
  })
}