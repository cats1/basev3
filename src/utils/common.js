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
