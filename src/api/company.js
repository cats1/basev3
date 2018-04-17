import request from '@/utils/request'
//subAccountLogin
export function subAccountLogin(data) {
  return request({
    url: '/subAccountLogin',
    method: 'post',
    data
  })
}
//ModifyUserInfo
export function ModifyUserInfo(data) {
  return request({
    url: '/ModifyUserInfo',
    method: 'post',
    data
  })
}
//UpdateCardText
export function UpdateCardText(data) {
  return request({
    url: '/UpdateCardText',
    method: 'post',
    data
  })
}
//updateUnSubscribe
export function updateUnSubscribe(data) {
  return request({
    url: '/updateUnSubscribe',
    method: 'post',
    data
  })
}
//updatePassword
export function updatePassword(data) {
  return request({
    url: '/updatePassword',
    method: 'post',
    data
  })
}
//AddManager
export function AddManager(data) {
  return request({
    url: '/AddManager',
    method: 'post',
    data
  })
}
//GetManagerByUser
export function GetManagerByUser(data) {
  return request({
    url: '/GetManagerByUser',
    method: 'post',
    data
  })
}
//GetManagerByUser
export function updateSASwitch(data) {
  return request({
    url: '/updateSASwitch',
    method: 'post',
    data
  })
}
//getSubAccountByUserid
export function getSubAccountByUserid(data) {
  return request({
    url: '/getSubAccountByUserid',
    method: 'post',
    data
  })
}
//getEquipmentGroupByUserid
export function getEquipmentGroupByUserid(data) {
  return request({
    url: '/getEquipmentGroupByUserid',
    method: 'post',
    data
  })
}
//DeleteManager
export function DeleteManager(data) {
  return request({
    url: '/DeleteManager',
    method: 'post',
    data
  })
}
//UpdateManager
export function UpdateManager(data) {
  return request({
    url: '/UpdateManager',
    method: 'post',
    data
  })
}