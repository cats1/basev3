import request from '@/utils/request'
//count
export function getRelatedAccount(data) {
  return request({
    url: '/getRelatedAccount',
    method: 'post',
    data
  })
}
//vcount
export function getAllSuperAccountVCount(data) {
  return request({
    url: '/getAllSuperAccountVCount',
    method: 'post',
    data
  })
}
//getSupAccVCount
export function getSupAccVCount(data) {
  return request({
    url: '/getSupAccVCount',
    method: 'post',
    data
  })
}