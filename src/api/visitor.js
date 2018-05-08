import request from '@/utils/request'
//获取签到访客
export function SearchVisitByCondition(data) {
  return request({
    url: '/SearchVisitByCondition',
    method: 'post',
    data
  })
}
//SearchAppointmentByCondition
export function SearchAppointmentByCondition(data) {
  return request({
    url: '/SearchAppointmentByCondition',
    method: 'post',
    data
  })
}
//searchInviteByCondition
export function searchInviteByCondition(data) {
  return request({
    url: '/searchInviteByCondition',
    method: 'post',
    data
  })
}
//SearchRVisitorByCondition
export function SearchRVisitorByCondition(data) {
  return request({
    url: '/SearchRVisitorByCondition',
    method: 'post',
    data
  })
}
//GetVisitType
export function GetVisitType(data) {
  return request({
    url: '/GetVisitType',
    method: 'post',
    data
  })
}
//batchSignOut
export function batchSignOut(data) {
  return request({
    url: '/batchSignOut',
    method: 'post',
    data
  })
}
//VisitorSignOutByVid
export function VisitorSignOutByVid(data) {
  return request({
    url: '/VisitorSignOutByVid',
    method: 'post',
    data
  })
}
//updateEmpVisitType
export function updateEmpVisitType(data) {
  return request({
    url: '/updateEmpVisitType',
    method: 'post',
    data
  })
}
//updateDefaultNotify
export function updateDefaultNotify(data) {
  return request({
    url: '/updateDefaultNotify',
    method: 'post',
    data
  })
}