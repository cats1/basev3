import request from '@/utils/request'

export function managerLogin(data) {
  return request({
    url: '/Login',
    method: 'post',
    data
  })
}
export function getCode () {
  return request({
    url: '/getValidationCode',
    method: 'post'
  })
}
export function isCodeTrue (data) {
  return request({
    url: '/validationCode',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

