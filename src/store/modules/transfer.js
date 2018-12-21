import { ssoLogin } from '@/api/transfer'
import { getToken, setToken, removeToken, setCache, getCache,clearCookie,clearSession,clearLocal } from '@/utils/auth'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import i18n from '@/lang'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
const user = {
  state: {},
  mutations: {},
  actions: {
    ssoLogin({ commit }, info) {
      return new Promise((resolve, reject) => {
        ssoLogin(info).then(response => {
          let { status, result } = response
          if (status == 0) {
            for (let key in result) {
              if (key !== 'token') {
                setCache(key, result[key] || '')
              } else {
                if (parseInt(info.type) == 1) {
                  setCache('token', result.userid + '-' + result.token)
                } else if (parseInt(info.type) == 2) {
                  setCache('token', result.empid + '-' + result.token)
                }
              }
            }
            setToken(result.token)
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user