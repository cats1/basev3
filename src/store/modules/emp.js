import { empLogin, checkEmpInfo, GetEmpList,
	getBlacklist,delBlacklist,getProject,getResidentVisitor } from '@/api/emp'
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
		}
	}
}
export default user