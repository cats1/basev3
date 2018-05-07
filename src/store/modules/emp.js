import { empLogin, checkEmpInfo, GetEmpList,getBlacklist,addBlacklist,
	delBlacklist,getProject,getResidentVisitor,getAllResidentCompany,
	getResidentVisitorByCompany,delResidentVisitor,updateAllResidentFace,
	getRARG,getEmpRoleList,delRoleEmp,getDeptList,getEmpDeptList,getEmpListPages,
	batchDelEmployee,updateAllFace,SearchRecordsByPhone,addAppointment,getEmptempByPost,
	GetUserInfo,getSubAccountById,getEmptemplateByType,getUsertemplate,getSubAccountTemp,
	getEmpByName,updateEmpPwd,addEmptemplate,SynchronCardNo,
	updateEmpSubAccount,resetEmpPwd,webActivateAccount } from '@/api/emp'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
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
		empLogin({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        empLogin(userInfo).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	for (let key in result) {
		          		if (key !== 'token') {
		          	      setCache(key, result[key])
		          		} else {
		          		  setCache('token', result.empid + '-' + result.token)
		          		}
		          	}
		          }
		          setToken(result.token)
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
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
		updateEmpPwd({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateEmpPwd(info).then(response => {
		          let {status} = response
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
		addBlacklist({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addBlacklist(info).then(response => {
		          let {status} = response
		          if (status === 0) {
		        	Message({
                  	  message: '黑名单增加成功',
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
		        	Message({
                  	  message: '人脸下发成功',
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
		        	Message({
                  	  message: '批量发卡成功',
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
					Message({
                  		message: '黑名单删除成功',
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
					Message({
                  		message: '批量删除成功',
                  		type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		delRoleEmp({ commit }, info) {
			return new Promise((resolve, reject) => {
		        delRoleEmp(info).then(response => {
		          let {status} = response
		          if (status === 0) {
					Message({
                  		message: '批量删除成功',
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
					Message({
                  		message: '下发人脸成功',
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
					Message({
                  		message: '删除成功',
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
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addAppointment({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addAppointment(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmptempByPost({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getEmptempByPost(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		GetUserInfo({ commit }) {
			return new Promise((resolve, reject) => {
				let info = {
				  email: getCache('email') || getCache('pemail'),
				  userid: getCache('userid')
				}
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
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getEmptemplateByType({ commit },info) {
			return new Promise((resolve, reject) => {
		        getEmptemplateByType(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getUsertemplate({ commit },info) {
			return new Promise((resolve, reject) => {
		        getUsertemplate(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getSubAccountTemp({ commit },info) {
			return new Promise((resolve, reject) => {
		        getSubAccountTemp(info).then(response => {
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
		          	Message({
                  		message: '保存成功',
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
		resetEmpPwd({ commit },info) {
			return new Promise((resolve, reject) => {
		        resetEmpPwd(info).then(response => {
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
		webActivateAccount({ commit },info) {
			return new Promise((resolve, reject) => {
		        webActivateAccount(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	Message({
                  		message: '激活成功',
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