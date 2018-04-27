import { addDepartment,addEmployee,getEmployeeFromRtx,UpdateRtxRefresh,
	updateDepartment,updateDeptEmpRelation } from '@/api/depart'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
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
                  	  message: '添加成功',
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
                  	  message: '修改成功',
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
                  	  message: '修改成功',
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
                  	  message: '添加成功',
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
                  	  message: '钉钉开关已打开，RTX开关无法开启，如若开启RTX，请先关闭钉钉',
                  	  type: 'warning'
                	})
		        } else if (getCache('rtxip')&&getCache('rtxport')) {
                    getEmployeeFromRtx(info).then(response => {
			          let { status, result } = response
			          if (status === 0) {
	                    Message({
	                  	  message: '服务器已处理与RTX的通讯录同步请求',
	                  	  type: 'success'
	                	})
			          }
			          resolve(response)
			        }).catch(error => {
			          reject(error)
			        })
		        } else {
		        	Message({
                  	  message: 'RTX设置未打开，无法同步通讯录',
                  	  type: 'warning'
                	})
		        }
		    })
		},
		getEmployeeFromDD({ commit }, info) {
			return new Promise((resolve, reject) => {
		        if (getCache('ddnotify') === 0) {
                    Message({
                  	  message: '钉钉设置未打开，无法同步通讯录',
                  	  type: 'warning'
                	})
		        } else if (getCache('ddnotify') === 1) {
                    getEmployeeFromDD(info).then(response => {
			          let { status, result } = response
			          if (status === 0) {
	                    Message({
	                  	  message: '钉钉同步成功',
	                  	  type: 'success'
	                	})
			          }
			          resolve(response)
			        }).catch(error => {
			          reject(error)
			        })
		        } else {
		        	Message({
                  	  message: '钉钉设置未打开，无法同步通讯录',
                  	  type: 'warning'
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
	                  	  message: '设置服务器定时自动同步RTX成功',
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