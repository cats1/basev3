import { getVisitorType,addVisitorType,updateVisitorType,delVisitorType,GetAllTemplateType,delUsertemplate } from '@/api/visitType'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import i18n from '@/lang'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
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
    },
    delUsertemplate({ commit }, info) {
      return new Promise((resolve, reject) => {
        delUsertemplate(info).then(response => {
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
    },
    GetAllTemplateType({ commit }, info) {
      return new Promise((resolve, reject) => {
        GetAllTemplateType(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user