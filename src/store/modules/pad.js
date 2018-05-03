import { UpdateThemeColor } from '@/api/pad'
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
		}
	}
}
export default user