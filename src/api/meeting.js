import request from '@/utils/request'
//获取会议列表
export function getMeetingByUserid(data) {
  return request({
    url: '/getMeetingByUserid',
    method: 'post',
    data
  })
}
//获取会议列表
export function addMeeting(data) {
  return request({
    url: '/addMeeting',
    method: 'post',
    data
  })
}
//获取会议详情
export function getMeetingById(data) {
  return request({
    url: '/getMeetingById',
    method: 'post',
    data
  })
}
//updateMeeting 
export function updateMeeting(data) {
  return request({
    url: '/updateMeeting',
    method: 'post',
    data
  })
}
//getAppointmentByMid
export function getAppointmentByMid(data) {
  return request({
    url: '/getAppointmentByMid',
    method: 'post',
    data
  })
}
//htmlUnescape
export function htmlUnescape(data) {
  return request({
    url: '/htmlUnescape',
    method: 'post',
    data
  })
}