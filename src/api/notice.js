import request from '@/utils/request'
//微信开关
export function UpdateWxConf(data) {
  return request({
    url: '/UpdateWxConf',
    method: 'post',
    data
  })
}
//短信开关
export function updateSMSConf(data) {
  return request({
    url: '/updateSMSConf',
    method: 'post',
    data
  })
}
//语音电话
export function ivrNotifyConf(data) {
  return request({
    url: '/ivrNotifyConf',
    method: 'post',
    data
  })
}
//updateDDNotify
export function updateDDNotify(data) {
  return request({
    url: '/updateDDNotify',
    method: 'post',
    data
  })
}
//updateRtxConf
export function updateRtxConf(data) {
  return request({
    url: '/updateRtxConf',
    method: 'post',
    data
  })
}
//updatePermissionSwitch
export function updatePermissionSwitch(data) {
  return request({
    url: '/updatePermissionSwitch',
    method: 'post',
    data
  })
}
//updateScanerSwitch
export function updateScanerSwitch(data) {
  return request({
    url: '/updateScanerSwitch',
    method: 'post',
    data
  })
}
//updateQrcodeConf
export function updateQrcodeConf(data) {
  return request({
    url: '/updateQrcodeConf',
    method: 'post',
    data
  })
}
//updateExtendTime
export function updateExtendTime(data) {
  return request({
    url: '/updateExtendTime',
    method: 'post',
    data
  })
}
//addUserTemplate
export function addUserTemplate(data) {
  return request({
    url: '/addUserTemplate',
    method: 'post',
    data
  })
}
//getUsertemplate
export function getUsertemplate(data) {
  return request({
    url: '/getUsertemplate',
    method: 'post',
    data
  })
}
//updateTempEditSwitch
export function updateTempEditSwitch(data) {
  return request({
    url: '/updateTempEditSwitch',
    method: 'post',
    data
  })
}