import { managerLogin, getCode, isCodeTrue } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
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
		          console.log(response)
		          let { status, result } = response
		          if (status == 0) {
                    commit('SET_USERID', result.userid)
                    commit('SET_TOKEN', result.token)
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
	}
}
export default user