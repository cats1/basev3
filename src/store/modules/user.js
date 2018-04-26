import { managerLogin, getCode, isCodeTrue, RetrievePassword, Register } from '@/api/login'
import { getToken, setToken, removeToken, setCache, getCache } from '@/utils/auth'
const user = {
	state: {
		userid: '',
		token: getToken(),

	},
	mutations: {
		SET_USERID: (state, userid) => {
           state.userid = userid
		},
		SET_TOKEN: (state, token) => {
           state.token = token
		}
	},
	actions: {
		managerLogin({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        managerLogin(userInfo).then(response => {
		          let { status, result } = response
		          if (status == 0) {
                    for (let key in result) {
		          		if (key !== 'token') {
		          			if (result[key]) {
		          				setCache(key, result[key])
		          			} else {
		          				setCache(key, '')
		          			}
		          		} else {
		          		  setCache('token', result.userid + '-' + result.token)
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
		Register({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        Register(userInfo).then(response => {
		          let { status, result } = response
		          if (status == 0) {
                    for (let key in result) {
		          		if (key !== 'token') {
		          	        if (result[key]) {
		          				setCache(key, result[key])
		          			} else {
		          				setCache(key, '')
		          			}
		          		} else {
		          		  setCache('token', userInfo.userid + '-' + result.token)
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
		getCode({ commit }) {
			return new Promise((resolve, reject) => {
		        getCode().then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		isCodeTrue({ commit },data) {
			return new Promise((resolve, reject) => {
		        isCodeTrue(data).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		// 前端 登出
	    signOut({ commit }) {
	      return new Promise(resolve => {
	        commit('SET_TOKEN', '')
	        removeToken()
	        resolve()
	      })
	    },
	    // 前端 登出
	    RetrievePassword({ commit },info) {
			return new Promise((resolve, reject) => {
		        RetrievePassword(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		}
	}
}
export default user