import { getMeetingByUserid, getMeetingById, getAppointmentByMid,addMeeting,updateMeeting } from '@/api/meeting'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
import i18n from '@/lang'
const user = {
	state: {
		id: getCache('id'),
		company: getCache('company'),
		logo: getCache('logo'),
		userid: getCache('userid'),
		username: getCache('username'),
		token: getToken()
	},
	mutations: {},
	actions: {
		getMeetingByUserid({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getMeetingByUserid(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addMeeting({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addMeeting(info).then(response => {
		          let { status } = response
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
		getMeetingById({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getMeetingById(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateMeeting({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateMeeting(info).then(response => {
		          let { status } = response
	              if (status === 0) {
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
		getAppointmentByMid({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getAppointmentByMid(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		}
	}
}
export default user