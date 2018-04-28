import { addRARG,updateRARG,addEmpRole,delRoleEmp,delRARG } from '@/api/role'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
const user = {
	state: {},
	mutations: {},
	actions: {
		addRARG({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addRARG(info).then(response => {
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
		addEmpRole({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addEmpRole(info).then(response => {
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
		updateRARG({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateRARG(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
                    Message({
                  	  message: '修改成功',
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		delRoleEmp({ commit }, info) {
			return new Promise((resolve, reject) => {
		        delRoleEmp(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
                    Message({
                  	  message: '删除成功',
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		delRARG({ commit }, info) {
			return new Promise((resolve, reject) => {
		        delRARG(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
                    Message({
                  	  message: '删除成功',
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