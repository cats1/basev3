import {getCache} from './auth'
//const Base64 = require('./base64')
let Base64 = require('js-base64').Base64;
console.log(Base64)
/* 密码加密*/
export function lftPwdRule(str,num1,num2) {
  const strArray = str.split('')
  strArray.splice(num1, 0, randomString(5))
  const str1 = strArray.join('').split('').reverse()
  const newStr = codeEnBase(str1.join(''))
  const newStrArray = newStr.split('')
  newStrArray.splice(num2, 0, randomString(5))
  return newStrArray.join('')
}
/* 密码解密*/
export function lftDePwdRule(str) {
  const newPwd = str.split('')
  newPwd.splice(5, 5)
  const pwd = codeDeBase(newPwd.join('')).split('').reverse()
  pwd.splice(3, 5)
  return pwd.join('')
}
/* 获取随机5位数*/
export function randomString(len) {
  len = len || 32　
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
  const maxPos = $chars.length　　
  var pwd = ''　　
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }　　
  return pwd;
}
//加密
export function codeEnBase(str) {
  const enstr = Base64.encode(str)
  return enstr
}
//解密
export function codeDeBase(str) { //解密
  const destr = Base64.decode(str)
  return destr
}
//
export function booleanToNumber (boo) {
  return boo === true ? 1 : 0
}
//
export function numberToBoolean (num) {
  return parseInt(num) === 1 ? true : false
}
export function valueToString (value) {
  console.log(value)
  if (value === null) {
    return ''
  } else {
    return value.toString()
  }
}
export function replaceQuotation(value) {
    return value.replace(/\"/g, '\\\"');
}
export function checkIsNull(str) {
    if (str == null || str == 'null' || str == undefined || str == "") {
        return ""
    } else {
        return str
    }
}
export function replaceRemoveQuotation(value) {
    return value.replace(/\\\"/g, '"');
}
export function groupStatusText(value) {
    switch (value) {
      case 0 :
        return '停用'
      case 1 : 
        return '启用'
      default:
        return '启用'
    }
}
export function stringToArray(value){
  if (value && value != '') {
    return value.split(',')
  } else {
    return []
  }
}
export function arrayToString(value){
  if (value.length > 0) {
    return value.join(',')
  } else {
    return ''
  }
}
export function getBarList (array,name,id,count) {
  let list = []
  array.forEach(function(element,index){
    let obj = {
      label: element[name] + '(' + element[count]+ ')',
      name: element[name],
      pid: element[id],
      pcount: element[count],
      children: []
    }
    list.push(obj)
  })
  return list
}
export function getCBarList (array,name,id,child) {
  let list = []
  array.forEach(function(element,index){
    let obj = {
      label: element[name],
      name: element[name],
      pid: element[id],
      pcount: 0,
      children: []
    }
    if (element[child] && element[child].length > 0) {
      let citem = getCBarList(element[child],name,id,child)
      obj.children = citem
    }
    list.push(obj)
  })
  return list
}
export function getCgBarList (array,name,did,count,dp,child) {
  let list = [{
    label: getCache('company'),
    name: getCache('company'),
    pid: getCache('userid'),
    pcount: 0,
    dp: 'root',
    children: []
  }]
  let cList = []
  array.forEach(function(element,index){
    let obj = {
      label: element[name]+ '(' + element[count]+ ')',
      name: element[name],
      pid: element[did],
      pcount: element[count],
      dp: element[dp],
      children: []
    }
    if (element[child] && element[child].length > 0) {
      let citem = getCgBarList(element[child],name,did,count,dp,child)
      obj.children = citem
    }
    cList.push(obj)
  })
  list[0].children = cList
  return list
}
