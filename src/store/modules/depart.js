import { addDepartment,addEmployee,getEmployeeFromRtx,UpdateRtxRefresh,
	updateDepartment,updateDeptEmpRelation,delDepartment,updateEmployee,getDepartment } from '@/api/depart'
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
		addDepartment({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addDepartment(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
                    Message({
                  	  message: i18n.messages[local]['addSuccess'],
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateDepartment({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateDepartment(info).then(response => {
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
		updateDeptEmpRelation({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateDeptEmpRelation(info).then(response => {
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
		addEmployee({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addEmployee(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
                    Message({
                  	  message: i18n.messages[local]['addSuccess'],
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmployeeFromRtx({ commit }, info) {
			return new Promise((resolve, reject) => {
		        if (getCache('ddnotify') === 1) {
		        	let local = this.state.app.language
                    Message({
                  	  message: i18n.messages[local]['exporttype'].tip3,
                  	  type: 'warning'
                	})
		        } else if (getCache('rtxip')&&getCache('rtxport')) {
                    getEmployeeFromRtx(info).then(response => {
			          let { status, result } = response
			          if (status === 0) {
			          	let local = this.state.app.language
	                    Message({
	                  	  message: i18n.messages[local]['syncSuccess'],
	                  	  type: 'success'
	                	})
			          }
			          resolve(response)
			        }).catch(error => {
			          reject(error)
			        })
		        } else {
		        	let local = this.state.app.language
		        	Message({
                  	  message: i18n.messages[local]['exporttype'].tip7,
                  	  type: 'warning'
                	})
		        }
		    })
		},
		getEmployeeFromDD({ commit }, info) {
			return new Promise((resolve, reject) => {
		        if (getCache('ddnotify') === 0) {
		        	let local = this.state.app.language
                    Message({
                  	  message: i18n.messages[local]['exporttype'].tip8,
                  	  type: 'warning'
                	})
		        } else if (getCache('ddnotify') === 1) {
                    getEmployeeFromDD(info).then(response => {
			          let { status, result } = response
			          if (status === 0) {
			          	let local = this.state.app.language
	                    Message({
	                  	  message: i18n.messages[local]['syncSuccess'],
	                  	  type: 'success'
	                	})
			          }
			          resolve(response)
			        }).catch(error => {
			          reject(error)
			        })
		        }
		    })
		},
		UpdateRtxRefresh({ commit }, info) {
			return new Promise((resolve, reject) => {
		        UpdateRtxRefresh(info).then(response => {
			        let { status, result } = response
			        if (status === 0) {
			          	setCache('rtxAuto', info.rtxAuto)
			          	let local = this.state.app.language
	                    Message({
	                  	  message: i18n.messages[local]['syncSuccess'],
	                  	  type: 'success'
	                	})
			        }
			        resolve(response)
			    }).catch(error => {
			          reject(error)
			    })
		    })
		},
		delDepartment({ commit }, info) {
			return new Promise((resolve, reject) => {
		        delDepartment(info).then(response => {
			        let { status } = response
			        if (status === 0) {
			        	let local = this.state.app.language
	                    Message({
	                  	  message: i18n.messages[local]['deleteSuccess'],
	                  	  type: 'success'
	                	})
			        }
			        resolve(response)
			    }).catch(error => {
			          reject(error)
			    })
		    })
		},
		getDepartment({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getDepartment(info).then(response => {
			        resolve(response)
			    }).catch(error => {
			        reject(error)
			    })
		    })
		},
		updateEmployee({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateEmployee(info).then(response => {
			        let { status } = response
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
		}
	}
}
export default user