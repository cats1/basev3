import {UpdateLogo,UploadBackgroundPic} from '@/api/upload'
import { Message } from 'element-ui'
import { getCache,setCache } from '@/utils/auth'
import i18n from '@/lang'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
const user = {
  state: {
  	groupD: {}
  },
  mutations: {
  	SET_GROUP (state,info) {
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
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['setSuccess'],
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
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['setSuccess'],
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