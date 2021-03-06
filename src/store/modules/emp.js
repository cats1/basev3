import { checkEmpInfo, GetEmpList,getBlacklist,addBlacklist,
	delBlacklist,getProject,getResidentVisitor,getAllResidentCompany,
	getResidentVisitorByCompany,delResidentVisitor,updateAllResidentFace,
	getRARG,getEmpRoleList,getDeptList,getEmpDeptList,getEmpListPages,
	batchDelEmployee,updateAllFace,SearchRecordsByPhone,addAppointment,getEmptempByPost,
	GetUserInfo,getSubAccountById,getEmptemplateByType,getUsertemplate,getSubAccountTemp,
	getEmpByName,updateEmpPwd,addEmptemplate,SynchronCardNo,addUserTemplate,
	updateEmpSubAccount,resetEmpPwd,webActivateAccount,updateFace,getMeetingByPhone,
	getVisitProxyForEmp,getVisitProxyForProxy,setVisitProxy,
	SearchRecordsByEmpNo,getMaxEmpNo,getEmployeeCount } from '@/api/emp'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
import i18n from '@/lang'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
const user = {
	state: {
		id: getCache('id'),
		company: getCache('company'),
		logo: getCache('logo'),
		userid: getCache('userid'),
		username: getCache('username'),
		token: getToken()
	},
	mutations: {
		SET_ID: (state, id) => {
           state.id = id
		},
		SET_COMPANY: (state, company) => {
           state.company = company
		},
		SET_LOGO: (state, logo) => {
           state.logo = logo
		},
		SET_USERNAME: (state, username) => {
           state.username = username
		},
		SET_USERID: (state, userid) => {
           state.userid = userid
		},
		SET_TOKEN: (state, token) => {
           state.token = token
		}
	},
	actions: {
		checkEmpInfo({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        checkEmpInfo(userInfo).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmpByName({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getEmpByName(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		GetEmpList({ commit }, info) {
			return new Promise((resolve, reject) => {
		        GetEmpList(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getBlacklist({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getBlacklist(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getProject({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getProject(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getResidentVisitor({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getResidentVisitor(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getAllResidentCompany({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getAllResidentCompany(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmployeeCount({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getEmployeeCount(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getResidentVisitorByCompany({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getResidentVisitorByCompany(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getRARG({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getRARG(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmpRoleList({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getEmpRoleList(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getDeptList({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getDeptList(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmpDeptList({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getEmpDeptList(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmpListPages({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getEmpListPages(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getVisitProxyForEmp({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getVisitProxyForEmp(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getVisitProxyForProxy({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getVisitProxyForProxy(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		setVisitProxy({ commit }, info) {
			return new Promise((resolve, reject) => {
		        setVisitProxy(info).then(response => {
		          let {status} = response
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
		updateEmpPwd({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateEmpPwd(info).then(response => {
		          let {status} = response
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
		addBlacklist({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addBlacklist(info).then(response => {
		          let {status} = response
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
		updateAllResidentFace({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateAllResidentFace(info).then(response => {
		          let {status} = response
		          if (status === 0) {
		          	let local = this.state.app.language
		        	Message({
                  	  message: i18n.messages[local]['sendFaceSuccess'],
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		SynchronCardNo({ commit }, info) {
			return new Promise((resolve, reject) => {
		        SynchronCardNo(info).then(response => {
		          let {status} = response
		          if (status === 0) {
		          	let local = this.state.app.language
		        	Message({
                  	  message: i18n.messages[local]['sendCardSuccess'],
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		delBlacklist({ commit }, info) {
			return new Promise((resolve, reject) => {
		        delBlacklist(info).then(response => {
		          let {status} = response
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
		delResidentVisitor({ commit }, info) {
			return new Promise((resolve, reject) => {
		        delResidentVisitor(info).then(response => {
		          let {status} = response
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
		updateAllFace({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateAllFace(info).then(response => {
		          let {status} = response
		          if (status === 0) {
		          	let local = this.state.app.language
					Message({
                  		message: i18n.messages[local]['sendFaceSuccess'],
                  		type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		batchDelEmployee({ commit }, info) {
			return new Promise((resolve, reject) => {
		        batchDelEmployee(info).then(response => {
		          let {status} = response
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
		SearchRecordsByPhone({ commit }, info) {
			return new Promise((resolve, reject) => {
		        SearchRecordsByPhone(info).then(response => {
		          let { status } = response
		          if (status === 0) {
		          	resolve(response)
		          }
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addAppointment({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addAppointment(info).then(response => {
		          let { status } = response
		          if (status === 0) {
		          	resolve(response)
		          }
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmptempByPost({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getEmptempByPost(info).then(response => {
		          let { status } = response
		          if (status === 0) {
		          	resolve(response)
		          }
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		GetUserInfo({ commit },info) {
			return new Promise((resolve, reject) => {
		        GetUserInfo(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	for (let key in result) {
		          		if (key !== 'token') {
		          	      setCache(key, result[key])
		          		}
		          	}
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getSubAccountById({ commit },info) {
			return new Promise((resolve, reject) => {
		        getSubAccountById(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	for (let key in result) {
		          		if (key !== 'token') {
		          	      setCache(key, result[key])
		          		}
		          	}
		          	resolve(response)
		          }
		          
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmptemplateByType({ commit },info) {
			return new Promise((resolve, reject) => {
		        getEmptemplateByType(info).then(response => {
		          let { status } = response
		          if (status === 0) {
		          	resolve(response)
		          }
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getUsertemplate({ commit },info) {
			return new Promise((resolve, reject) => {
		        getUsertemplate(info).then(response => {
		          let { status } = response
		          if (status === 0) {
		          	resolve(response)
		          }
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getSubAccountTemp({ commit },info) {
			return new Promise((resolve, reject) => {
		        getSubAccountTemp(info).then(response => {
		          let { status } = response
		          if (status === 0) {
		          	resolve(response)
		          }
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getMeetingByPhone({ commit },info) {
			return new Promise((resolve, reject) => {
		        getMeetingByPhone(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getMaxEmpNo({ commit },info) {
			return new Promise((resolve, reject) => {
		        getMaxEmpNo(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addEmptemplate({ commit },info) {
			return new Promise((resolve, reject) => {
		        addEmptemplate(info).then(response => {
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
		updateEmpSubAccount({ commit },info) {
			return new Promise((resolve, reject) => {
		        updateEmpSubAccount(info).then(response => {
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
		resetEmpPwd({ commit },info) {
			return new Promise((resolve, reject) => {
		        resetEmpPwd(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
                  		message: i18n.messages[local]['pwdResetSuccess'],
                  		type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		webActivateAccount({ commit },info) {
			return new Promise((resolve, reject) => {
		        webActivateAccount(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
                  		message: i18n.messages[local]['activeSuccess'],
                  		type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateFace({ commit },info) {
			return new Promise((resolve, reject) => {
		        updateFace(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
                  		message: i18n.messages[local]['regFaceSuccess'],
                  		type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addUserTemplate({ commit },info) {
			return new Promise((resolve, reject) => {
		        addUserTemplate(info).then(response => {
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
		SearchRecordsByEmpNo({ commit },info) {
			return new Promise((resolve, reject) => {
		        SearchRecordsByEmpNo(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		}
	}
}
export default user