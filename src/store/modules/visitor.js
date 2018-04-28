import { SearchVisitByCondition,SearchAppointmentByCondition,searchInviteByCondition,
	SearchRVisitorByCondition,GetVisitType,batchSignOut } from '@/api/visitor'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
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
		},
		GetVisitType({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
		        GetVisitType(userInfo).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		batchSignOut({ commit }, info) {
			return new Promise((resolve, reject) => {
				console.log(info)
		        batchSignOut(info).then(response => {
		          let {status} = response
		          if (status === 0) {
		            Message({
		              message: '签出成功！',
		              type: 'success'
		            })
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		}
	}
}
export default user