import { getVipForm,getDepotForm,getDepotFormList,getProcessRecord,epsonLogin } from '@/api/epson'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import i18n from '@/lang'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
const user = {
	state: {},
	mutations: {},
	actions: {
	    getVipForm({ commit }, info) {
	      return new Promise((resolve, reject) => {
	        getVipForm(info).then(response => {
	          resolve(response)
	        }).catch(error => {
	          reject(error)
	        })
	      })
	    },
	    getDepotForm({ commit }, info) {
	      return new Promise((resolve, reject) => {
	        getDepotForm(info).then(response => {
	          resolve(response)
	        }).catch(error => {
	          reject(error)
	        })
	      })
	    },
	    getDepotFormList({ commit }, info) {
	      return new Promise((resolve, reject) => {
	        getDepotFormList(info).then(response => {
	          resolve(response)
	        }).catch(error => {
	          reject(error)
	        })
	      })
	    },
	    getProcessRecord({ commit }, info) {
	      return new Promise((resolve, reject) => {
	        getProcessRecord(info).then(response => {
	          resolve(response)
	        }).catch(error => {
	          reject(error)
	        })
	      })
	    },
	    epsonLogin({ commit }, info) {
	      return new Promise((resolve, reject) => {
	        epsonLogin(info).then(response => {
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