import { sogoLogin,xiaopLogin } from '@/api/sogo'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import i18n from '@/lang'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
const user = {
	state: {},
	mutations: {},
	actions: {
	    sogoLogin({ commit }, info) {
	      return new Promise((resolve, reject) => {
	        sogoLogin(info).then(response => {
	          let { status, result } = response
	          if (status == 0) {
	            for (let key in result) {
	              if (key !== 'token') {
	                setCache(key, result[key] || '')
	              } else {
	                setCache('token', result.empid + '-' + result.token)
	              }
	            }
	            setToken(result.token)
	            resolve(response)
	          }
	        }).catch(error => {
	          reject(error)
	        })
	      })
	    },
	    xiaopLogin({ commit }, info) {
	      return new Promise((resolve, reject) => {
	        xiaopLogin(info).then(response => {
	          let { status, result } = response
	          if (status == 0) {
	            for (let key in result) {
	              if (key !== 'token') {
	                setCache(key, result[key] || '')
	              } else {
	                setCache('token', result.empid + '-' + result.token)
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