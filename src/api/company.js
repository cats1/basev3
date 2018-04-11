import request from '@/utils/request'
//subAccountLogin
export function subAccountLogin(data) {
  return request({
    url: '/subAccountLogin',
    method: 'post',
    data
  })
}