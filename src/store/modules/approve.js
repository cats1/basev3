import { updateProcessSwitch,getProcessArea,addProcessArea,
  delProcessArea,addProcessRule,updateProcessArea } from '@/api/approve'
import { Message } from 'element-ui'
import { getCache,setCache } from '@/utils/auth'
import i18n from '@/lang'
const local = i18n.locale
const messages = i18n.messages[local]
const user = {
  state: {},
  mutations: {},
  actions: {
    updateProcessSwitch({ commit }, info) {
      return new Promise((resolve, reject) => {
        updateProcessSwitch(info).then(response => {
          let {status} = response
          if (status === 0) {
            setCache('processSwitch',info.processSwitch)
            Message({
              message: messages['switchSuccess'],
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateProcessArea({ commit }, info) {
      return new Promise((resolve, reject) => {
        updateProcessArea(info).then(response => {
          let {status} = response
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
    getProcessArea({ commit }, info) {
      return new Promise((resolve, reject) => {
        getProcessArea(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addProcessArea({ commit }, info) {
      return new Promise((resolve, reject) => {
        addProcessArea(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addProcessRule({ commit }, info) {
      return new Promise((resolve, reject) => {
        addProcessRule(info).then(response => {
          let {status} = response
          if (status === 0) {
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
    delProcessArea({ commit }, info) {
      return new Promise((resolve, reject) => {
        delProcessArea(info).then(response => {
          let {status} = response
          if (status === 0) {
            setCache('processSwitch',info.processSwitch)
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
