import { SearchVisitByCondition } from '@/api/visitor'
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
		}
	}
}
export default user