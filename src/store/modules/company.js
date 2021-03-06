import { subAccountLogin,ModifyUserInfo,UpdateCardText,
	updateUnSubscribe,updatePassword,AddManager,GetManagerByUser,
	updateSASwitch,getSubAccountByUserid,updateSubAccountPwd,
	DeleteManager,UpdateManager,resetSubAccountPwd,delSubAccount,
	updateSubAccount,addSubAccount,getSubAccountTemp,addSubAccountTemp } from '@/api/company'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import {EncodeUtf8} from '@/utils/common'
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
		subAccountLogin({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        subAccountLogin(userInfo).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	setCache('password',userInfo.password)
		          	for (let key in result) {
		          		if (key !== 'token' && key !== 'password') {
		          	      setCache(key, result[key])
		          		} else {
		          		  setCache('token',result.userid + '-' + result.token)
		          		}
		          	}
		          	setCache('subaccountId',result.id)
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
		ModifyUserInfo({ commit }, info) {
			return new Promise((resolve, reject) => {
		        ModifyUserInfo(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	setCache('company', info.company)
			        setCache('username', info.name)
			        setCache('phone', info.phone)
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
		UpdateCardText({ commit }, info) {
			return new Promise((resolve, reject) => {
		        UpdateCardText(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	setCache("cardText", EncodeUtf8(info.cardText))		          	
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateUnSubscribe({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateUnSubscribe(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	setCache('unsubscribe', info.unsubscribe)
		          	let local = this.state.app.language
		          	Message({
		              message: i18n.messages[local]['emailOrderSuccess'],
		              type: 'success'
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updatePassword({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updatePassword(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
		              message: i18n.messages[local]['pwdSuccess'],
		              type: 'success'
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateSASwitch({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateSASwitch(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	setCache('subAccount',info.subAccount)
		          	let local = this.state.app.language
		          	Message({
		              message: i18n.messages[local]['comSuccess'],
		              type: 'success'
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		AddManager({ commit }, info) {
			return new Promise((resolve, reject) => {
		        AddManager(info).then(response => {
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
		addSubAccountTemp({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addSubAccountTemp(info).then(response => {
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
		GetManagerByUser({ commit }, info) {
			return new Promise((resolve, reject) => {
		        GetManagerByUser(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getSubAccountByUserid({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getSubAccountByUserid(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		DeleteManager({ commit }, info) {
			return new Promise((resolve, reject) => {
		        DeleteManager(info).then(response => {
		          let { status, result } = response
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
		UpdateManager({ commit }, info) {
			return new Promise((resolve, reject) => {
		        UpdateManager(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
		              message: i18n.messages[local]['pwdSuccess'],
		              type: 'success'
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		resetSubAccountPwd({ commit }, info) {
			return new Promise((resolve, reject) => {
		        resetSubAccountPwd(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
		              message: i18n.messages[local]['pwdInitSuccess'],
		              type: 'success'
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		delSubAccount({ commit }, info) {
			return new Promise((resolve, reject) => {
		        delSubAccount(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
		              type: 'success',
		              message: i18n.messages[local]['deleteSuccess']
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateSubAccount({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateSubAccount(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
		              type: 'success',
		              message: i18n.messages[local]['updateSuccess']
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateSubAccountPwd({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateSubAccountPwd(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
		              type: 'success',
		              message: i18n.messages[local]['updateSuccess']
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addSubAccount({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addSubAccount(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	let local = this.state.app.language
		          	Message({
		              type: 'success',
		              message: i18n.messages[local]['addSuccess']
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getCacheItemCA({ commit }, name) {
			return getCache(name)
		}
	}
}
export default user