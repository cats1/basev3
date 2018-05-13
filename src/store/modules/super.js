import { superAccountLogin } from '@/api/login'
import { getRelatedAccount, getAllSuperAccountVCount, getSupAccVCount,ModifySupAccPassword } from '@/api/super'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
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
		getRelatedAccount({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getRelatedAccount(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getAllSuperAccountVCount({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getAllSuperAccountVCount(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getSupAccVCount({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getSupAccVCount(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		ModifySupAccPassword({ commit }, info) {
			return new Promise((resolve, reject) => {
		        ModifySupAccPassword(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	Message({
		              message: '密码修改成功',
		              type: 'success'
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		superAccountLogin({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        superAccountLogin(userInfo).then(response => {
		          console.log(response)
		          let { status, result } = response
		          if (status === 0) {
                    setCache('id', result.id)
                    setCache('company', result.company)
                    setCache('logo', result.logo)
                    setCache('username', result.username)
                    setCache('userid', result.userid)
                    setCache('token', result.token)
		          }
		          setToken(result.token)
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		}
	}
}
export default user