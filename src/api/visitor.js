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