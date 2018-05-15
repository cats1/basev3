import { addRARG,updateRARG,addEmpRole,delRoleEmp,delRARG } from '@/api/role'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
import i18n from '@/lang'
const local = i18n.locale
const messages = i18n.messages[local]
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
                  	  message: messages['addSuccess'],
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
                  	  message: messages['addSuccess'],
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
                  	  message: messages['updateSuccess'],
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
                  	  message: messages['deleteSuccess'],
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
                  	  message: messages['deleteSuccess'],
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