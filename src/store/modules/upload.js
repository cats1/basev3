import {UpdateLogo,UploadBackgroundPic} from '@/api/upload'
import { Message } from 'element-ui'
import { getCache,setCache } from '@/utils/auth'
const user = {
  state: {
  	groupD: {}
  },
  mutations: {
  	SET_GROUP (state,info) {
  	  console.log(info)
      state.groupD = info
  	}
  },
  actions: {
    UpdateLogo({ commit }, info) {
      return new Promise((resolve, reject) => {
        UpdateLogo(info).then(response => {
          let {status} = response
          if (status === 0) {
          	setCache('logo',info.logoUrl)
            Message({
              message: 'logo更新成功！',
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UploadBackgroundPic({ commit }, info) {
      return new Promise((resolve, reject) => {
        UploadBackgroundPic(info).then(response => {
          let {status} = response
          if (status === 0) {
          	setCache('backgroundPic',info.bgPicUrl)
            Message({
              message: '轮播图片更新成功！',
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