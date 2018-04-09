import { managerLogin, getCode, isCodeTrue } from '@/api/login'
const user = {
	state: {
		user: '',
		token: ''
	},
	mutations: {},
	actions: {
		managerLogin({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        managerLogin(userInfo).then(response => {
		        	console.log(response)
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
		}
	}
}
export default user