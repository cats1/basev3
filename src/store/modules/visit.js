import { addProject,Compressface,addResidentVisitor,updateProject,
	updateAllResidentFace,getRvQrcode,updateResidentVisitor,
	getResidentVisitorByName,updateResidentFace } from '@/api/visit'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
import i18n from '@/lang'
const local = i18n.locale
const messages = i18n.messages[local]
const user = {
	state: {},
	mutations: {},
	actions: {
		addProject({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addProject(info).then(response => {
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
		updateAllResidentFace({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateAllResidentFace(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
                    Message({
                  	  message: messages['sendFaceSuccess'],
                  	  type: 'success'
                	})
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateProject({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateProject(info).then(response => {
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
		Compressface({ commit }, info) {
			return new Promise((resolve, reject) => {
		        Compressface(info).then(response => {
		          /*let { status, result } = response
		          if (status === 0) {
                    Message({
                  	  message: '添加成功',
                  	  type: 'success'
                	})
		          }*/
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addResidentVisitor({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addResidentVisitor(info).then(response => {
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
		updateResidentVisitor({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateResidentVisitor(info).then(response => {
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
		getRvQrcode({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getRvQrcode(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getResidentVisitorByName({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getResidentVisitorByName(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateResidentFace({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateResidentFace(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
                    Message({
                  	  message: messages['sendFaceSuccess'],
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