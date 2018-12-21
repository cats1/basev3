import Cookies from 'js-cookie'

const TokenKey = 'X-COOLVISIT-TOKEN'
import {mobile_device_detect} from '@/utils/common'
const mobileLocation = 1//0cookies1session//mobile_device_detect()
export function getToken() {
  if (mobileLocation == 1) {
    return sessionStorage.getItem(TokenKey)
  } else {
    return Cookies.get(TokenKey)
  }
}

export function setToken(token) {
  if (mobileLocation == 1) {
    return sessionStorage.setItem(TokenKey,token)
  } else {
    return Cookies.set(TokenKey, token)
  }
}

export function removeToken() {
  if (mobileLocation == 1) {
    return sessionStorage.removeItem(TokenKey)
  } else {
    return Cookies.remove(TokenKey)
  }
}
export function getCache(key) {
  if (mobileLocation == 1) {
    return sessionStorage.getItem(key)
  } else {
    return Cookies.get(key)
  }
}

export function setCache(key, value) {
  if (mobileLocation == 1) {
    return sessionStorage.setItem(key, value)
  } else {
    return Cookies.set(key, value)
  }
}

export function removeCache(key) {
  if (mobileLocation == 1) {
    return sessionStorage.removeItem(key)
  } else {
    return Cookies.remove(key)
  }
}
export function clearSession() {
  window.sessionStorage.clear()
}
export function clearLocal() {
  window.localStorage.clear()
}
export function clearCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}
