import request from '@/utils/request'
export function sendSmsCode(data) {
  return request({
    url: '/sendSmsCode',
    method: 'post',
    data
  })
}