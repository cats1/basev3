import request from '@/utils/request'
//getEquipmentGroupByUserid
export function getEquipmentGroupByUserid(data) {
  return request({
    url: '/getEquipmentGroupByUserid',
    method: 'post',
    data
  })
}
//addEquipmentGroup
export function addEquipmentGroup(data) {
  return request({
    url: '/addEquipmentGroup',
    method: 'post',
    data
  })
}
//updateEquipmentGroup
export function updateEquipmentGroup(data) {
  return request({
    url: '/updateEquipmentGroup',
    method: 'post',
    data
  })
}
//delEquipmentGroup
export function delEquipmentGroup(data) {
  return request({
    url: '/delEquipmentGroup',
    method: 'post',
    data
  })
}
//getEquipmentbyUserid
export function getEquipmentbyUserid(data) {
  return request({
    url: '/getEquipmentbyUserid',
    method: 'post',
    data
  })
}
//delEquipment
export function delEquipment(data) {
  return request({
    url: '/delEquipment',
    method: 'post',
    data
  })
}
//getOpendoorInfo
export function getOpendoorInfo(data) {
  return request({
    url: '/getOpendoorInfo',
    method: 'post',
    data
  })
}
//getRfidRecords
export function getRfidRecords(data) {
  return request({
    url: '/getRfidRecords',
    method: 'post',
    data
  })
}
//addEquipment
export function addEquipment(data) {
  return request({
    url: '/addEquipment',
    method: 'post',
    data
  })
}
//updateEquipment
export function updateEquipment(data) {
  return request({
    url: '/updateEquipment',
    method: 'post',
    data
  })
}
//getEGroupByEid
export function getEGroupByEid(data) {
  return request({
    url: '/getEGroupByEid',
    method: 'post',
    data
  })
}