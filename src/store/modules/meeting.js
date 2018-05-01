import { getMeetingByUserid, getMeetingById, getAppointmentByMid,addMeeting,updateMeeting } from '@/api/meeting'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
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
	              	Message({
			          message: '会议添加成功',
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
	              	Message({
			          message: '保存成功',
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