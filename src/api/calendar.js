import request from '@/utils/request'
//addHoliday
export function addHoliday(data) {
  return request({
    url: '/addHoliday',
    method: 'post',
    data
  })
}
//updateHoliday
export function updateHoliday(data) {
  return request({
    url: '/updateHoliday',
    method: 'post',
    data
  })
}
//delHoliday
export function delHoliday(data) {
  return request({
    url: '/delHoliday',
    method: 'post',
    data
  })
}
//getHoliday
export function getHoliday(data) {
  return request({
    url: '/getHoliday',
    method: 'post',
    data
  })
}