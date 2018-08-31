import { getVisitorType,addVisitorType,updateVisitorType,delVisitorType } from '@/api/visitType'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import i18n from '@/lang'
const user = {
  state: {},
  mutations: {},
  actions: {
    getVisitorType({ commit }, info) {
      return new Promise((resolve, reject) => {
        getVisitorType(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addVisitorType({ commit }, info) {
      return new Promise((resolve, reject) => {
        addVisitorType(info).then(response => {
          let {status} = response
          if (status === 0) {
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['addSuccess'],
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateVisitorType({ commit }, info) {
      return new Promise((resolve, reject) => {
        updateVisitorType(info).then(response => {
          let {status} = response
          if (status === 0) {
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['updateSuccess'],
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    delVisitorType({ commit }, info) {
      return new Promise((resolve, reject) => {
        delVisitorType(info).then(response => {
          let {status} = response
          if (status === 0) {
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['deleteSuccess'],
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