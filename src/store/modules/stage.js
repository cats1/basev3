import { LoginManager } from '@/api/stage'
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
		LoginManager({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        LoginManager(userInfo).then(response => {
		          let { status, result } = response
		          console.log(result)
		          if (status === 0) {
		          	for (let key in result) {
		          		if (key === 'pemail') {
		          	      setCache('email', result[key])
		          		}
		          		if (key !== 'token') {
		          	      setCache(key, result[key])
		          		} else {
		          		  setCache('token', userInfo.account + '-' + result.token)
		          		}
		          	}

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