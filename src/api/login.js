import request from '@/utils/request'
//管理员登录
export function managerLogin(data) {
  return request({
    url: '/Login',
    method: 'post',
    data
  })
}
//注册
export function Register(data) {
  return request({
    url: '/Register',
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
//超级账号管理员登录
export function superAccountLogin(data) {
  return request({
    url: '/superAccountLogin',
    method: 'post',
    data
  })
}
//发送邮件重置
export function RetrievePassword(data) {
  return request({
    url: '/RetrievePassword',
    method: 'post',
    data
  })
}
