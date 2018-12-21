import { setEmpWlist,getEmpWlist,getOverTimeList,getDeptByEmpid,updateVisitorManager } from '@/api/white'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
import i18n from '@/lang'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
const user = {
	state: {},
	mutations: {},
	actions: {
		getEmpWlist({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getEmpWlist(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		setEmpWlist({ commit }, info) {
			return new Promise((resolve, reject) => {
		        setEmpWlist(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
                    Message({
                  	  message: i18n.messages[local]['setSuccess'],
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateRARG({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateRARG(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
                    Message({
                  	  message: i18n.messages[local]['updateSuccess'],
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateVisitorManager({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateVisitorManager(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
                    Message({
                  	  message: i18n.messages[local]['updateSuccess'],
                  	  type: 'success'
                	})
                	setCache('visitorManager',info.visitorManager)
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getOverTimeList({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getOverTimeList(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getDeptByEmpid({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getDeptByEmpid(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		}
	}
}
export default user