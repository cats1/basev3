import request from '@/utils/request'
//addDepartment
export function addDepartment(data) {
  return request({
    url: '/addDepartment',
    method: 'post',
    data
  })
}