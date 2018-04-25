import { addDepartment,addEmployee } from '@/api/depart'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
const user = {
	state: {},
	mutations: {},
	actions: {
		addDepartment({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addDepartment(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
                    Message({
                  	  message: '添加成功',
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addEmployee({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addEmployee(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
                    Message({
                  	  message: '添加成功',
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