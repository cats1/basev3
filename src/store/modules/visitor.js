import { SearchVisitByCondition,SearchAppointmentByCondition,searchInviteByCondition,SearchRVisitorByCondition } from '@/api/visitor'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'

const user = {
	state: {},
	mutations: {},
	actions: {
		SearchVisitByCondition({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        SearchVisitByCondition(userInfo).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		SearchAppointmentByCondition({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        SearchAppointmentByCondition(userInfo).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		searchInviteByCondition({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        searchInviteByCondition(userInfo).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		SearchRVisitorByCondition({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        SearchRVisitorByCondition(userInfo).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		}
	}
}
export default user