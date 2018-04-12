import { sendSmsCode } from '@/api/smscode'
const user = {
	state: {},
	mutations: {},
	actions: {
		sendSmsCode({ commit },info) {
			return new Promise((resolve, reject) => {
		        sendSmsCode(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		}
	}
}
export default user