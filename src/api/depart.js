import request from '@/utils/request'
//addDepartment
export function addDepartment(data) {
  return request({
    url: '/addDepartment',
    method: 'post',
    data
  })
}
//updateDepartment
export function updateDepartment(data) {
  return request({
    url: '/updateDepartment',
    method: 'post',
    data
  })
}
//addEmployee
export function addEmployee(data) {
  return request({
    url: '/addEmployee',
    method: 'post',
    data
  })
}
//getEmployeeFromRtx
export function getEmployeeFromRtx(data) {
  return request({
    url: '/getEmployeeFromRtx',
    method: 'post',
    data
  })
}
//getEmployeeFromDD
export function getEmployeeFromDD(data) {
  return request({
    url: '/getEmployeeFromDD',
    method: 'post',
    data
  })
}
//UpdateRtxRefresh
export function UpdateRtxRefresh(data) {
  return request({
    url: '/UpdateRtxRefresh',
    method: 'post',
    data
  })
}