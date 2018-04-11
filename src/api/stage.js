import request from '@/utils/request'
export function LoginManager(data) {
  return request({
    url: '/LoginManager',
    method: 'post',
    data
  })
}