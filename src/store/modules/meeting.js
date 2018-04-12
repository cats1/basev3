import { getMeetingByUserid, getMeetingById, getAppointmentByMid } from '@/api/meeting'
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