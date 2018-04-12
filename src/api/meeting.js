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