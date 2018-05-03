import { UpdateThemeColor,GetExtendVisitor,addExtendVisitor } from '@/api/pad'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
const user = {
	state: {},
	mutations: {},
	actions: {
		UpdateThemeColor({ commit }, info) {
			return new Promise((resolve, reject) => {
		        UpdateThemeColor(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	setCache('themecolor',info.themecolor)
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
		GetExtendVisitor({ commit }, info) {
			return new Promise((resolve, reject) => {
		        GetExtendVisitor(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addExtendVisitor({ commit }, info,type) {
			return new Promise((resolve, reject) => {
		        addExtendVisitor(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	if (type === 0) {
                      Message({
	                  	message: '团队拜访关闭',
	                  	type: 'success'
	                  })
		          	} else {
		          	  Message({
	                  	message: '团队拜访缺省配置设置成功',
	                  	type: 'success'
	                  })
		          	}
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