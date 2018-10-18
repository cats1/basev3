import { addHoliday,updateHoliday,delHoliday,getHoliday } from '@/api/calendar'
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
    addHoliday({ commit }, info) {
      return new Promise((resolve, reject) => {
        addHoliday(info).then(response => {
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
    updateHoliday({ commit }, info) {
      return new Promise((resolve, reject) => {
        updateHoliday(info).then(response => {
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
    delHoliday({ commit }, info) {
      return new Promise((resolve, reject) => {
        delHoliday(info).then(response => {
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
    getHoliday({ commit }, info) {
      return new Promise((resolve, reject) => {
        getHoliday(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
