import { addDepartment,addEmployee,getEmployeeFromRtx,UpdateRtxRefresh,
	updateDepartment,updateDeptEmpRelation,delDepartment,updateEmployee } from '@/api/depart'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
import i18n from '@/lang'
const local = i18n.locale
const messages = i18n.messages[local]
const user = {
	state: {},
	mutations: {},
	actions: {
		addDepartment({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addDepartment(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
                    Message({
                  	  message: messages['addSuccess'],
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
                    Message({
                  	  message: messages['updateSuccess'],
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
                    Message({
                  	  message: messages['updateSuccess'],
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
                    Message({
                  	  message: messages['addSuccess'],
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
                    Message({
                  	  message: messages['exporttype'].tip3,
                  	  type: 'warning'
                	})
		        } else if (getCache('rtxip')&&getCache('rtxport')) {
                    getEmployeeFromRtx(info).then(response => {
			          let { status, result } = response
			          if (status === 0) {
	                    Message({
	                  	  message: messages['syncSuccess'],
	                  	  type: 'success'
	                	})
			          }
			          resolve(response)
			        }).catch(error => {
			          reject(error)
			        })
		        } else {
		        	Message({
                  	  message: messages['exporttype'].tip7,
                  	  type: 'warning'
                	})
		        }
		    })
		},
		getEmployeeFromDD({ commit }, info) {
			return new Promise((resolve, reject) => {
		        if (getCache('ddnotify') === 0) {
                    Message({
                  	  message: messages['exporttype'].tip8,
                  	  type: 'warning'
                	})
		        } else if (getCache('ddnotify') === 1) {
                    getEmployeeFromDD(info).then(response => {
			          let { status, result } = response
			          if (status === 0) {
	                    Message({
	                  	  message: messages['syncSuccess'],
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
	                    Message({
	                  	  message: messages['syncSuccess'],
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
	                    Message({
	                  	  message: messages['deleteSuccess'],
	                  	  type: 'success'
	                	})
			        }
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
	                    Message({
	                  	  message: messages['updateSuccess'],
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