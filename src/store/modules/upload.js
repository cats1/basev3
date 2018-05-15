import {UpdateLogo,UploadBackgroundPic} from '@/api/upload'
import { Message } from 'element-ui'
import { getCache,setCache } from '@/utils/auth'
import i18n from '@/lang'
const local = i18n.locale
const messages = i18n.messages[local]
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
              message: messages['setSuccess'],
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
              message: messages['setSuccess'],
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