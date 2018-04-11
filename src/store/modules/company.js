import { subAccountLogin } from '@/api/company'
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
		subAccountLogin({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        subAccountLogin(userInfo).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	for (let key in result) {
		          		if (key !== 'token') {
		          	      setCache(key, result[key])
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
		getCacheItem({ commit }, name) {
			return new Promise(resolve => {
		        resolve(getCache(name))
	        })
		},
		getCacheItemCA({ commit }, name) {
			return getCache(name)
		}
	}
}
export default user