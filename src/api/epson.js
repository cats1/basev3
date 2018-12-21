import request from '@/utils/request'
//ssoLogin
export function getVipForm(data) {
  return request({
    url: '/getVipForm',
    method: 'post',
    data
  })
}
//xiaopLogin
export function getDepotForm(data) {
  return request({
    url: '/getDepotForm',
    method: 'post',
    data
  })
}
//getDepotFormList 
export function getDepotFormList(data) {
  return request({
    url: '/getDepotFormList',
    method: 'post',
    data
  })
}
//getProcessRecord
export function getProcessRecord(data) {
  return request({
    url: '/getProcessRecord',
    method: 'post',
    data
  })
}
//epsonLogin
export function epsonLogin(data) {
  return request({
    url: '/epsonLogin',
    method: 'post',
    data
  })
}