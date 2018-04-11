import Cookies from 'js-cookie'

const TokenKey = 'X-COOLVISIT-TOKEN'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getCache(key) {
  return Cookies.get(key)
}

export function setCache(key,value) {
  return Cookies.set(key, value)
}

export function removeCache(key) {
  return Cookies.remove(key)
}